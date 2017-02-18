angular.module("umbralesApp")
.directive("triggerGuardado",function(trigger){
    return{
        restrinct: 'E',
        templateUrl: 'templates/trigger-guardado.html',
        controller:function($scope){
            $scope.triggeshowguardado = trigger.gettriggerguardado();

            $scope.umbralguardadoselect = function(umbralguardadoselected){
                $scope.showname=true;
                umbralcache = trigger.getntriggerguardado();
                trigger.setindextrigger(umbralguardadoselected);
                $scope.nombreUmbral =umbralcache[0].nombre;
                $scope.weekdefault = true;
            }
        }
    }
})