var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json()

let index = require('../controllers/index');

let bank_accounts = require('../controllers/bank_account');
let billing = require('../controllers/billing');
let client = require('../controllers/client');
let file = require('../controllers/file');
let mail = require('../controllers/mail');
let setting = require('../controllers/setting');
let user = require('../controllers/user');

let {
    isLoggedIn, 
    authBankAccount, 
    authBilling, 
    authClient, 
    authCore, 
    authMail, 
    authUser
} = require('../middleware/hasAuth.js')

/* GET home page. */
router.get('/', isLoggedIn, index.get_index);
router.get('/login', user.get_login);
router.post('/login', user.login);
router.get('/login/success', isLoggedIn, user.get_success);
router.get('/login/error', user.get_error);

// USERS //
router.get('/users', isLoggedIn, authUser, user.get_users);
router.post('/users', isLoggedIn, authUser, user.create_user);
router.get('/users/:user_id', isLoggedIn, authUser, user.get_detail);
router.post('/users/update', isLoggedIn, authUser, user.edit_user);
router.post('/users/delete', isLoggedIn, authUser, user.delete_user);
router.get('/settings/profile', isLoggedIn, user.get_profile);
router.post('/settings/profile/update', isLoggedIn, user.profile_update);
router.post('/settings/profile/pass-change', isLoggedIn, user.pass_update);

router.get('/install', user.create_userSuperAdmin);

// CLIENTS //
router.get('/clients', isLoggedIn, authClient, client.get_clients);
router.post('/clients', isLoggedIn, authClient, client.create_client);
router.get('/clients/:client_id', isLoggedIn, authClient, client.get_detail);
router.post('/clients/:client_id/edit', isLoggedIn, authClient, client.edit_client);
router.post('/clients/:client_id/delete', isLoggedIn, authClient, client.delete_client);
router.post('/clients/:client_id/contact_create', isLoggedIn, authClient, client.create_clientContact);
router.post('/clients/:id/contact_delete', isLoggedIn, authClient, client.delete_clientContact);
router.post('/clients/bank_create', isLoggedIn, authClient, client.create_clientBank);
router.post('/clients/:id/bank_edit', isLoggedIn, authClient, client.edit_clientBank);
router.post('/clients/:id/bank_delete', isLoggedIn, authClient, client.delete_clientBank);


// BANK ACCOUNTS
router.get('/bank_accounts', isLoggedIn, authBankAccount, bank_accounts.get_bankaccounts);
router.post('/bank_accounts', isLoggedIn, authBankAccount, bank_accounts.create_bankaccounts);
router.post('/bank_accounts/delete', isLoggedIn, authBankAccount, bank_accounts.delete_bankaccounts);
router.post('/bank_accounts/update', isLoggedIn, authBankAccount, bank_accounts.update_bankaccounts);

// BILLINGS
router.get('/billings', isLoggedIn, authBilling, billing.get_billings);
router.post('/billings', isLoggedIn, authBilling, billing.create_billingFirst);
router.post('/billings/update-created', isLoggedIn, authBilling, billing.update_billingCreated);
router.post('/billings/delete-created', isLoggedIn, authBilling, billing.delete_billingCreated);
router.post('/billings/create-detail', isLoggedIn, authBilling, billing.create_detail);
router.post('/billings/update-detail', isLoggedIn, authBilling, billing.update_detail);
router.post('/billings/delete-detail', isLoggedIn, authBilling, billing.delete_detail);
router.post('/billings/create-detail-sub', isLoggedIn, authBilling, billing.create_detailSub);
router.post('/billings/delete-detail-sub', isLoggedIn, authBilling, billing.delete_detailSub);
router.get('/billings/:bill_id', isLoggedIn, authBilling, billing.get_billingCreated);
router.post('/billings/create-main', isLoggedIn, authBilling, billing.create_main);
router.get('/billings/:bill_id/print-detailnya', isLoggedIn, authBilling, billing.get_print_detail);
router.post('/billings/update-main', isLoggedIn, authBilling, billing.update_main);
router.post('/billings/print-data-now', isLoggedIn, authBilling, billing.print_data)

