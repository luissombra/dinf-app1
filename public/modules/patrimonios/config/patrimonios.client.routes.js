'use strict';

//Setting up route
angular.module('patrimonios').config(['$stateProvider',
	function($stateProvider) {
		// Patrimonios state routing
		$stateProvider.
		state('listPatrimonios', {
			url: '/patrimonios',
			templateUrl: 'modules/patrimonios/views/list-patrimonios.client.view.html'
		}).
		state('createPatrimonio', {
			url: '/patrimonios/create',
			templateUrl: 'modules/patrimonios/views/create-patrimonio.client.view.html'
		}).
		state('viewPatrimonio', {
			url: '/patrimonios/:patrimonioId',
			templateUrl: 'modules/patrimonios/views/view-patrimonio.client.view.html'
		}).
		state('editPatrimonio', {
			url: '/patrimonios/:patrimonioId/edit',
			templateUrl: 'modules/patrimonios/views/edit-patrimonio.client.view.html'
		});
	}
]);