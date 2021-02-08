

const routeAccess = function(req, res, next, route){
    hasRoute = req.user.Role.routing.split(',')
    if (hasRoute.indexOf(route) == -1){
        res.redirect('/'); 
        console.log(route)
        console.log(hasRoute.indexOf(route))
        console.log(hasRoute)
    } else {
        return next();
    }
        
}
exports.isLoggedIn = function(req, res, next) {
    if (req.user)
        next();
    else 
        res.redirect('/login'); 
}

exports.notLoggedIn = function(req, res, next) {
    if (!req.user)
        next();
    else 
        res.redirect('/'); 
}

exports.authBankAccount = function(req, res, next) {
    routeAccess(req, res, next, '1')
}

exports.authBilling = function(req, res, next) {
    routeAccess(req, res, next, '2')
}

exports.authClient = function(req, res, next) {
    routeAccess(req, res, next, '3')
}

exports.authMail = function(req, res, next) {
    routeAccess(req, res, next, '4')
}

exports.authUser = function(req, res, next) {
    routeAccess(req, res, next, '5')
}

exports.authCore = function(req, res, next) {
    routeAccess(req, res, next, '6')
}