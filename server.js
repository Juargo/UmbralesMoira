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

app.get('/getmoiratriggers',function (req,res) {  
    var exec = require('child_process').execFile('public/bashtrigger.sh',[]);
    exec.stdout.on('data',function (data) { 
        var options="";
        data = JSON.parse(data);
        for (nombre in data){
            var idnombre = data[nombre].toString();
            idnombre = idnombre.replace(/'/g, '\"').replace(/"/g, '\"');
            options = options + "<option value='"+ idnombre +"' >"+ nombre + "</option>";
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


