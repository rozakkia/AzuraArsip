

exports.isLoggedIn = function(req, res, next) {
    if (req.user)
        next();
    else 
        res.redirect('/login'); 
}

exports.hasAuthAdmin = function(req, res, next) {
    if (req.user.level == 1){
        next();
    } else 
        res.redirect('/login'); 
}