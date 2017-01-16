angular.module("graphApp")
.controller("graphFormulasCtrl", function ($scope) {
    // $scope.options = {
    //     model: null,
    //     opciones: [
    //         { value: "05", text: "05 al 11 Dic" },
    //         { value: "12", text: "12 al 18 Dic" },
    //         { value: "19", text: "19 al 25 Dic" },
    //         { value: "26", text: "26 Dic al 01 Ene" }
    //     ]
    // }

    // $scope.changeDias = function () {
    //     base = parseInt($scope.options.model, 10);
    //     $scope.dias = [
    //         { fi: base, ff: base + 1, class: "active", nombre: "Lunes" },
    //         { fi: base + 1, ff: base + 2, class: "active", nombre: "Martes" },
    //         { fi: base + 2, ff: base + 3, class: "active", nombre: "Miercoles" },
    //         { fi: base + 3, ff: base + 4, class: "active", nombre: "Jueves" },
    //         { fi: base + 4, ff: base + 5, class: "active", nombre: "Viernes" },
    //         { fi: base + 5, ff: base + 6, class: "active", nombre: "Sabado" },
    //         { fi: base + 6, ff: base + 7, class: "active", nombre: "Domingo" },
    //     ]
    // }

        var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
        day = beforeOneWeek.getDay()
        diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
        $scope.lastLunes = new Date(beforeOneWeek.setDate(diffToMonday))
        $scope.lastMartes = new Date(beforeOneWeek.setDate(diffToMonday + 1))
        $scopelastMiercoles = new Date(beforeOneWeek.setDate(diffToMonday + 2))
        $scope.lastJueves = new Date(beforeOneWeek.setDate(diffToMonday + 3))
        $scope.lastViernes = new Date(beforeOneWeek.setDate(diffToMonday + 4))
        $scope.lastSabado = new Date(beforeOneWeek.setDate(diffToMonday + 5))
        $scope.lastDomingo = new Date(beforeOneWeek.setDate(diffToMonday + 6));
})