angular.module("umbralesApp")
    .directive("triggerMoira", function ($http, trigger) {
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
                    $scope.weekdefault = false;
                    $('input[type="radio"]').prop('checked',false);
                    $("#trigger").find(".active").removeClass("active");
                    elementName = $(event.target)[0].localName;

                    if (elementName == "a") {
                        $(event.target).addClass("active");
                    } else {
                        $(event.target).parent().addClass("active");
                    }

                    $http.get("http://localhost:3000/getbyname/" + triggery).then(
                        function (resp) {
                            if (parseInt(resp.data.length, 10) == 0) {
                                trigger.settriggerguardado(true);
                            } else {
                                trigger.settriggerguardado(false);
                            }

                            $scope.triggeshowguardado = trigger.gettriggerguardado();
                        }
                    );

                    trigger.setntrigger(triggery);
                }
            }
        }
    })