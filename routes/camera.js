var express = require('express'),
    router = express.Router(),
    path = require('path'),
    spawn = require('child_process').spawn;

rgbLedPlugin.start();
const vision = require('node-cloud-vision-api');
vision.init({auth: 'API_KEY'});


router.route('/').get(function(req, res){
    res.set('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '/public/images/test.jpg'));
}).post(function (req, res) {
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
    res.json({path: '/camera'});
});

router.route('/mood').get(function(req, res, next){
    const vision = require('node-cloud-vision-api');
    vision.init({auth: 'AIzaSyC7BESoFPfyi6gHK97klUn2m_pad_3jqzA'});

    const req = new vision.Request({
        image: new vision.Image(path.join(__dirname, '/public/images/test.jpg')),
        features: [
            new vision.Feature('FACE_DETECTION', 4)
            // new vision.Feature('LABEL_DETECTION', 10)
        ]
    });

// send single request
    vision.annotate(req).then(function(res) {
        console.log(JSON.stringify(res.responses));
    }, function(e){
        console.log('Error: ', e);
    });
});

module.exports = router;
