var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Escuchando en 3000')
})

app.get('/getmoiratriggers', function (req, res) {
    var exec = require('child_process').execFile('public/bashtrigger.sh', []);
    exec.stdout.on('data', function (data) {
        var options = "";
        data = JSON.parse(data);
        for (nombre in data) {
            var idnombre = data[nombre].toString();
            idnombre = idnombre.replace(/'/g, '\"').replace(/"/g, '\"');
            options = options + "<option value='" + idnombre + "' >" + nombre + "</option>";
        }
        var select = '<select class="form-control input-sm" data-ng-model="triggerSelected" ng-change="triggerSelect()" id="select"> \
                    ' + options + '\
                    </select>';
        res.send(select);
    })
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

app.get('/getid/:id', function (req, res) {
    umbrales.findById(req.params.id, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    })
})

app.get('/getbyname/:nombre', function (req, res) {
    umbrales.find({ 'trigger': req.params.nombre }, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    })
})

app.get('/getdataGraph', function (req, res) {
    var bash = [];
    var formula = req.query.formula;
    formula = formula.replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/,/g, '%2C').replace(/\"/g, '%22');

    var fi = req.query.fi;

    //var from = "00:00_20161205" ;
    //var until = "00:00_20161206";

    anno = fi.split("_")[0];
    if (fi.split("_")[1] < 10) {
        mes = "0" + fi.split("_")[1].toString();
    } else {
        mes = fi.split("_")[1]
    }
    if (fi.split("_")[2] < 10) {
        dia = "0" + fi.split("_")[2].toString();
    } else {
        dia = fi.split("_")[2]
    }

    var from = "00:00_" + anno + mes + dia;
    var until = "23:59_" + anno + mes + dia;
    var tz = "America/Santiago";
    var format = "json";

    var url = "https://192.168.11.35/render/?target=" + formula + '&from=' + from + '&until=' + until + '&tz=' + tz + '&format=' + format;

    request({
        url: url,
        json: true
    }, function (error, response, body) {
        res.json(body);
    });

    //console.log("https://192.168.11.35/render/?target=" + formula + '&from=' + from + '&until=' + until + '&tz=' + tz + '&format=' + format);
    // var exec = require('child_process').execFile('public/bash.sh',
    //     [
    //         formula, from, until, tz, format
    //     ]);

    // exec.stdout.on('data', function (data) {
    //     //console.log(data);
    //     //res.json(data);
    // });


})

