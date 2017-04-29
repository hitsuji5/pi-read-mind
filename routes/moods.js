var express = require('express'),
  router = express.Router(),
  rgbLedPlugin = require('./../plugins/internal/rgbLedPlugin');

var currentMood = 'neutral';

router.route('/').get(function (req, res, next) {
  req.result = currentMood;
  next();
}).put(function(req, res, next) {
    currentMood = req.body.mood;
    rgbLedPlugin.emphasize(req.body.mood);
    req.result = currentMood;
    next();
});

module.exports = router;
