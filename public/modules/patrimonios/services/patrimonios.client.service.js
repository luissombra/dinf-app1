'use strict';

//Patrimonios service used to communicate Patrimonios REST endpoints
angular.module('patrimonios').factory('Patrimonios', ['$resource',
	function($resource) {
		return $resource('patrimonios/:patrimonioId', { patrimonioId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);