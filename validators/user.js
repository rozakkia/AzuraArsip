let models = require('../models');

let validator = require('validator');



exports.validateUser = function(errors, req) {
	return new Promise(function(resolve, reject) {
		return models.User.findOne({
			where: {
				username: req.body.username
			}
		}).then(u => {
			if (u !== null) {
				errors["username"] = "Username is already in use.";
			}
			resolve(errors);
		})
	})
}