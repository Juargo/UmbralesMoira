angular.module("umbralesApp")
    .factory('jsonumbral', function () {
        umbral = undefined;
        return {
            getjsonumbral: function () {
                return umbral;
            },
            setjsonumbral: function (options) {
                //console.log(options);
                type = options.type || '';
                urlg = options.urlg || '';
                ddias = options.dias || [];
                ndia = options.ndia || 0;
                pwu = options.pwu || [];
                pwd = options.pwd || [];
                pcu = options.pcu || [];
                pcd = options.pcd || [];
                trigger = options.trigger || {};
                nombreumbral = options.nombreumbral || '';


                function reagrupar(a) {
                    var b = []
                    for (var i = 0; i < a.length; i++) {
                        b.push(a[i]);
                    }

                    return b;
                }

                pwu = reagrupar(pwu);
                pwd = reagrupar(pwd);
                pcu = reagrupar(pcu);
                pcd = reagrupar(pcd);

                if (type == 'new') {
                    dias = [];
                    for (var i = 0; i < 7; i++) {
                        if (ddias[i].nombre == ndia) {
                            datapwu = pwu;
                            datapwd = pwd;
                            datapcu = pcu;
                            datapcd = pcd;
                        } else {
                            datapwu = [];
                            datapwd = [];
                            datapcu = [];
                            datapcd = [];
                        }

                        dias0 = {
                            nombre: ddias[i].nombre,
                            puntos: [{
                                warning: [datapwu,datapwd]
                            }, {
                                critical: [datapcu,datapcd]
                            }]
                        }
                    
                        dias.push(dias0);
                    }

                    umbral = {
                        trigger: trigger,
                        formulas: [{
                            nombre: nombreumbral,
                            formula: urlg.replace(/"/g, '\\"'),
                            datapoint: dias
                        }]
                    }


                    
                } else if (type == 'old') {
                    
                }
            }
        }
    });