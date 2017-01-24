angular.module("graphApp")
        .controller("moiraCtrl",function ($scope,$compile,$http) {  
            $scope.triggerguradado = true;
            $.ajax({
                url:"http://localhost:3000/getmoiratriggers",
                type: "GET",
                success: function(data){
                    $("#moiratriggerselect").append($compile(data)($scope));
                }
            });

            $scope.triggerSelect = function () {  
                var trigger =$( "#select option:selected" ).text();
                $http.get("http://localhost:3000/getbyname/" + trigger).then(
                    function (resp) {
                        if(parseInt(resp.data.length,10) == 0){
                            $scope.triggerguradado = false;
                        }else{
                            $scope.triggerguradado = true;
                        }
                    }
                )
            }
            console.log($scope.triggerguradado)
        })