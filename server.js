var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

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

app.get('/api/getall', function(req, res) {  
    umbrales.find(function(err, rutas) {
        if(err) {
            res.send(err);
        }
        res.json(rutas);
    });
});

app.post('/api/insert',function(req,res){
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
   })

   res.end();
})

app.get('/api/getid/:id', function (req,res) {   
    umbrales.findById(req.params.id, function (err,data) {
        if(err)
            res.send(err);
        
        res.json(data);
    })
})

app.put('/api/update/:id',function (req,res) {
    umbrales.findById(req.params.id, function (err,data) {  
        if(err)
            res.send(err);
        
        data.trigger = req.query.trigger;

        data.save(function (err) {  
            if(err)
                res.send(err)
            
            res.json(data);
        })
    })
  })

  app.delete('/api/delete/:id',function (req,res) {  
      umbrales.findByIdAndRemove(req.params.id,function (err) {  
          if(err)
            res.send(err)
        
          res.json({message:'ok'})
      })
  })