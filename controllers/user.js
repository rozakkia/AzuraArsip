exports.get_login = function(req, res, next) {
    res.render('auth/login', { title: 'Halaman Masuk' });
  }

exports.get_users = function(req, res, next) {
res.render('user/index', { title: 'Data User' });
}
