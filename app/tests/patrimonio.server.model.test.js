'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Patrimonio = mongoose.model('Patrimonio');

/**
 * Globals
 */
var user, patrimonio;

/**
 * Unit tests
 */
describe('Patrimonio Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			patrimonio = new Patrimonio({
				name: 'Patrimonio Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return patrimonio.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			patrimonio.name = '';

			return patrimonio.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Patrimonio.remove().exec();
		User.remove().exec();

		done();
	});
});