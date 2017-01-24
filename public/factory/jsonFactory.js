angular.module("graphApp")
    .factory('jsontrigger', function () {
        trigger = undefined;
        return {
            gettrigger: function () {
                return trigger;
            },
            settrigger: function (options) {

                options.type = options.type || '';
                options.urlg = options.urlg || '';
                options.dias = options.dias || [];
                options.ndia = options.ndia || 0;
                options.dataL = options.dataL || [];
                options.dataU = options.dataU || [];
                options.trigger = options.trigger || {};
                options.nformula = options.nformula || '';

                //datapointL = "";
                var datapointL = []
                for (var i = 0; i < options.dataL.length; i++) {
                    datapointL.push(options.dataL[i]);
                    //datapointL = datapointL + ",[" + options.dataL[i] + "]";
                }

                //datapointU = "";
                var datapointU = []
                for (var i = 0; i < options.dataU.length; i++) {
                    datapointU.push(options.dataU[i]);
                    //datapointU = datapointU + ",[" + options.dataU[i] + "]";
                }
                // console.log(datapointU);
                // console.log(datapointL);
                //datapointL = datapointL.substr(1);
                //datapointU = datapointU.substr(1);

                if (options.type == 'new') {
                    dias = [];
                    for (var i = 0; i < 7; i++) {
                        if (options.dias[i].nombre == options.dias[options.ndia].nombre) {
                            datapL = datapointL;
                            datapU = datapointU;
                        } else {
                            // datapL = '';
                            // datapU = '';
                            datapL = [];
                            datapU = [];
                        }

                        diasO = {
                            nombre: options.dias[i].nombre,
                            puntos: [{
                                serie: 'low',
                                data: datapL
                            }, {
                                serie: 'up',
                                data: datapU
                            }]
                        }

                        dias.push(diasO);
                        // dias = dias + ',{' +
                        //     '"nombre" : "' + options.dias[i].nombre + '",' +
                        //     '"puntos" :[{ "serie": "low", "data": [' + datapL + ']},{"serie": "up", "data": [' + datapU + ']}]' +
                        //     '}'

                        
                    }

                    // dias = dias.substr(1);

                    trigger = {
                        trigger: 'test espacio',
                        formulas: [{
                            nombre: 'TestformulaN0',
                            formula: options.urlg.replace(/"/g, '\\"'),
                            datapoint: dias
                        }]
                    }
                    // trigger = '{"trigger": "test espacio",' +
                    //     '"formulas":' +
                    //     '[' +
                    //     '{' +
                    //     '"nombre" : "TestformulaN0",' +
                    //     '"formula": "' + options.urlg.replace(/"/g, '\\"') + '",' +
                    //     '"datapoint":' +
                    //     '[' +
                    //     dias +
                    //     ']' +
                    //     '}' +
                    //     ']' +
                    //     '}'
                } else if (options.type == 'used') {
                    //trigger = options.trigger;

                    //console.log(trigger.formulas)
                    for (i = 0; i < options.trigger.formulas.length; i++) {
                        if (options.trigger.formulas[i].nombre == options.nformula) {
                            findice = i;
                        }
                    }

                    puntosn = [{ serie: "low", data: datapointL }, { serie: "up", data: datapointU }];

                    //console.log(puntosn);
                    //console.log(trigger.formulas[findice].datapoint[options.ndia].puntos);
                    options.trigger.formulas[findice].datapoint[options.ndia].puntos = puntosn;

                    //console.log(options.trigger);
                    //console.log(trigger.formulas[findice].datapoint[options.ndia].puntos);
                    trigger = options.trigger;
                } else {
                    return "error type"
                }
            }
        }
    })