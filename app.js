var express = require('express'),
  cameraRoutes = require('./routes/camera'),
  ledRoutes = require('./routes/led'),
  resources = require('./resources/model'),
  // converter = require('./middleware/converter'),
  cors = require('cors'),
  path = require('path'),
  bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/camera', cameraRoutes);
app.use('/led', ledRoutes);

app.get('/', function (req, res) {
    res.sendFile('views/index.html', {root: __dirname })
});


// For representation design
// app.use(converter());


var server = app.listen(resources.pi.port, function () {
    console.log('HTTP server started...');
    console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});