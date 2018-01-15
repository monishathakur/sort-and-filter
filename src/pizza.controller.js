((angular, _) => {
    'use strict';

    angular.module('app').controller('PizzaController', PizzaController);

    function PizzaController(pizzaService) {
        let vm = this;

        vm.filterText = '';
        vm.pizzas = [];
        vm.masterList = [];
        vm.isLoading = true;

        vm.sort = sort;
        vm.filter = filter;
        vm.$onInit = init;

        function init() {
            pizzaService.getPizzas()
                .then((response) => {
                    vm.masterList = _.get(response, ['data','pizzas'], []);
                    vm.pizzas = _.get(response, ['data','pizzas'], []);
                })
                .catch((err) => console.log(err))
                .finally(() => vm.isLoading = false);
        }

        function sort() {
            vm.isDesc = !vm.isDesc;
            sortPizzas();
        }

        function sortPizzas() {
            const sortOrder = vm.isDesc ? 'desc' : 'asc';

            vm.pizzas = _.orderBy(vm.pizzas, [pizza => pizza.toLowerCase()], sortOrder);
        }

        function filter() {
            vm.pizzas = _.filter(vm.masterList, (pizza) => {
                return _.includes(pizza.toLowerCase(), vm.filterText.toLowerCase());
            });

            if (!_.isUndefined(vm.isDesc)) {
                sortPizzas();
            }
        }
    }
})(angular, _);
