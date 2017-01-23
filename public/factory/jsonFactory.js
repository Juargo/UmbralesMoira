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

                if (options.type == 'new') {
                    dias = '';
                    for (var i = 0; i < 7; i++) {
                        dias = dias + ',{' +
                            '"nombre" : "' + options.dias[i].nombre + '",' +
                            '"puntos" :[]' +
                            '}'
                    }

                    dias = dias.substr(1);

                    trigger = '{"trigger": "test espacio",' +
                        '"formulas":' +
                        '[' +
                        '{' +
                            '"nombre" : "TestformulaN0",' +
                            '"formula": "' + options.urlg.replace(/"/g, '\\"') + '",' +
                            '"datapoint":' +
                                '[' +
                                    dias +
                                ']' +
                        '}' +
                        ']' +
                        '}'
                } else if (option.type == 'used') {

                } else {
                    return "error type"
                }
            }
        }
    })