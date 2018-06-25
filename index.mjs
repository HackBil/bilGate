import Koa from 'koa';
import KoaStatic from 'koa-static';
import KoaRouter from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import { unexportAll, writeCloseSwitch, writeOpenSwitch } from './gpio';
import moment from 'moment-timezone';

const PORT = process.env.PORT || 80;
const CODE = process.env.CODE;
const TIME_TO_OPERATE_SWITCH = process.env.TIME_TO_OPERATE_SWITCH || 18000;

const app = new Koa();
const router = new KoaRouter();

function localNow() {
  return ' at ' + moment().tz("Europe/Monaco").format('YYYY-MM-DD HH:mm:ssZ');
}

function stopAllSwitches() {
  console.log('Stopping' + localNow());
  writeCloseSwitch(0);
  writeOpenSwitch(0);
}

router.post('/command', async (ctx) => {
  ctx.assert(ctx.request.body.code === CODE, 401, 'Invalid code');
  ctx.assert(['OPEN', 'CLOSE'].includes(ctx.request.body.operation), 400, 'Operation should be OPEN or CLOSE');
  stopAllSwitches();
  console.log((ctx.request.body.operation === 'OPEN' ? 'Opening' : 'Closing') + localNow());
  const switchToUse = ctx.request.body.operation === 'OPEN' ? writeOpenSwitch : writeCloseSwitch;
  switchToUse(1);
  setTimeout(() => {
    stopAllSwitches();
  }, TIME_TO_OPERATE_SWITCH);
  ctx.body = 'OK';
});

router.post('/stop-everything', async (ctx) => {
  stopAllSwitches();
  ctx.body = 'OK';
})

app.use(KoaBodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(KoaStatic('static'));

app.listen(PORT, () => {
  console.log('Listening on', PORT);
});

function exit() {
  unexportAll();
  process.exit();
}

process.on('SIGINT', exit);