// SETTINGS

// - CORE
router.get('/settings/core', isLoggedIn, authCore, setting.get_core);

router.post('/settings/core/service-create', isLoggedIn, authCore, setting.create_service);
router.get('/settings/core/service/:id', isLoggedIn, authCore, setting.get_serviceDetail)
router.post('/settings/core/service/update', isLoggedIn, authCore, setting.update_service);
router.post('/settings/core/service/delete', isLoggedIn, authCore, setting.delete_service);

router.post('/settings/core/types-create', isLoggedIn, authCore, jsonParser, urlencodedParser, setting.create_type);
router.get('/settings/core/type/:id', isLoggedIn, authCore, setting.get_typeDetail)
router.post('/settings/core/type/update', isLoggedIn, authCore, setting.update_type);
router.post('/settings/core/type/delete', isLoggedIn, authCore, setting.delete_type);
router.get('/settings/core/type/:id/template', isLoggedIn, authCore, setting.get_typeTemplate)
router.post('/settings/core/type/file/update', isLoggedIn, authCore, jsonParser, urlencodedParser, setting.update_typeFile);

router.post('/settings/core/format-create', isLoggedIn, authCore, setting.create_format);
router.get('/settings/core/format_num/:id', isLoggedIn, authCore, setting.get_formatDetail);
router.post('/settings/core/format_num/update', isLoggedIn, authCore, setting.update_format);
router.post('/settings/core/format_num/delete', isLoggedIn, authCore, setting.delete_format);

router.post('/settings/core/role-create', isLoggedIn, authCore, setting.create_role);
router.get('/settings/core/role/:id', isLoggedIn, authCore, setting.get_roleDetail);
router.post('/settings/core/role/update', isLoggedIn, authCore, setting.update_role);
router.post('/settings/core/role/delete', isLoggedIn, authCore, setting.delete_role);

router.get('/settings/core/template/create', isLoggedIn, authCore, setting.get_template);
router.post('/settings/core/template/create', isLoggedIn, authCore, setting.create_template);
router.get('/settings/core/template/:id_template', isLoggedIn, authCore, setting.get_templateDetail);
router.post('/settings/core/template/update', isLoggedIn, authCore, setting.update_templateDetail);

// MAILS
router.get('/mails', isLoggedIn, authMail, mail.get_mails);
router.post('/mails/surat_masuk-create', isLoggedIn, authMail, jsonParser, urlencodedParser, mail.create_suratMasuk);
router.get('/mails/in/:mail_id', isLoggedIn, authMail, mail.get_detailMailIn);
router.post('/mails/in/update', isLoggedIn, authMail, mail.update_MailIn);
router.post('/mails/in/delete', isLoggedIn, authMail, mail.delete_MailIn);

router.post('/mails/surat_keluar-create', isLoggedIn, authMail, mail.create_suratKeluarFirst)
router.get('/mails/out/:mail_id', isLoggedIn, authMail, mail.get_detailMailOut);
router.post('/mails/out/update', isLoggedIn, authMail, mail.update_MailOut);
router.post('/mails/out/delete', isLoggedIn, authMail, mail.delete_MailIn);
router.post('/mails/out/:mail_id/activate_ubah', isLoggedIn, authMail, mail.activateUbah);
router.get('/mails/out/:mail_id/print-detailnya', isLoggedIn, authMail, mail.get_print_detail);
router.post('/mails/out/print-data-now', isLoggedIn, authMail, mail.print_data)


// FILE
router.get('/file/:file_name', isLoggedIn, file.get_file)

// TEMP

router.get('/logout', isLoggedIn, user.logout);
router.get('/invoice',isLoggedIn, billing.get_template)

module.exports = router;
