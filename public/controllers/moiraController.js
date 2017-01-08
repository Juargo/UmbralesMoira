angular.module("graphApp")
        .controller("moiraCtrl",function ($scope,$compile) {  
            $.ajax({
                url:"http://localhost:3000/getmoiratriggers",
                type: "GET",
                success: function(data){
                    $("#moiratriggers").append($compile(data)($scope));
                }
            });
        })