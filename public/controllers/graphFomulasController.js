angular.module("graphApp")
.controller("graphFormulasCtrl", function ($scope) {
    $scope.options = {
        model: null,
        opciones: [
            { value: "05", text: "05 al 11 Dic" },
            { value: "12", text: "12 al 18 Dic" },
            { value: "19", text: "19 al 25 Dic" },
            { value: "26", text: "26 Dic al 01 Ene" }
        ]
    }

    $scope.changeDias = function () {
        base = parseInt($scope.options.model, 10);
        $scope.dias = [
            { fi: base, ff: base + 1, class: "active", nombre: "Lunes" },
            { fi: base + 1, ff: base + 2, class: "active", nombre: "Martes" },
            { fi: base + 2, ff: base + 3, class: "active", nombre: "Miercoles" },
            { fi: base + 3, ff: base + 4, class: "active", nombre: "Jueves" },
            { fi: base + 4, ff: base + 5, class: "active", nombre: "Viernes" },
            { fi: base + 5, ff: base + 6, class: "active", nombre: "Sabado" },
            { fi: base + 6, ff: base + 7, class: "active", nombre: "Domingo" },
        ]
    }

    $scope.tabactive = function (indi) {  
         for(i=0;i<$scope.dias.length;i++){
                    $scope.dias[i].clas="";
                }
                $scope.dias[indi].clas ="active";

                //plot1.destroy();
                //$scope.getUrl($scope.dias[indi].fi,$scope.dias[indi].ff)
                //console.log($scope.urlg);
                //console.log($scope.dias[indi].fi);
                //console.log($scope.dias[indi].ff);

                //plot1.destroy();
                $scope.getUrl($scope.urlg,$scope.dias[indi].fi,$scope.dias[indi].ff)

    }

    $scope.getUrl = function(urlg,fi,ff){
            var puntosn=[];
                var pw1=[];
                var pw2=[];
                //var urlg = "aliasByNode(summarize(gwpromo.compra.general.estado.Ok, \"10min\", \"sum\"), 4)"
                //aliasByNode(summarize(gwpromo.compra.general.estado.Ok, "10min", "sum"), 4)
                
                $.get("http://localhost:3000/getdataGraph?formula=" + urlg + "&fi=" + fi + "&ff=" + ff,function( data ) {
                    data = JSON.parse(data);
                    puntos = data[0].datapoints;
                    cantidad = puntos.length;
                    for (var i = 0; i < puntos.length; i++) {
                        var t = new Date(puntos[i][1] * 1000);
                        var tt = t.toGMTString();
                        var tt = tt.substr(0,25);
                        ptos_c =puntos[i][0]+0
                        puntosn.push([tt,ptos_c]);
                  
                        if(ptos_c < 10){
                            pw2.push([tt,0]);
                        }else{
                            pw2.push([tt,ptos_c*1.2]);
                        }
                   
                        pw1.push([tt,puntos[i][0]*0.8]);
                    }
                    $.jqplot.config.enablePlugins = true;
                    data = [puntosn,pw1,pw2] ;

                    plot1 = $.jqplot('myChart',data,{
                        title: "Umbrales",
                        axes:{
                            xaxis:{
                                renderer: $.jqplot.DateAxisRenderer,
                                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                                tickOptions:{
                                    formatString: "%H:%M",
                                    angle:-45
                                }
                            }
                        },
                        highligther:{
                            sizeAdjust:10,
                            tooltipLocation:'n',
                            tooltipAxes:'both',
                            tooltipFormatString:'<b><i><span>%s , </span></i></b> %.2f',
                            useAxesFormatters:false
                        }
                    })
                })
                }

})