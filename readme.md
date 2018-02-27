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
* `sudo npm start`

## To keep it started even after a reboot

- `sudo npm install -g pm2`
- `sudo pm2 start npm -- start`
- `sudo pm2 startup`
- `sudo pm2 save`