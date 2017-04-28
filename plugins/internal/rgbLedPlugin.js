var resources = require('./../../resources/model');

var leds = [];
// var interval;
var model = resources.pi.actuators.rgbLed;
var pluginName = resources.pi.actuators.rgbLed.name;

exports.start = function () {
  connectHardware();
};

exports.stop = function () {
  for (var led in leds){
      led.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};


exports.changeColor = function(values) {
  for (var i = 0; i < 3; i++) {
      leds[i].pwmWrite(Math.floor(values[i]));
  }
};

function connectHardware() {
  var Gpio = require('pigpio').Gpio;
  for (var pin in model.gpios) {
      led = new Gpio(pin, {mode: Gpio.OUTPUT});
      led.pwmWrite(0);
      leds.push(led);
  }
  console.info('Hardware %s actuator started!', pluginName);
};

