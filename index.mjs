import Koa from 'koa';
import KoaStatic from 'koa-static';
import KoaRouter from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import Gpio from 'chip-gpio';

const PORT = process.env.PORT || 5000;
const CODE = process.env.CODE;
const TIME_TO_OPERATE_SWITCH = process.env.TIME_TO_OPERATE_SWITCH || 5000;
const SHOULD_MOCK_GPIO = process.env.SHOULD_MOCK_GPIO || false;

const mockedGpio = {write: (val) => {}};

const openSwitch = SHOULD_MOCK_GPIO ? mockedGpio : new Gpio.Gpio(6, 'out');
const closeSwitch = SHOULD_MOCK_GPIO ? mockedGpio : new Gpio.Gpio(7, 'out');
let delayedSwitchActionTimeout;

const app = new Koa();
const router = new KoaRouter();

function stopAllSwitches() {
  console.log('Stopping all');
  openSwitch.write(0);
  closeSwitch.write(0);
  if (delayedSwitchActionTimeout) {
    clearTimeout(delayedSwitchActionTimeout);
    delayedSwitchActionTimeout = null;
  }
}

router.post('/command', async (ctx) => {
  ctx.assert(ctx.request.body.code === CODE, 401, 'Invalid code');
  ctx.assert(['OPEN', 'CLOSE'].includes(ctx.request.body.operation), 400, 'Operation should be OPEN or CLOSE');
  stopAllSwitches();
  console.log(ctx.request.body.operation === 'OPEN' ? 'Opening' : 'Closing');
  const switchToUse = ctx.request.body.operation === 'OPEN' ? openSwitch : closeSwitch;
  switchToUse.write(1);
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
  openSwitch.unexport();
  closeSwitch.unexport();
  process.exit();
}

process.on('SIGINT', exit);
