var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let user = require('../controllers/user');
let client = require('../controllers/client');
let billing = require('../controllers/billing');
let template = require('../controllers/template');
let setting = require('../controllers/setting');

let {isLoggedIn} = require('../middleware/hasAuth.js')
let {hasAuthAdmin} = require('../middleware/hasAuth.js')

/* GET home page. */
router.get('/', isLoggedIn, index.get_index);
router.get('/login', user.get_login);
router.post('/login', user.login);

// USERS //
router.get('/users', isLoggedIn, user.get_users);
router.post('/users', isLoggedIn, user.create_user);
router.get('/users/:user_id', isLoggedIn, user.get_detail);
router.post('/users/:user_id/edit', isLoggedIn, user.edit_user);
router.post('/users/:user_id/delete', isLoggedIn, user.delete_user);

// CLIENTS //
router.get('/clients', isLoggedIn, client.get_clients);
router.post('/clients', isLoggedIn, client.create_client);
router.get('/clients/:client_id', isLoggedIn, client.get_detail);
router.post('/clients/:client_id/edit', isLoggedIn, client.edit_client);
router.post('/clients/:client_id/delete', isLoggedIn, client.delete_client);

// BILLINGS
router.get('/billings', isLoggedIn, billing.get_billings);
router.post('/billings', isLoggedIn, billing.create);

// SETTINGS
router.get('/settings', isLoggedIn, setting.get_settings);

// TEMP
router.get('/invoice_1', isLoggedIn, template.get_invoice_1);

router.get('/logout', isLoggedIn, user.logout);

module.exports = router;
