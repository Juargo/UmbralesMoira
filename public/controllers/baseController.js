angular.module("umbralesApp")
    .controller("baseController", function ($scope, $http, trigger, plot) {
        $scope.triggerguardado = true;
        $scope.grafica = false;

        $http.get("http://localhost:3000/getmoiratriggers").then(
            function (resp) {
                trigger.settrigger(resp.data, 38);
                $scope.triggers = trigger.gettrigger();
            }
        );


        $scope.triggerSelect = function (event, triggery) {
            $("#trigger").find(".active").removeClass("active")
            elementName = $(event.target)[0].localName
            if (elementName == "a") {
                $(event.target).addClass("active");
            } else {
                $(event.target).parent().addClass("active");
            }

            $http.get("http://localhost:3000/getbyname/" + triggery).then(
                function (resp) {
                    if (parseInt(resp.data.length, 10) == 0) {
                        $scope.triggerguradado = true;
                    } else {
                        $scope.triggerguradado = false;
                    }
                }
            )

            trigger.setntrigger(triggery);
        }

        // var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
        // day = beforeOneWeek.toString().split(/ /g)[2];
        // diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1);
        // $scope.lastLunes = new Date(beforeOneWeek.setDate(diffToMonday))
        // $scope.lastMartes = new Date(beforeOneWeek.setDate(diffToMonday + 1))
        // $scope.lastMiercoles = new Date(beforeOneWeek.setDate(diffToMonday + 2))
        // $scope.lastJueves = new Date(beforeOneWeek.setDate(diffToMonday + 3))
        // $scope.lastViernes = new Date(beforeOneWeek.setDate(diffToMonday + 4))
        // $scope.lastSabado = new Date(beforeOneWeek.setDate(diffToMonday + 5))
        // $scope.lastDomingo = new Date(beforeOneWeek.setDate(diffToMonday + 6));

        //Mon Lunes
        //Tue Martes
        //Wed Miercoles
        //Thu Jueves
        //Fri Viernes
        //Sat Sabado
        //Sun Domingo

        var mes=[];
        mes['Jan'] = '01';
        mes['Feb'] = '02';
        mes['Mar'] = '03';
        mes['Apr'] = '04';
        mes['May'] = '05';
        mes['Jun'] = '06';
        mes['Jul'] = '07';
        mes['Aug'] = '08';
        mes['Sep'] = '09';
        mes['Oct'] = '10';
        mes['Nov'] = '11';
        mes['Dec'] = '12';

        date = new Date();
        date = date.toString().split(/ /g);

        var dia=[];
        dia['Mon'] = 7;
        dia['Tue'] = 8;
        dia['Wed'] = 9;
        dia['Thu'] = 10;
        dia['Fri'] = 11;
        dia['Sat'] = 12;
        dia['Sun'] = 13;

        dd =  new Date(mes[date[1]]+ '-' +  date[2]+ '-' + date[3]);
        dd.setDate(dd.getDate() - dia[date[0]]);
        
        base=dd;
        $scope.lastLunes = new Date(base);
        $scope.lastMartes = new Date(base.setDate(dd.getDate() + 1));
        $scope.lastMiercoles = new Date(base.setDate(dd.getDate() + 1));
        $scope.lastJueves = new Date(base.setDate(dd.getDate() + 1));
        $scope.lastViernes = new Date(base.setDate(dd.getDate() + 1));
        $scope.lastSabado = new Date(base.setDate(dd.getDate() + 1));
        $scope.lastDomingo = new Date(base.setDate(dd.getDate() + 1));

        
        //00:00_20161205
        $scope.baseSelected = function () {
            $scope.dias = [
                { fi: $scope.lastLunes.getFullYear().toString() + "_" + ($scope.lastLunes.getMonth() + 1).toString() + "_" + $scope.lastLunes.getDate().toString(), class: "active", nombre: "Lunes" },
                { fi: $scope.lastMartes.getFullYear().toString() + "_" + ($scope.lastMartes.getMonth() + 1).toString() + "_" + $scope.lastMartes.getDate().toString(), class: "", nombre: "Martes" },
                { fi: $scope.lastMiercoles.getFullYear().toString() + "_" + ($scope.lastMiercoles.getMonth() + 1).toString() + "_" + $scope.lastMiercoles.getDate().toString(), class: "", nombre: "Miercoles" },
                { fi: $scope.lastJueves.getFullYear().toString() + "_" + ($scope.lastJueves.getMonth() + 1).toString() + "_" + $scope.lastJueves.getDate().toString(), class: "", nombre: "Jueves" },
                { fi: $scope.lastViernes.getFullYear().toString() + "_" + ($scope.lastViernes.getMonth() + 1).toString() + "_" + $scope.lastViernes.getDate().toString(), class: "", nombre: "Viernes" },
                { fi: $scope.lastSabado.getFullYear().toString() + "_" + ($scope.lastSabado.getMonth() + 1).toString() + "_" + $scope.lastSabado.getDate().toString(), class: "", nombre: "Sabado" },
                { fi: $scope.lastDomingo.getFullYear().toString() + "_" + ($scope.lastDomingo.getMonth() + 1).toString() + "_" + $scope.lastDomingo.getDate().toString(), class: "", nombre: "Domingo" },
            ]
        }


        $scope.tabactive = function (indi) {
            formula1 = $scope.triggers[trigger.getntrigger()].replace(/ /g, "");
            getUrl(formula1, $scope.dias[indi].fi)
            //console.log($scope.triggers[trigger.getntrigger()].replace(/ /g,""));
        }

        getUrl = function (urlg, fi) {
            var puntosn = [];
            var pw1 = [];
            var pw2 = [];
            //var urlg = "aliasByNode(summarize(gwpromo.compra.general.estado.Ok, \"10min\", \"sum\"), 4)"
            //aliasByNode(summarize(gwpromo.compra.general.estado.Ok, "10min", "sum"), 4)
            //console.log("http://localhost:3000/getdataGraph?formula=" + urlg + "&fi=" + fi)
            $.get("http://localhost:3000/getdataGraph?formula=" + urlg + "&fi=" + fi, function (data, error) {
                puntos = data[0].datapoints;
                cantidad = puntos.length;
                for (var i = 0; i < puntos.length; i++) {
                    var t = new Date(puntos[i][1] * 1000);
                    var tt = t.toGMTString();
                    var tt = tt.substr(0, 25);
                    ptos_c = puntos[i][0] + 0
                    puntosn.push([tt, ptos_c]);

                    if (ptos_c < 10) {
                        pw2.push([tt, 0]);
                    } else {
                        pw2.push([tt, ptos_c * 1.2]);
                    }

                    pw1.push([tt, puntos[i][0] * 0.8]);
                }
                $.jqplot.config.enablePlugins = true;
                data = [puntosn, pw1, pw2];

                plot.setPlot(data);
            })
        }

    })