angular.module("umbralesApp")
.directive("triggerGuardado",function(trigger){
    return{
        restrinct: 'E',
        templateUrl: 'templates/trigger-guardado.html',
        controller:function($scope){
            $scope.triggeshowguardado = trigger.gettriggerguardado();
        }
    }
})