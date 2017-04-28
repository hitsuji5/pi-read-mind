var httpServer = require('./servers/http'),
  resources = require('./resources/model');

// Internal Plugins
var ledsPlugin = require('./plugins/internal/ledsPlugin'),
  rgbLedPlugin = require('./plugins/internal/rgbLedPlugin');
ledsPlugin.start({'simulate': true, 'frequency': 10000});
rgbLedPlugin.start();

// HTTP Server
var server = httpServer.listen(resources.pi.port, function () {
  console.log('HTTP server started...');
  console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});
