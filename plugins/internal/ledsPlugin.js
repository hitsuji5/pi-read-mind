var resources = require('./../../resources/model');

var leds = {};
// var interval;
var model = resources.pi.actuators.leds;
var pluginName = 'LED';

exports.start = function (params) {
  connectHardware();
};

exports.stop = function () {
  for (var key in actuators){
      leds[key].unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};


exports.switchOnOff = function(ledKey, value) {
  actuators[ledKey].write(value === true ? 1 : 0, function () { //#C
    console.info('Changed value of %s to %s', pluginName, value);
  });
};

function connectHardware() {
  var Gpio = require('onoff').Gpio;
  for (var key in model){
    leds[key] = new Gpio(model[key].gpio, 'out'); //#D
  }
  console.info('Hardware %s actuator started!', pluginName);
};

