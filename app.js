var express = require('express'),
  actuatorsRoutes = require('./routes/actuators'),
  moodsRoutes = require('./routes/moods'),
  resources = require('./resources/model'),
  // converter = require('./middleware/converter'),
  cors = require('cors'),
  path = require('path'),
  bodyParser = require('body-parser');

// var ledsPlugin = require('./plugins/internal/ledsPlugin');
// var rgbLedPlugin = require('./plugins/internal/rgbLedPlugin');
// ledsPlugin.start({'simulate': true, 'frequency': 10000});
// rgbLedPlugin.start();

var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/actuators', actuatorsRoutes);
app.use('/mood', moodsRoutes);

app.get('/', function (req, res) {
    res.sendFile('views/index.html', {root: __dirname })
});

app.get('/picture', function(req, res){
    res.set('Content-Type', 'image/jpeg');
    console.log(path.join(__dirname, '/public/images/test.jpg'));
    res.sendFile(path.join(__dirname, '/public/images/test.jpg'));
});
// For representation design
// app.use(converter());


var server = app.listen(resources.pi.port, function () {
    console.log('HTTP server started...');
    console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});