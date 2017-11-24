'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var formatterService = require('./view/formatter-service.js');
var diffService = require('./core/diff-service.js');
var cors = require('cors');
var config = require('config');
var path = require('path');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: config.get('server.cors')
}));

router.get('/alive', function (request, response) {
    response.send('Alive');
});

router.post('/analyze', function (request, response) {
    var delta = diffService.get(request.body.before, request.body.after);
    switch (request.output) {
        case 'json':
            response.send(delta);
            break;
        case 'html':
            response.send(formatterService.html(delta));
            break;
        default:
            response.send(delta);
            break;
    }
});

app.use(router);
var port = config.get('server.port');
app.listen(port, function () {
    console.log('Listening on port ' + port)
});