angular.module("umbralesApp")
.controller("baseController",function($scope,$http,$compile){
    $scope.triggerguardado = false;
    $scope.grafica = false;

    $http.get("http://localhost:3000/getmoiratriggers")
    .then(
        function(resp){
            var textHtml="";
            for(trigger in resp.data){
                formula = resp.data[trigger].toString().substring(0,38) + " " + resp.data[trigger].toString().substring(38);
                formula = formula.substring(0,110) + " " + formula.substring(110);
                textHtml=textHtml +
                '<a href="#" class="list-group-item">' +
                '   <h4 class="list-group-item-heading">'+ trigger +'</h4>'+
                '   <p class="list-group-item-text">'+formula+'</p>'+
                '</a>';
                // console.log(resp.data[trigger].toString().substring(0,38));
                // console.log(resp.data[trigger].toString().substring(15));
            }
            
            $("#trigger").append($compile(textHtml)($scope));
        }
    );
})