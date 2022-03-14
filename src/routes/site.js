const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/store', siteController.store);
router.get('/about', siteController.about);
router.get('/contact', siteController.contact);
router.get('/my__account', siteController.my__account);
router.get('/', siteController.home);

module.exports = router;
