'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Patrimonio = mongoose.model('Patrimonio'),
	_ = require('lodash');

/**
 * Create a Patrimonio
 */
exports.create = function(req, res) {
	var patrimonio = new Patrimonio(req.body);
	patrimonio.user = req.user;

	patrimonio.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(patrimonio);
		}
	});
};

/**
 * Show the current Patrimonio
 */
exports.read = function(req, res) {
	res.jsonp(req.patrimonio);
};

/**
 * Update a Patrimonio
 */
exports.update = function(req, res) {
	var patrimonio = req.patrimonio ;

	patrimonio = _.extend(patrimonio , req.body);

	patrimonio.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(patrimonio);
		}
	});
};

/**
 * Delete an Patrimonio
 */
exports.delete = function(req, res) {
	var patrimonio = req.patrimonio ;

	patrimonio.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(patrimonio);
		}
	});
};

/**
 * List of Patrimonios
 */
exports.list = function(req, res) { Patrimonio.find().sort('-created').populate('user', 'displayName').exec(function(err, patrimonios) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(patrimonios);
		}
	});
};

/**
 * Patrimonio middleware
 */
exports.patrimonioByID = function(req, res, next, id) { Patrimonio.findById(id).populate('user', 'displayName').exec(function(err, patrimonio) {
		if (err) return next(err);
		if (! patrimonio) return next(new Error('Failed to load Patrimonio ' + id));
		req.patrimonio = patrimonio ;
		next();
	});
};

/**
 * Patrimonio authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.patrimonio.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};