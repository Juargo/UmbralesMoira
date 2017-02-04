var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Escuchando en 3000');
})


app.get('/getmoiratriggers', function (req, res) {
    var url = "http://192.168.11.35:9090/triggers";

    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (error)
            res.json(error);
        res.json(body);
    });
});
