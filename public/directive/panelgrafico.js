angular.module("umbralesApp")
    .directive("panelGrafico", function (week, trigger, plot, jsonumbral, $http) {
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
                $scope.showname = false;
                $scope.baseSelected = function (a) {
                    $scope.weekdefault = true;
                }

                $scope.tabactive = function (indi, event, value, numbralesguardados) {
                    $scope.gdia = value;
                    plot.setshowbuttom(true);
                    $scope.showbuttom = plot.getshowbuttom();
                    $(".dias").removeClass("active");
                    elementName = $(event.target)[0].localName;
                    $(event.target).parent().addClass("active");
                    plot1 = plot.getPlot1();
                    plot2 = plot.getPlot2();

                    if (plot1 != undefined) {
                        plot1.destroy();
                        plot2.destroy();
                    }

                    getUrl($scope.dias[indi].fi, $scope.dias[indi].ff, numbralesguardados, indi);
                }

                getUrl = function (fi, ff, numbralesguardados, diaindex) {
                    var puntosn = [];
                    var pwu = []; //puntos warning up
                    var pwd = []; //puntos warning down
                    var pcu = []; //puntos critical up
                    var pcd = []; //puntos critical down
                    urlg = $scope.triggers[trigger.getntrigger()].replace(/ /g, "");
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
                                if (numbralesguardados == '') {
                                    pwu.push([tt, puntos[i][0] * 1.5]);
                                    pwd.push([tt, puntos[i][0] * 0.5]);
                                    pcu.push([tt, puntos[i][0] * 1.8]);
                                    pcd.push([tt, puntos[i][0] * 0.2]);
                                }
                            }

                            if (numbralesguardados != '') {
                                indextrigger = trigger.getindextrigger();

                                if (numbralesguardados[indextrigger].datapoint[diaindex].puntos["0"].warning["0"].length == 0) {
                                    for (var i = 0; i < puntos.length; i++) {
                                        var t = new Date(puntos[i][1] * 1000);
                                        var tt = t.toGMTString();
                                        var tt = tt.substr(0, 25);
                                        //ptos_c = puntos[i][0] + 0

                                        pwu.push([tt, puntos[i][0] * 1.5]);
                                        pwd.push([tt, puntos[i][0] * 0.5]);
                                        pcu.push([tt, puntos[i][0] * 1.8]);
                                        pcd.push([tt, puntos[i][0] * 0.2]);
                                    }
                                } else {
                                    pwu = numbralesguardados[indextrigger].datapoint[diaindex].puntos["0"].warning["0"];
                                    pwd = numbralesguardados[indextrigger].datapoint[diaindex].puntos["0"].warning["1"];
                                    pcu = numbralesguardados[indextrigger].datapoint[diaindex].puntos["1"].critical["0"];
                                    pcd = numbralesguardados[indextrigger].datapoint[diaindex].puntos["1"].critical["1"];
                                    // console.log(numbralesguardados)
                                }
                            }

                            $.jqplot.config.enablePlugins = true;
                            data = [puntosn, pwu, pwd, pcu, pcd];

                            plot.setPlot(data);
                        } else {
                            $scope.nodata = true;
                        }
                    });
                }


                $scope.warning = function () {
                    plot1.series[1].show = true;
                    plot1.series[2].show = true;
                    plot1.series[3].show = false;
                    plot1.series[4].show = false;
                    plot1.replot();
                }

                $scope.critical = function () {
                    plot1.series[1].show = false;
                    plot1.series[2].show = false;
                    plot1.series[3].show = true;
                    plot1.series[4].show = true;
                    plot1.replot();
                }

                $scope.All = function () {
                    plot1.series[1].show = true;
                    plot1.series[2].show = true;
                    plot1.series[3].show = true;
                    plot1.series[4].show = true;
                    plot1.replot();
                }


                $scope.guardar = function (ndia, nombreUmbral) {
                    idg = plot.getid();

                    jsonumbral.setjsonumbral({
                        type: 'new',
                        urlg: $scope.triggers[trigger.getntrigger()].replace(/ /g, ""),
                        pwu: plot1.series[1].data,
                        pwd: plot1.series[2].data,
                        pcu: plot1.series[3].data,
                        pcd: plot1.series[4].data,
                        dias: week.getWeek(),
                        ndia: ndia, //Día escogido a guardar
                        nombreumbral: nombreUmbral,
                        trigger: $(".triggerscroll").find(".active").find("h4").html()
                    });


                    if (typeof idg == 'undefined') {
                        $http.post("http://localhost:3000/insert", jsonumbral.getjsonumbral()).then(
                            function (response) {
                                var data = response.data;
                                plot.setid(data);
                            }, function (error) {
                                var data = error.data;
                            });
                    } else {
                        $http.put("http://localhost:3000/update/" + plot.getid(), jsonumbral.getjsonumbral());
                    }
                }
            }
        }
    })