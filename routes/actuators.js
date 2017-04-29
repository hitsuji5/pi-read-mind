var express = require('express'),
  router = express.Router(),
  resources = require('./../resources/model'),
  ledPlugin = require('./../plugins/internal/ledsPlugin'),
  rgbLedPlugin = require('./../plugins/internal/rgbLedPlugin');

var spawn = require('child_process').spawn;
rgbLedPlugin.start();

router.route('/').get(function (req, res, next) {
  req.result = resources.pi.actuators;
  next();
});

router.route('/leds').get(function (req, res, next) {
  req.result = resources.pi.actuators.leds;
  next();
});

router.route('/leds/:id').get(function (req, res, next) { //#A
  req.result = resources.pi.actuators.leds[req.params.id];
  next();
}).put(function(req, res, next) { //#B
  var selectedLed = resources.pi.actuators.leds[req.params.id];
  selectedLed.value = req.body.value; //#C
  ledPlugin.switchOnOff(req.params.id, selectedLed.value);
  req.result = selectedLed;
  next();
});

router.route('/rgbLed').get(function (req, res, next) { //#A
    req.result = resources.pi.actuators.rgbLed;
    next();
}).put(function(req, res, next) { //#B
    rgbLed = resources.pi.actuators.rgbLed;
    rgbLed.value = req.body.value;
    rgbLedPlugin.emphasize(rgbLed.value);
    req.result = rgbLed;
    next();
});

router.get('/camera', function (req, res) {
    var raspistill = spawn('raspistill', [ '-o' , './public/images/test.jpg']);

    raspistill.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    raspistill.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    raspistill.on('close', function (code) {
        console.log('child process exited with code ' + code);
    });
    console.log('shutter!');
    res.json({path: '/images/test.jpg'});
});


module.exports = router;
