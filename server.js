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

app.get('/getdataGraph', function (req, res) {
    var bash = [];
    var formula = req.query.formula;
    formula = formula.replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/,/g, '%2C').replace(/\"/g, '%22');

    var fi = req.query.fi;
    var ff = req.query.ff;

    //var from = "00:00_20161205" ;
    //var until = "00:00_20161206";

    annofi = fi.split("_")[0];
    annoff = ff.split("_")[0];

    function formatDate(a,index){
        if (a.split("_")[index] < 10){
            b = "0" + a.split("_")[index].toString();
        }else{
            b = a.split("_")[index];
        }
        return b;
    }

    mesfi = formatDate(fi,1);
    mesff = formatDate(ff,1);
    diafi = formatDate(fi,2);
    diaff = formatDate(ff,2);

    var from = "00:00_" + annofi + mesfi + diafi;
    var until = "23:59_" + annoff + mesff + diaff;
    var tz = "America/Santiago";
    var format = "json";

    var url = "https://192.168.11.35/render/?target=" + formula + '&from=' + from + '&until=' + until + '&tz=' + tz + '&format=' + format;

    console.log(url);
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        res.json(body);
    });
})


mongoose.connect('mongodb://localhost:27017/UmbralesMoira');

umbrales = mongoose.model('Umbral', {
    trigger: String,
    formulas: [
        {
            nombre: String,
            formula: String,
            datapoint: []
        }
    ]
});
app.get('/getall', function (req, res) {
    umbrales.find(function (err, rutas) {
        if (err) {
            res.send(err);
        }
        res.json(rutas);
    });
});
app.get('/getbyname/:nombre', function (req, res) {
    umbrales.find({ 'trigger': req.params.nombre }, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    })
});

app.post('/insert', function (req, res) {
    var a = new umbrales(req.body)
    a.save().then(function (data) {
        res.json({ status: 500, data: data.id });
        res.end();
    })
});

app.delete('/deleteall', function (req, res) {
    umbrales.remove({}, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.end('success');
        }
    })
})