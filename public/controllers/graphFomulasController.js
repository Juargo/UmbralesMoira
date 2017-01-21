angular.module("graphApp")
    .controller("graphFormulasCtrl", function ($http,$scope, plot) {

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

        //00:00_20161205
        $scope.baseSelected = function () {
             $scope.dias = [
                { fi: $scope.lastLunes.getFullYear().toString() + "_" + ($scope.lastLunes.getMonth()+1).toString() + "_" + $scope.lastLunes.getDate().toString(), class: "active", nombre: "Lunes" },
                { fi: $scope.lastMartes.getFullYear().toString() + "_" + ($scope.lastMartes.getMonth()+1).toString() + "_" + $scope.lastMartes.getDate().toString(), class: "", nombre: "Martes" },
                { fi: $scope.lastMiercoles.getFullYear().toString() + "_" + ($scope.lastMiercoles.getMonth()+1).toString() + "_" + $scope.lastMiercoles.getDate().toString(), class: "", nombre: "Miercoles" },
                { fi: $scope.lastJueves.getFullYear().toString() + "_" + ($scope.lastJueves.getMonth()+1).toString() + "_" + $scope.lastJueves.getDate().toString(), class: "", nombre: "Jueves" },
                { fi: $scope.lastViernes.getFullYear().toString() + "_" + ($scope.lastViernes.getMonth()+1).toString() + "_" + $scope.lastViernes.getDate().toString(), class: "", nombre: "Viernes" },
                { fi: $scope.lastSabado.getFullYear().toString() + "_" + ($scope.lastSabado.getMonth()+1).toString() + "_" + $scope.lastSabado.getDate().toString(), class: "", nombre: "Sabado" },
                { fi: $scope.lastDomingo.getFullYear().toString() + "_" + ($scope.lastDomingo.getMonth()+1).toString() + "_" + $scope.lastDomingo.getDate().toString(), class: "", nombre: "Domingo" },
            ]
         }


        $scope.guardar = function () {
           plot1 = plot.getPlot();
           datapoint="";
           for (var i=0; i<plot1.series[0].data.length;i++){
               datapoint = datapoint + ",[" + plot1.series[0].data[i] + "]";
           }
           text = '{"tigger": "Test1",'+
                  '"formulas": [' +
                            '{'+
                                '"nombre" : "Testformula",'+
                                '"formula": "' + $scope.urlg.replace(/"/g,'\\"') +'",'+
                                '"datapoint": [' + datapoint.substr(1) + ']'+
                            '}' +
                  ']}';

            //console.log(JSON.parse(text));

          $http.post("http://localhost:3000/insert",JSON.parse(text))
            // $http({
            //     url: 'http://localhost:3000/insert', // IP address replaced with ##'s
            //     method: 'POST',
            //     data: text,
            //     headers: {'Content-Type': 'application/json'}
            // });
          }

    })