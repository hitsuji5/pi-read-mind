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
      console.log(Math.floor(values[i]));
  }
};

exports.blink = function(frequency) {
    dutyCycle = 0;
    setInterval(function () {
        leds[0].pwmWrite(dutyCycle);
        dutyCycle += 5;
        if (dutyCycle > 150) {
            dutyCycle = 0;
        }
    }, frequency);
};

function connectHardware() {
  var Gpio = require('pigpio').Gpio;
  for (var i = 0; i < 3; i++) {
      console.log(model.gpios);
      led = new Gpio(model.gpios[i], {mode: Gpio.OUTPUT});
      led.pwmWrite(30);
      leds.push(led);
  }
  console.info('Hardware %s actuator started!', pluginName);
};

