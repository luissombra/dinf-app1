'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var patrimonios = require('../../app/controllers/patrimonios');

	// Patrimonios Routes
	app.route('/patrimonios')
		.get(patrimonios.list)
		.post(users.requiresLogin, patrimonios.create);

	app.route('/patrimonios/:patrimonioId')
		.get(patrimonios.read)
		.put(users.requiresLogin, patrimonios.hasAuthorization, patrimonios.update)
		.delete(users.requiresLogin, patrimonios.hasAuthorization, patrimonios.delete);

	// Finish by binding the Patrimonio middleware
	app.param('patrimonioId', patrimonios.patrimonioByID);
};