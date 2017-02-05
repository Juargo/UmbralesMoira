angular.module("umbralesApp")
.controller("baseController",function($scope,$http,$compile){
    $scope.triggerguardado = false;
    $scope.grafica = false;

    $http.get("http://localhost:3000/getmoiratriggers")
    .then(
        function(resp){
            var textHtml="";
            for(trigger in resp.data){
                var texto = resp.data[trigger].toString().split("");
                var multiplo = 38;
                for(var i=0;i<texto.length;i++){
                    if(i % multiplo == 0 && i!=0){
                        if(i==multiplo){
                            formula = resp.data[trigger].toString().substring(0,i) + " " + resp.data[trigger].toString().substring(i);
                        }else{
                            formula = formula.substring(0,i) + " " + formula.substring(i); 
                        }
                        
                    }
                }

                textHtml=textHtml +
                '<a href="#" class="list-group-item">' +
                '   <h4 class="list-group-item-heading">'+ trigger +'</h4>'+
                '   <p class="list-group-item-text">'+formula+'</p>'+
                '</a>';
            }
            
            $("#trigger").append($compile(textHtml)($scope));
        }
    );
})