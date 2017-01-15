var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Escuchando en 3000')
})

mongoose.connect('mongodb://localhost:27017/UmbralesMoira');

umbrales = mongoose.model('Umbral',{
     trigger: String,
     formulas:[
         {
             nombre: String,
             formula: String,
             datapoint:[]
         }
     ]
});

app.get('/api/test1', function(req, res) {  
    console.log("s");
    umbrales.find(function(err, rutas) {
        if(err) {
            res.send(err);
        }
        res.json(rutas);
    });
});

app.post('/api/test2',function(req,res){
    var a = new umbrales({
        trigger:"dan2",
        formulas:[
            {
                nombre : "navidad",
                formula: "cada 10min",
                datapoint:[
                    ["2016-12-25 00:00:00", 2],
                    ["2016-12-25 01:00:00", 4],
                    ["2016-12-25 04:00:00", 12]
                ]
            }
        ]
    })

   a.save(function(err){
       if(err)
            res.send(err);
            //res.json(req)
            //res.send(req.body);
   })

   res.end();
})
