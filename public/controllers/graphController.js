angular.module("graphApp")
    .controller("graphController", function ($scope, $http, plot) {
        var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
        day = beforeOneWeek.getDay()
        diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
        $scope.lastLunes = new Date(beforeOneWeek.setDate(diffToMonday))
        $scope.lastMartes = new Date(beforeOneWeek.setDate(diffToMonday + 1))
        $scope.lastMiercoles = new Date(beforeOneWeek.setDate(diffToMonday + 2))
        $scope.lastJueves = new Date(beforeOneWeek.setDate(diffToMonday + 3))
        $scope.lastViernes = new Date(beforeOneWeek.setDate(diffToMonday + 4))
        $scope.lastSabado = new Date(beforeOneWeek.setDate(diffToMonday + 5))
        $scope.lastDomingo = new Date(beforeOneWeek.setDate(diffToMonday + 6));

        $scope.dias = [
            { fi: $scope.lastLunes.getFullYear().toString() + "_" + ($scope.lastLunes.getMonth() + 1).toString() + "_" + $scope.lastLunes.getDate().toString(), class: "active", nombre: "Lunes" },
            { fi: $scope.lastMartes.getFullYear().toString() + "_" + ($scope.lastMartes.getMonth() + 1).toString() + "_" + $scope.lastMartes.getDate().toString(), class: "", nombre: "Martes" },
            { fi: $scope.lastMiercoles.getFullYear().toString() + "_" + ($scope.lastMiercoles.getMonth() + 1).toString() + "_" + $scope.lastMiercoles.getDate().toString(), class: "", nombre: "Miercoles" },
            { fi: $scope.lastJueves.getFullYear().toString() + "_" + ($scope.lastJueves.getMonth() + 1).toString() + "_" + $scope.lastJueves.getDate().toString(), class: "", nombre: "Jueves" },
            { fi: $scope.lastViernes.getFullYear().toString() + "_" + ($scope.lastViernes.getMonth() + 1).toString() + "_" + $scope.lastViernes.getDate().toString(), class: "", nombre: "Viernes" },
            { fi: $scope.lastSabado.getFullYear().toString() + "_" + ($scope.lastSabado.getMonth() + 1).toString() + "_" + $scope.lastSabado.getDate().toString(), class: "", nombre: "Sabado" },
            { fi: $scope.lastDomingo.getFullYear().toString() + "_" + ($scope.lastDomingo.getMonth() + 1).toString() + "_" + $scope.lastDomingo.getDate().toString(), class: "", nombre: "Domingo" },
        ]

        $scope.borrar = function () {
            plot1.destroy()
        }

         $scope.resetid = function () {
            plot.resetid()
        }

        $scope.guardar = function () {
            text = '{"trigger": "test espacio",' +
                '"formulas":' +
                '[]}';

            idg = plot.getid();
            if (typeof idg == 'undefined') {
                $http.post("http://localhost:3000/insert", JSON.parse(text)).then(
                    function (response) {
                        var data = response.data;
                        plot.setid(data);
                    }, function (error) {
                        var data = error.data;
                    });
            }else{
                console.log("dd")
                console.log(idg);
            }
        }

        $scope.getData = function (indice) {
            var puntosn = [];
            var pw1 = [];
            var pw2 = [];
            var urlg = "aliasByNode(summarize(gwpromo.compra.general.estado.Ok, \"10min\", \"sum\"), 4)";


            $.get("http://localhost:3000/getdataGraph?formula=" + urlg + "&fi=" + $scope.dias[indice].fi, function (data) {
                data = JSON.parse(data);
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
            });
        }
    })