var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let user = require('../controllers/user');

let {isLoggedIn} = require('../middleware/hasAuth.js')
let {hasAuthAdmin} = require('../middleware/hasAuth.js')

/* GET home page. */
router.get('/', isLoggedIn, index.get_index);
router.get('/login', user.get_login);
router.post('/login', user.login);

router.get('/users', isLoggedIn, user.get_users);
router.post('/users', isLoggedIn, user.adding_user);

router.get('/logout', isLoggedIn, user.logout);

module.exports = router;
