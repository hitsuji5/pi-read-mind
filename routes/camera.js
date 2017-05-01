var express = require('express'),
    router = express.Router(),
    rgbLedPlugin = require('./../plugins/internal/rgbLedPlugin');
    path = require('path'),
    spawn = require('child_process').spawn;

const vision = require('node-cloud-vision-api');
vision.init({auth: 'API_KEY'});

router.route('/').get(function(req, res){
    res.set('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '../public/images/test.jpg'));
}).post(function (req, res) {
    var raspistill = spawn('raspistill', ['-vf', '-hf', '-o' , './public/images/test.jpg', '-w', '640', '-h', '480']);
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

router.route('/mood').get(function(req, res){
    const request = new vision.Request({
        image: new vision.Image(path.join(__dirname, '../public/images/test.jpg')),
        features: [
            new vision.Feature('FACE_DETECTION', 4)
        ]
    });

    vision.annotate(request).then(function(response) {
        try {
            face = response.responses[0].faceAnnotations[0];
            console.log(JSON.stringify(face));
            mind = 'neutral';
            if (!face.joyLikelihood.includes('UNLIKELY')) {
                mind = 'joy'
            } else if (!face.sorrowLikelihood.includes('UNLIKELY')) {
                mind = 'sad'
            } else if (!face.surpriseLikelihood.includes('UNLIKELY')) {
                mind = 'surprise'
            } else if (!face.angerLikelihood.includes('UNLIKELY')) {
                mind = 'anger'
            }
            res.json({
                face: true,
                mind: mind
            });
            rgbLedPlugin.changeColor(mind);
        }
        catch (e) {
            res.json({
                face: false,
                mind: ''
            });
        }
    }, function(e){
        console.log('Error: ', e);
        res.json(e);
    });
});

module.exports = router;
