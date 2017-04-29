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


// exports.changeColor = function(values) {
//   for (var i = 0; i < 3; i++) {
//       leds[i].pwmWrite(Math.floor(values[i]));
//       console.log(Math.floor(values[i]));
//   }
// };


exports.changeColor = function(mood) {
    reset();
    switch (mood){
        case 'joy':
            blink(30, 'white');
            break;
        case 'sad':
            blink(200, 'blue');
            break;
        case 'anger':
            blink(20, 'red');
            break;
        case 'fear':
            blink(100, 'green');
            break;
        case 'surprise':
            blink(20, 'mix');
            break;
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


function reset(){
    clearInterval(interval);
    for (var i = 0; i < 3; i++) {
        leds[i].pwmWrite(0);
    }
};

function blink(frequency, pattern) {
    offset = [0, 0, 0];
    colorIdStart = 0;
    colorIdEnd = 3;
    switch (pattern){
        case 'red':
            colorIdStart = 0;
            colorIdEnd = 1;
            break;
        case 'green':
            colorIdStart = 2;
            colorIdEnd = 3;
            break;
        case 'blue':
            colorIdStart = 1;
            colorIdEnd = 2;
            break;
        case 'white':
            break;
        case 'default':
            offset = [0, 50, 100];
    }
    dutyCycle = 0;
    interval = setInterval(function () {
        dutyCycle += 5;
        if (dutyCycle > 150) {
            dutyCycle = -150;
        }
        for (var i = colorIdStart; i < colorIdEnd; i++){
            leds[i].pwmWrite(Math.abs(dutyCycle + offset[i]));
        }
    }, frequency);
    setTimeout(reset, 10000);
};

