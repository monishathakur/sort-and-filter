describe('PizzaController', () => {
    'use strict';

    let scope;
    let $q;
    let apiServiceMock;
    let controller;
    let mockData;

    beforeEach(module('app'));

    beforeEach(module(($provide) => {
        apiServiceMock = {
            getPizzas: sinon.stub()
        };

        mockData = {
            pizzas: [
                'Sausage',
                'Cheese'
            ]
        };

        $provide.value('pizzaService', apiServiceMock);

    }));
    beforeEach(inject((_$rootScope_, _$controller_, _$q_) => {
        $q = _$q_;
        scope = _$rootScope_;
        controller = _$controller_;
        apiServiceMock.getPizzas.returns($q.when({data: mockData}));
    }));

    function initController() {
        return controller('PizzaController', {});
    }

    beforeEach(() => {
        controller = initController();
    });

    describe('init', () => {
        context('when it resolves successfully', () => {
            it('fetches data and sets loading to false', () => {
                controller.$onInit();
                scope.$apply();
                expect(apiServiceMock.getPizzas.callCount).to.equals(1);
                expect(controller.pizzas).to.deep.equals(mockData.pizzas);
                expect(controller.masterList).to.deep.equals(mockData.pizzas);
                expect(controller.isLoading).to.be.false;
            });
        });
        context('when it does not resolve successfully', () => {
            it('does not fetch data. It sets loading to false', () => {
                apiServiceMock.getPizzas.returns($q.reject());
                controller.$onInit();
                scope.$apply();
                expect(apiServiceMock.getPizzas.callCount).to.equals(1);
                expect(controller.pizzas).to.deep.equals([]);
                expect(controller.masterList).to.deep.equals([]);
                expect(controller.isLoading).to.be.false;
            });
        })
    });

    describe('#sort', () => {
      it('should toggle isDesc flag and sort the master list', () => {
          controller.pizzas = mockData.pizzas;
          controller.isDesc = true;
          controller.sort();
          expect(controller.isDesc).to.be.false;
          expect(controller.pizzas).to.deep.equals(['Cheese', 'Sausage']);
      });
    });

    describe('#filter', () => {
        context('when sort has not been previously clicked', () => {
            it('should simply filter the pizza list based on filter text', () => {
                controller.masterList = mockData.pizzas;
                controller.filterText = 'ch';
                controller.filter();
                expect(controller.pizzas).to.deep.equals(['Cheese']);
            });
        });
        context('when the list has been previously sorted', () => {
            it('filters the pizza list in case insenstive way based on filter text and maintains the sort order', () => {
                mockData.pizzas.push('Chicken');
                controller.masterList = mockData.pizzas;
                controller.isDesc = true;
                controller.filterText = 'ch';
                controller.filter();
                expect(controller.pizzas).to.deep.equals(['Chicken','Cheese']);
            });
        });
    });
});
