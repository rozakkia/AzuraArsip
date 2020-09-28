var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let user = require('../controllers/user');

/* GET home page. */
router.get('/', index.get_index);
router.get('/login', user.get_login);
router.get('/users', user.get_users);
router.post('/users', user.adding_user);

router.get('/logout', user.logout);

module.exports = router;
