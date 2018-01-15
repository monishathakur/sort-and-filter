((angular) => {
    'use strict';

    angular.module('app').service('pizzaService', pizzaService);

    function pizzaService($http) {
        let self = this;

        self.getPizzas = getPizzas;

        function getPizzas() {
            return $http.get('../../pizza.json');
        }
    }
})(angular);
