const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/accountController');

router.get('/register', accountController.register);
router.get('/login', accountController.login);
router.get('/', accountController.show);

module.exports = router;
