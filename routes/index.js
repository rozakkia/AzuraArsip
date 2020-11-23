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
let user = require('../controllers/user');


let {isLoggedIn} = require('../middleware/hasAuth.js')
let {hasAuthAdmin} = require('../middleware/hasAuth.js')

/* GET home page. */
router.get('/', isLoggedIn, index.get_index);
router.get('/login', user.get_login);
router.post('/login', user.login);
router.get('/login/success', isLoggedIn, user.get_success);
router.get('/login/error', user.get_error);

// USERS //
router.get('/users', isLoggedIn, user.get_users);
router.post('/users', isLoggedIn, user.create_user);
router.get('/users/:user_id', isLoggedIn, user.get_detail);
router.post('/users/update', isLoggedIn, user.edit_user);
router.post('/users/delete', isLoggedIn, user.delete_user);
router.get('/settings/profile', isLoggedIn, user.get_profile);
router.post('/settings/profile/update', isLoggedIn, user.profile_update);
router.post('/settings/profile/pass-change', isLoggedIn, user.pass_update);

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
router.post('/bank_accounts/delete', isLoggedIn, bank_accounts.delete_bankaccounts);
router.post('/bank_accounts/update', isLoggedIn, bank_accounts.update_bankaccounts);

// BILLINGS
router.get('/billings', isLoggedIn, billing.get_billings);
router.post('/billings', isLoggedIn, billing.create_billingFirst);
router.post('/billings/update-created', isLoggedIn, billing.update_billingCreated);
router.post('/billings/delete-created', isLoggedIn, billing.delete_billingCreated);
router.post('/billings/create-detail', isLoggedIn, billing.create_detail);
router.post('/billings/update-detail', isLoggedIn, billing.update_detail);
router.post('/billings/delete-detail', isLoggedIn, billing.delete_detail);
router.post('/billings/create-detail-sub', isLoggedIn, billing.create_detailSub);
router.post('/billings/delete-detail-sub', isLoggedIn, billing.delete_detailSub);
router.get('/billings/:bill_id', isLoggedIn, billing.get_billingCreated);

// SETTINGS

// - CORE
router.get('/settings/core', isLoggedIn, setting.get_core);

router.post('/settings/core/service-create', isLoggedIn, setting.create_service);
router.get('/settings/core/service/:id', isLoggedIn, setting.get_serviceDetail)
router.post('/settings/core/service/update', isLoggedIn, setting.update_service);
router.post('/settings/core/service/delete', isLoggedIn, setting.delete_service);

router.post('/settings/core/types-create', isLoggedIn, jsonParser,urlencodedParser,setting.create_type);
router.get('/settings/core/type/:id', isLoggedIn, setting.get_typeDetail)
router.post('/settings/core/type/update', isLoggedIn, setting.update_type);
router.post('/settings/core/type/delete', isLoggedIn, setting.delete_type);
router.get('/settings/core/type/:id/template', isLoggedIn, setting.get_typeTemplate)

router.post('/settings/core/format-create', isLoggedIn, setting.create_format);
router.get('/settings/core/format_num/:id', isLoggedIn, setting.get_formatDetail);
router.post('/settings/core/format_num/update', isLoggedIn, setting.update_format);
router.post('/settings/core/format_num/delete', isLoggedIn, setting.delete_format);

router.post('/settings/core/role-create', isLoggedIn, setting.create_role);
router.get('/settings/core/role/:id', isLoggedIn, setting.get_roleDetail);
router.post('/settings/core/role/update', isLoggedIn, setting.update_role);
router.post('/settings/core/role/delete', isLoggedIn, setting.delete_role);


// MAILS
router.get('/mails', isLoggedIn, mail.get_mails);
router.post('/mails/surat_masuk-create', isLoggedIn, jsonParser, urlencodedParser, mail.create_suratMasuk);
router.get('/mails/in/:mail_id', isLoggedIn, mail.get_detailMailIn);
router.post('/mails/in/update', isLoggedIn, mail.update_MailIn);
router.post('/mails/in/delete', isLoggedIn, mail.delete_MailIn);

router.post('/mails/surat_keluar-create', isLoggedIn, mail.create_suratKeluarFirst)
router.get('/mails/out/:mail_id', isLoggedIn, mail.get_detailMailOut);
router.post('/mails/out/update', isLoggedIn, mail.update_MailOut);
router.post('/mails/out/delete', isLoggedIn, mail.delete_MailIn);

// TEMP

router.get('/logout', isLoggedIn, user.logout);
router.get('/invoice',isLoggedIn, billing.get_template)

module.exports = router;
