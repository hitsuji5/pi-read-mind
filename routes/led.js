var express = require('express'),
    router = express.Router(),
    rgbLedPlugin = require('./../plugins/internal/rgbLedPlugin');

rgbLedPlugin.start();
var currentMood = 'neutral';

router.route('/').get(function (req, res) {
    res.json({mood : currentMood});
}).put(function(req, res) {
    currentMood = req.body.mood;
    rgbLedPlugin.changeColor(currentMood);
    res.json({mood : currentMood});
});

// router.route('/').get(function (req, res, next) {
//     req.result = resources.pi.actuators;
//     next();
// });
// router.route('/leds').get(function (req, res, next) {
//     req.result = resources.pi.actuators.leds;
//     next();
// });
//
// router.route('/leds/:id').get(function (req, res, next) { //#A
//     req.result = resources.pi.actuators.leds[req.params.id];
//     next();
// }).put(function(req, res, next) { //#B
//     var selectedLed = resources.pi.actuators.leds[req.params.id];
//     selectedLed.value = req.body.value; //#C
//     ledPlugin.switchOnOff(req.params.id, selectedLed.value);
//     req.result = selectedLed;
//     next();
// });
//
// router.route('/rgbLed').get(function (req, res, next) { //#A
//     req.result = resources.pi.actuators.rgbLed;
//     next();
// }).put(function(req, res, next) { //#B
//     rgbLed = resources.pi.actuators.rgbLed;
//     rgbLed.value = req.body.value;
//     rgbLedPlugin.changeColor(rgbLed.value);
//     req.result = rgbLed;
//     next();
// });


module.exports = router;
