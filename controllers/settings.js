

exports.get_settings = function( req, res, next) {
    res.render('settings/index', { title: 'Settings', user: req.user });
  }