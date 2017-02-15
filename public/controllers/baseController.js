angular.module("umbralesApp")
    .controller("baseController", function ($scope, $http, trigger, plot, week) {
        // $scope.triggerguardado = true;
        // $scope.grafica = false;

        // $http.get("http://localhost:3000/getmoiratriggers").then(
        //     function (resp) {
        //         trigger.settrigger(resp.data, 38);
        //         $scope.triggers = trigger.gettrigger();
        //     }
        // );


        // $scope.triggerSelect = function (event, triggery) {
        //     $("#trigger").find(".active").removeClass("active")
        //     elementName = $(event.target)[0].localName
        //     if (elementName == "a") {
        //         $(event.target).addClass("active");
        //     } else {
        //         $(event.target).parent().addClass("active");
        //     }

        //     $http.get("http://localhost:3000/getbyname/" + triggery).then(
        //         function (resp) {
        //             if (parseInt(resp.data.length, 10) == 0) {
        //                 $scope.triggerguradado = true;
        //             } else {
        //                 $scope.triggerguradado = false;
        //             }
        //         }
        //     )

        //     trigger.setntrigger(triggery);
        // }

       

        // //00:00_20161205
        // $scope.baseSelected = function () {
        //     $scope.dias = week.getWeek();
        // }


        // $scope.tabactive = function (indi) {
        //     formula1 = $scope.triggers[trigger.getntrigger()].replace(/ /g, "");
        //     plot1 = plot.getPlot();
        //     if (plot1 != undefined) {
        //         plot1.destroy();
        //     }
        //     // console.log($scope.dias[indi].fi);
        //     getUrl(formula1, $scope.dias[indi].fi ,$scope.dias[indi].ff);
        //     //console.log($scope.triggers[trigger.getntrigger()].replace(/ /g,""));
        // }

        // getUrl = function (urlg, fi,ff) {
        //     var puntosn = [];
        //     var pwu = []; //puntos warning up
        //     var pwd = []; //puntos warning down
        //     var pcu = []; //puntos critical up
        //     var pcd = []; //puntos critical down
        //     //var urlg = "aliasByNode(summarize(gwpromo.compra.general.estado.Ok, \"10min\", \"sum\"), 4)"
        //     //aliasByNode(summarize(gwpromo.compra.general.estado.Ok, "10min", "sum"), 4)
        //     //console.log("http://localhost:3000/getdataGraph?formula=" + urlg + "&fi=" + fi)
        //    console.log(urlg);
        //     $.get("http://localhost:3000/getdataGraph?formula=" + urlg + "&fi=" + fi + "&ff=" + ff, function (data, error) {
        //         puntos = data[0].datapoints;
        //         puntos = week.getOnly(puntos,ff.split("_")[2]);
        //         for (var i = 0; i < puntos.length; i++) {
        //             var t = new Date(puntos[i][1] * 1000);
        //             var tt = t.toGMTString();
        //             var tt = tt.substr(0, 25);
        //             //ptos_c = puntos[i][0] + 0
        //             puntosn.push([tt,puntos[i][0]]);
        //             pwu.push([tt,puntos[i][0]*1.2]);
        //             pwd.push([tt,puntos[i][0]*0.2]);
        //             pcu.push([tt,puntos[i][0]*1.5]);
        //             pcd.push([tt,puntos[i][0]*0.5])

        //             // if (ptos_c < 10) {
        //             //     pw2.push([tt, 0]);
        //             // } else {
        //             //     pw2.push([tt, ptos_c * 0.5]);
        //             // }

        //             // pw1.push([tt, puntos[i][0] * 1.5]);
        //         }
        //         for(i=0;i<puntosn.length;i++){
        //             //console.log("p: " + puntosn[i] +  "   - u:" + pw1[i] + "  - d:" + pw2[i]);
        //             console.log("p: " + puntosn[i] );
        //         }
        //         $.jqplot.config.enablePlugins = true;
        //         data = [puntosn,pwu,pwd,pcu,pcd];

        //         plot.setPlot(data);
        //     })
        // }

    })