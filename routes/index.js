var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json()

let index = require('../controllers/index');

let bank_accounts = require('../controllers/bank_account');
let billing = require('../controllers/billing');
let client = require('../controllers/client');
let mail = require('../controllers/mail');
let setting = require('../controllers/setting');
let template = require('../controllers/template');
let user = require('../controllers/user');


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
router.post('/users/role-create', isLoggedIn, user.create_role);

router.get('/createadmin', user.create_userSuperAdmin);

// CLIENTS //
router.get('/clients', isLoggedIn, client.get_clients);
router.post('/clients', isLoggedIn, client.create_client);
router.get('/clients/:client_id', isLoggedIn, client.get_detail);
router.post('/clients/:client_id/edit', isLoggedIn, client.edit_client);
router.post('/clients/:client_id/delete', isLoggedIn, client.delete_client);
router.post('/clients/:client_id/contact_create', isLoggedIn, client.create_clientContact);

// BANK ACCOUNTS
router.get('/bank_accounts', isLoggedIn, bank_accounts.get_bankaccounts);
router.post('/bank_accounts', isLoggedIn, bank_accounts.create_bankaccounts);
router.post('/bank_accounts/hapus', isLoggedIn, bank_accounts.delete_bankaccounts);
router.post('/bank_accounts/ubah', isLoggedIn, bank_accounts.update_bankaccounts);

// BILLINGS
router.get('/billings', isLoggedIn, billing.get_billings);
router.post('/billings', isLoggedIn, billing.create_billingFirst);
router.get('/billings/create', isLoggedIn, billing.get_billingCreated);
router.post('/billings/update-created', isLoggedIn, billing.update_billingCreated);
router.post('/billings/create-detail', isLoggedIn, billing.create_detail);
router.post('/billings/delete-detail', isLoggedIn, billing.delete_detail);
router.get('/billings/detail', isLoggedIn, billing.get_billingCreated);

// SETTINGS

// - CORE
router.get('/settings/core', isLoggedIn, setting.get_core);
router.post('/settings/core/service-create', isLoggedIn, setting.create_service);
router.post('/settings/core/types-create', isLoggedIn, jsonParser,urlencodedParser,setting.create_type);
router.post('/settings/core/format-create', isLoggedIn, setting.create_format);


// MAILS
router.get('/mails', isLoggedIn, mail.get_mails);
//router.post('/mails', isLoggedIn, mail.create_mail);
//router.get('/mails/create', isLoggedIn, mail.getCreate_mail);
//router.post('/mails/create', isLoggedIn, mail.createUpdate_mail);

// TEMP
router.get('/invoice_1', isLoggedIn, template.get_invoice_1);
router.get('/invoice_num', billing.invoice_number);

router.get('/logout', isLoggedIn, user.logout);

module.exports = router;
