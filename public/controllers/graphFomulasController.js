angular.module("graphApp")
.controller("graphFormulasCtrl", function ($scope) {
    $scope.options = {
        model: null,
        opciones: [
            { value: "05", text: "05 al 11 Dic" },
            { value: "12", text: "12 al 18 Dic" },
            { value: "19", text: "19 al 25 Dic" },
            { value: "26", text: "26 Dic al 01 Ene" }
        ]
    }

    $scope.changeDias = function () {
        base = parseInt($scope.options.model, 10);
        $scope.dias = [
            { fi: base, ff: base + 1, class: "active", nombre: "Lunes" },
            { fi: base + 1, ff: base + 2, class: "active", nombre: "Martes" },
            { fi: base + 2, ff: base + 3, class: "active", nombre: "Miercoles" },
            { fi: base + 3, ff: base + 4, class: "active", nombre: "Jueves" },
            { fi: base + 4, ff: base + 5, class: "active", nombre: "Viernes" },
            { fi: base + 5, ff: base + 6, class: "active", nombre: "Sabado" },
            { fi: base + 6, ff: base + 7, class: "active", nombre: "Domingo" },
        ]
    }
})