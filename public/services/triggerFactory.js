angular.module("umbralesApp")
    .factory("trigger", function () {
        trigger = undefined;
        ntrigger = undefined;
        triggerguardado = false;
        ntriggerguardado = '';
        indexumbral = -1;
        return {
            settriggerguardado: function (a) {
                triggerguardado = a;
            },
            gettriggerguardado: function () {
                return triggerguardado;
            },
            gettrigger: function () {
                return trigger;
            },
            settrigger: function (data, multiplo) {
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
                trigger = data;
            },
            setntrigger: function (data) {
                ntrigger = data;
            },
            getntrigger: function () {
                return ntrigger;
            },
            getntriggerguardado: function () {
                return ntriggerguardado;
            },
            setntriggerguardado: function (a) {
                ntriggerguardado = a;
            },
            getindextrigger: function () {
                return indexumbral;
            },
            setindextrigger: function (a) {
                indexumbral = a
            }
        }
    })