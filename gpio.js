import chipGpio from 'chip-gpio';
import rpiGpio from 'rpi-gpio';

const SHOULD_MOCK_GPIO = process.env.SHOULD_MOCK_GPIO || false;
const CHIP_GPIO = process.env.CHIP_GPIO || false;

const createGpio = ({chipGpio, raspberryGpio}) => {
  if (SHOULD_MOCK_GPIO) {
    return {
      write: (val) => {},
      unexport: () => {},
    };
  }
  if (CHIP_GPIO) {
    return new chipGpio.Gpio(chipGpio, 'out');
  }
  rpiGpio.setup(raspberryGpio, gpio.DIR_OUT, 'none');
  return {
    write: (val) => rpiGpio.write(raspberryGpio, val ? true : false),
    unexport: () => rpiGpio.destroy()
  }
}

const openSwitch = createGpio({ chipGpio: 132, raspberryGpio: 7 });
const closeSwitch = createGpio({ chipGpio: 133, raspberryGpio: 8 });

export const writeOpenSwitch = (val) => {
  openSwitch.write(val);
}

export const writeCloseSwitch = (val) => {
  closeSwitch.write(val);
}

export const unexportAll = () => {
  openSwitch.unexport();
  closeSwitch.unexport();
}