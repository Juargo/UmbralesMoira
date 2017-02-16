angular.module("umbralesApp")
    .directive("panelGrafico", function (week, trigger, plot) {
        return {
            restrinct: 'E',
            templateUrl: 'templates/panel-grafico.html',
            controller: function ($scope) {
                $scope.dias = week.getWeek();
                $scope.weekdefault = false;
                $scope.lastLunes = week.getLunes();
                $scope.lastDomingo = week.getDomingo();
                $scope.triggershowguardado = trigger.gettriggerguardado();
                $scope.nodata = false;
                $scope.showbuttom = plot.getshowbuttom();

                $scope.baseSelected = function (a) {
                    $scope.weekdefault = true;
                }

                $scope.tabactive = function (indi, event) {
                    plot.setshowbuttom(true);
                    $scope.showbuttom = plot.getshowbuttom();
                    $(".dias").removeClass("active");
                    elementName = $(event.target)[0].localName;
                    $(event.target).parent().addClass("active");



                    formula1 = $scope.triggers[trigger.getntrigger()].replace(/ /g, "");
                    plot1 = plot.getPlot1();
                    plot2 = plot.getPlot2();

                    if (plot1 != undefined) {
                        plot1.destroy();
                        plot2.destroy();
                    }

                    getUrl(formula1, $scope.dias[indi].fi, $scope.dias[indi].ff);

                    
                }

                getUrl = function (urlg, fi, ff) {
                    var puntosn = [];
                    var pwu = []; //puntos warning up
                    var pwd = []; //puntos warning down
                    var pcu = []; //puntos critical up
                    var pcd = []; //puntos critical down
                    //var urlg = "aliasByNode(summarize(gwpromo.compra.general.estado.Ok, \"10min\", \"sum\"), 4)"
                    //aliasByNode(summarize(gwpromo.compra.general.estado.Ok, "10min", "sum"), 4)
                    //console.log("http://localhost:3000/getdataGraph?formula=" + urlg + "&fi=" + fi)
                    //console.log(urlg);
                    $.get("http://localhost:3000/getdataGraph?formula=" + urlg + "&fi=" + fi + "&ff=" + ff, function (data, error) {
                        puntos = data[0].datapoints;
                        puntos = week.getOnly(puntos, ff.split("_")[2]);

                        if (puntos.length != 0) {
                            for (var i = 0; i < puntos.length; i++) {
                                var t = new Date(puntos[i][1] * 1000);
                                var tt = t.toGMTString();
                                var tt = tt.substr(0, 25);
                                //ptos_c = puntos[i][0] + 0
                                puntosn.push([tt, puntos[i][0]]);
                                pwu.push([tt, puntos[i][0] * 1.2]);
                                pwd.push([tt, puntos[i][0] * 0.2]);
                                pcu.push([tt, puntos[i][0] * 1.5]);
                                pcd.push([tt, puntos[i][0] * 0.5])

                                // if (ptos_c < 10) {
                                //     pw2.push([tt, 0]);
                                // } else {
                                //     pw2.push([tt, ptos_c * 0.5]);
                                // }

                                // pw1.push([tt, puntos[i][0] * 1.5]);
                            }
                            for (i = 0; i < puntosn.length; i++) {
                                //console.log("p: " + puntosn[i] +  "   - u:" + pw1[i] + "  - d:" + pw2[i]);
                                //console.log("p: " + puntosn[i]);
                            }
                            $.jqplot.config.enablePlugins = true;
                            data = [puntosn, pwu, pwd, pcu, pcd];

                            plot.setPlot(data);
                        } else {
                            $scope.nodata = true;
                        }
                    })
                }


                $scope.warning = function(){
                    plot1.series[1].show = true;
                    plot1.series[2].show = true;
                    plot1.series[3].show = false;
                    plot1.series[4].show = false;
                    plot1.replot();
                }

                $scope.critical = function(){
                    plot1.series[1].show = false;
                    plot1.series[2].show = false;
                    plot1.series[3].show = true;
                    plot1.series[4].show = true;
                    plot1.replot();
                }
            }
        }
    })