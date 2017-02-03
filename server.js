
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Escuchando en 3000')
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

app.post('/insert', function (req, res) {
    var a = new umbrales(req.body)
    a.save().then(function (data) {
        res.json({ status: 500, data: data.id });
        res.end();
    })
})

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

app.put('/update/:id', function (req, res) {
    umbrales.findById(req.params.id, function (err, data) {
        if (err)
            res.send(err);

        //console.log(req.query.trigger);
        // data.trigger = req.query.trigger;

       //data.formulas[0].datapoint = req.body.formulas[0].datapoint;
        data.formulas= req.body.formulas;
       //console.log(req.body.formulas[0].datapoint);
        data.save(function (err) {
            if (err)
                res.send(err)

            res.json(data);
        })
    })
})

app.delete('/delete/:id', function (req, res) {
    umbrales.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.send(err)

        res.json({ message: 'ok' })
    })
})

app.delete('/deleteall', function (req, res) {
    umbrales.remove({}, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.end('success');
        }
    })
})

app.get('/getdataGraph', function (req, res) {
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

    var exec = require('child_process').execFile('public/bash.sh',
        [
            formula, from, until, tz, format
        ]);

    exec.stdout.on('data', function (data) {
        res.json(data)
    });
})
