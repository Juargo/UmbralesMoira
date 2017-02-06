angular.module("umbralesApp")
.factory("trigger",function(){
    trigger=undefined;
    return{
        gettrigger: function(){
            return trigger;
        },
        settrigger: function(data,multiplo){
            for (triggerx in data) {
                var texto = data[triggerx].toString().split("");
                for (var i = 0; i < texto.length; i++) {
                    if (i % multiplo == 0 && i != 0) {
                        if (i == multiplo) {
                            formula = data[triggerx].toString().substring(0, i) + " " + data[triggerx].toString().substring(i);
                        } else {
                            formula = formula.substring(0, i) + " " + formula.substring(i);
                        }
                    }
                }
                data[triggerx] = formula;
            }
            trigger=data;
        }
    }
})