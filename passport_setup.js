
let LocalStrategy = require('passport-local').Strategy;

let bcrypt = require('bcrypt');
let models = require('./models');

const validPassword = function(user, password) {
	return bcrypt.compareSync(password, user.password);
}
module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id)
	});
	passport.deserializeUser(function(id, done) {
		models.User.findOne({
			where: {
				'id' : id
			},
			include:[models.Role]
		}).then(user => {
			if (user == null) {
				done(new Error('Wrong user id.'))
			}
			done(null, user);
		})
	});
	passport.use(new LocalStrategy({
		usernameField: 'username', 
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done) {
		return models.User.findOne({
			where: {
				'username' : username
			}
		}).then(user => {
			if (user == null) {
				return done(null, false)
			} else if (user.password == null || user.password == undefined) {
				return done(null, false)
			} else if(!validPassword(user, password)) {
				return done(null, false)
			}
			return done(null, user, {isLogin: true});
		}).catch(err => {
			done(err, false);
		})
	}))
}