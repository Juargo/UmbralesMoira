angular.module("graphApp")
.controller("graphController",function($scope,plot){
    $scope.tabactive = function (indi) {  
        for(i=0;i<$scope.dias.length;i++){
                $scope.dias[i].clas="";
        }
        $scope.dias[indi].clas ="active";

        var plot1 = plot.getPlot()
        if (typeof plot1 !== 'undefined') {
            plot1.destroy();
        }
                
        $scope.getUrl($scope.urlg,$scope.dias[indi].fi)
    }

    $scope.getUrl = function(urlg,fi){
            var puntosn=[];
                var pw1=[];
                var pw2=[];
                //var urlg = "aliasByNode(summarize(gwpromo.compra.general.estado.Ok, \"10min\", \"sum\"), 4)"
                //aliasByNode(summarize(gwpromo.compra.general.estado.Ok, "10min", "sum"), 4)
                
                $.get("http://localhost:3000/getdataGraph?formula=" + urlg + "&fi=" + fi,function( data ) {
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
                    
                    plot.setPlot(data);
                })
                }
})