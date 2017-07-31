'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var formatterService = require('./view/formatter-service.js');
var diffService = require('./core/diff-service.js');
var app = express();

var router = express.Router();
app.use(bodyParser.json());

router.get('/alive', function (request, response) {
    response.send('Alive');
});

router.post('/', function (request, response) {
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
app.listen('3000', function () {
    console.log('Listening on port 3000')
});