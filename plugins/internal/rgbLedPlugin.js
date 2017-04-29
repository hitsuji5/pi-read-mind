var resources = require('./../../resources/model');

var leds = [];
var interval;
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


exports.emphasize = function(mood) {
    switch (mood){
        case 'joy':
            blink(50, 'white');
            break;
        case 'sad':
            blink(200, 'blue');
            break;
        case 'anger':
            blink(20, 'red');
            break;
        case 'fear':
            blink(200, 'green');
            break;
        case 'surprise':
            blink(200, 'mix');
            break;
        defualt:
            clearInterval(interval);
    }
};

function connectHardware() {
  var Gpio = require('pigpio').Gpio;
  for (var i = 0; i < 3; i++) {
      led = new Gpio(model.gpios[i], {mode: Gpio.OUTPUT});
      led.pwmWrite(0);
      leds.push(led);
  }
  console.info('Hardware %s actuator started!', pluginName);
};

function blink(frequency, pattern) {
    clearInterval(interval);
    offset = [0, 0, 0];
    colorIdStart = 0;
    colorIdEnd = 2;
    switch (pattern){
        case 'red':
            colorIds = [0];
            break;
        case 'green':
            colorIds = [1];
            break;
        case 'blue':
            colorIds = [2];
            break;
        case 'white':
            colorIds = [0, 1, 2];
            break;
        case 'default':
            colorIds = [0, 1, 2];
            offset = [0, 50, 100];
    }
    dutyCycle = 0;
    interval = setInterval(function () {
        dutyCycle += 5;
        if (dutyCycle > 150) {
            dutyCycle = -150;
        }
        for (var i in colorIds){
            leds[i].pwmWrite(Math.abs(dutyCycle + offset[i]));
        }
    }, frequency);
};

