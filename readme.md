BilGate
===========

## Requirements

- NodeJS
- `build-essential` package
- A [C.H.I.P.](https://docs.getchip.com/chip.html) to run this on

Install
---------
* `git clone git@github.com:HackBil/bilGate.git` : retrieve the repo
* `cd bilGate`
* `npm install`
* `npm start`

## To start it on port 80

- `iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 5000`
- `iptables -t nat -I OUTPUT -p tcp -d 127.0.0.1 --dport 80 -j REDIRECT --to-ports 5000`

## To keep it started even after a reboot

- `sudo npm install -g pm2`
- `pm2 start`
- `pm2 save`