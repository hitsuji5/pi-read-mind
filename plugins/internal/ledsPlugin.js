var resources = require('./../../resources/model');

var actuators = {};
// var interval;
var model = resources.pi.actuators.leds;
var pluginName = 'LED';
var localParams = {'simulate': false, 'frequency': 2000};

var numLed = 2;

exports.start = function (params) {
  localParams = params;
  // observe(model); //#A

  if (!localParams.simulate) {
    connectHardware();
  }
};

exports.stop = function () {
  if (!localParams.simulate) {
    for (var key in actuators){
        actuators[key].unexport();
    }
  }
  console.info('%s plugin stopped!', pluginName);
};

// function observe(what) {
//   Object.observe(what, function (changes) {
//     console.info('Change detected by plugin for %s...', pluginName);
//     switchOnOff(model.value); //#B
//   });
// };

exports.switchOnOff = function(ledKey, value) {
  if (!localParams.simulate) {
    actuators[ledKey].write(value === true ? 1 : 0, function () { //#C
      console.info('Changed value of %s to %s', pluginName, value);
    });
  }
};

function connectHardware() {
  var Gpio = require('onoff').Gpio;
  for (var key in model){
    actuators[key] = new Gpio(model[key].gpio, 'out'); //#D
  }
  console.info('Hardware %s actuator started!', pluginName);
};

// function simulate() {
//   interval = setInterval(function () {
//     // Switch value on a regular basis
//     if (model.value) {
//       model.value = false;
//     } else {
//       model.value = true;
//     }
//   }, localParams.frequency);
//   console.info('Simulated %s actuator started!', pluginName);
// };

//#A Observe the model for the LEDs
//#B Listen for model changes, on changes call switchOnOff
//#C Change the LED state by changing the GPIO state
//#D Connect the GPIO in write (output) mode

