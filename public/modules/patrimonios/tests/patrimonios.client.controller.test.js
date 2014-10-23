'use strict';

(function() {
	// Patrimonios Controller Spec
	describe('Patrimonios Controller Tests', function() {
		// Initialize global variables
		var PatrimoniosController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Patrimonios controller.
			PatrimoniosController = $controller('PatrimoniosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Patrimonio object fetched from XHR', inject(function(Patrimonios) {
			// Create sample Patrimonio using the Patrimonios service
			var samplePatrimonio = new Patrimonios({
				name: 'New Patrimonio'
			});

			// Create a sample Patrimonios array that includes the new Patrimonio
			var samplePatrimonios = [samplePatrimonio];

			// Set GET response
			$httpBackend.expectGET('patrimonios').respond(samplePatrimonios);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.patrimonios).toEqualData(samplePatrimonios);
		}));

		it('$scope.findOne() should create an array with one Patrimonio object fetched from XHR using a patrimonioId URL parameter', inject(function(Patrimonios) {
			// Define a sample Patrimonio object
			var samplePatrimonio = new Patrimonios({
				name: 'New Patrimonio'
			});

			// Set the URL parameter
			$stateParams.patrimonioId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/patrimonios\/([0-9a-fA-F]{24})$/).respond(samplePatrimonio);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.patrimonio).toEqualData(samplePatrimonio);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Patrimonios) {
			// Create a sample Patrimonio object
			var samplePatrimonioPostData = new Patrimonios({
				name: 'New Patrimonio'
			});

			// Create a sample Patrimonio response
			var samplePatrimonioResponse = new Patrimonios({
				_id: '525cf20451979dea2c000001',
				name: 'New Patrimonio'
			});

			// Fixture mock form input values
			scope.name = 'New Patrimonio';

			// Set POST response
			$httpBackend.expectPOST('patrimonios', samplePatrimonioPostData).respond(samplePatrimonioResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Patrimonio was created
			expect($location.path()).toBe('/patrimonios/' + samplePatrimonioResponse._id);
		}));

		it('$scope.update() should update a valid Patrimonio', inject(function(Patrimonios) {
			// Define a sample Patrimonio put data
			var samplePatrimonioPutData = new Patrimonios({
				_id: '525cf20451979dea2c000001',
				name: 'New Patrimonio'
			});

			// Mock Patrimonio in scope
			scope.patrimonio = samplePatrimonioPutData;

			// Set PUT response
			$httpBackend.expectPUT(/patrimonios\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/patrimonios/' + samplePatrimonioPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid patrimonioId and remove the Patrimonio from the scope', inject(function(Patrimonios) {
			// Create new Patrimonio object
			var samplePatrimonio = new Patrimonios({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Patrimonios array and include the Patrimonio
			scope.patrimonios = [samplePatrimonio];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/patrimonios\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePatrimonio);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.patrimonios.length).toBe(0);
		}));
	});
}());