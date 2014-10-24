'use strict';

// Patrimonios controller
angular.module('patrimonios').controller('PatrimoniosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Patrimonios',
	function($scope, $stateParams, $location, Authentication, Patrimonios ) {
		$scope.authentication = Authentication;

		// Create new Patrimonio
		$scope.create = function() {
			// Create new Patrimonio object
			var patrimonio = new Patrimonios ({
				name: this.name,
                tombo: this.tombo
			});

			// Redirect after save
			patrimonio.$save(function(response) {
				$location.path('patrimonios/' + response._id);

				// Clear form fields
				$scope.name = '';
                $scope.tombo = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Patrimonio
		$scope.remove = function( patrimonio ) {
			if ( patrimonio ) { patrimonio.$remove();

				for (var i in $scope.patrimonios ) {
					if ($scope.patrimonios [i] === patrimonio ) {
						$scope.patrimonios.splice(i, 1);
					}
				}
			} else {
				$scope.patrimonio.$remove(function() {
					$location.path('patrimonios');
				});
			}
		};

		// Update existing Patrimonio
		$scope.update = function() {
			var patrimonio = $scope.patrimonio ;

			patrimonio.$update(function() {
				$location.path('patrimonios/' + patrimonio._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Patrimonios
		$scope.find = function() {
			$scope.patrimonios = Patrimonios.query();
		};

		// Find existing Patrimonio
		$scope.findOne = function() {
			$scope.patrimonio = Patrimonios.get({ 
				patrimonioId: $stateParams.patrimonioId
			});
		};
	}
]);