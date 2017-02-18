angular.module("umbralesApp")
    .directive("triggerMoira", function ($http, trigger, plot,jsonumbral) {
        return {
            restrict: 'E',
            templateUrl: 'templates/trigger-moira.html',
            controller: function ($scope, $http) {
                $http.get("http://localhost:3000/getmoiratriggers").then(
                    function (resp) {
                        trigger.settrigger(resp.data, 38);
                        $scope.triggers = trigger.gettrigger();
                    }
                );

                $scope.triggerSelect = function (event, triggery) {
                    plot.setid(undefined);
                    $scope.messageok = jsonumbral.getmessageok();
                    $scope.messagenok = jsonumbral.getmessageok();
                    $scope.nombreUmbral = '';
                    $scope.showname = false;
                    $(".dias").removeClass("active");
                    plot.setshowbuttom(false);
                    $scope.showbuttom = plot.getshowbuttom();
                    $scope.nodata = false;
                    $scope.weekdefault = false;
                    $('input[type="radio"]').prop('checked', false);
                    $("#trigger").find(".active").removeClass("active");
                    elementName = $(event.target)[0].localName;

                    plot1 = plot.getPlot1();
                    plot2 = plot.getPlot2();

                    if (plot1 != undefined) {
                        plot1.destroy();
                        plot2.destroy();
                    }

                    if (elementName == "a") {
                        $(event.target).addClass("active");
                    } else {
                        $(event.target).parent().addClass("active");
                    }

                    $http.get("http://localhost:3000/getbyname/" + triggery).then(
                        function (resp) {
                            $scope.showname = true;
                            if (parseInt(resp.data.length, 10) == 0) {
                                trigger.settriggerguardado(true);
                                $scope.numbralesguardados = '';
                            } else {
                                plot.setid(resp.data[0]._id);
                                trigger.settriggerguardado(false);
                                trigger.setntriggerguardado(resp.data[0].formulas);
                                $scope.numbralesguardados = trigger.getntriggerguardado();
                            }

                            $scope.triggershowguardado = trigger.gettriggerguardado();
                        }
                    );

                    trigger.setntrigger(triggery);
                }
            }
        }
    })