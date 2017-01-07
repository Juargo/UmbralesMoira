var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Escuchando en 3000')
})

app.get('/getmoiratriggers',function (req,res) {  
    var exec = require('child_process').execFile('public/bashtrigger.sh',[]);
    exec.stdout.on('data',function (data) { 
        options="";
        data = JSON.parse(data);
        for (nombre in data){
            options = options + "<option value='"+ nombre +"' >"+ nombre + "</option>";
        }
        var select = '<select class="form-control input-sm" data-ng-model="selected" > \
                    ' + options + '\
                    </select>';
        res.send(select);
     })
})
