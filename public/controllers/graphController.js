$scope.tabactive = function (indi) {  
         for(i=0;i<$scope.dias.length;i++){
                    $scope.dias[i].clas="";
                }
                $scope.dias[indi].clas ="active";

                if (typeof $scope.plot1 !== 'undefined') {
                    $scope.plot1.destroy();
                }
                
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

                    $scope.plot1 = $.jqplot('myChart',data,{
                        title: "Umbrales",
                        series:[{},{
                            //linePattern: 'dotted',
                            linePattern: 'dashed',
                            lineWidth: 1,
                            showMarker: false,
                            shadow: false,
                            //pointLabels: { show:true } 
                            markerOptions: { style:"circle" }
                        },{
                            linePattern: 'dotted',
                            showMarker: false,
                            shadow: false
                        }],
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