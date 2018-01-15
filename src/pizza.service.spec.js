describe('pizzaService', () => {
    'use strict';

    const url = '../../pizza.json';
    let http;
    let httpBackend;
    let service;
    let mockData;

    beforeEach(module('app'));

    beforeEach(inject(($http, $httpBackend, pizzaService) => {
        mockData = {
            pizzas: [
                'Sausage',
                'Cheese'
            ]
        };
        service = pizzaService;
        http = $http;
        httpBackend = $httpBackend;
    }));

    describe('#getPizzas', () => {
        context('when it resolves successfully', () => {
            it('resolves the promise successfully with response', () => {
                httpBackend.expectGET(url).respond(200, mockData);
                service.getPizzas().then(function(response) {
                   expect(response.data).to.deep.equals(mockData);
                });
                httpBackend.flush();
            });
        });
        context('when it does not resolve successfully', () => {
            it('rejects with error', () => {
                httpBackend.expectGET(url).respond(400, 'err');
                service.getPizzas().catch(function(err) {
                    expect(err).to.deep.equals(err);
                });
                httpBackend.flush();
            });
        })
    });
});
