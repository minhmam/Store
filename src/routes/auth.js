// const router = express.Router();
const express = require('express');
const router = express.Router();

const MiddlewareController = require('../app/controllers/MiddlewareController');
const authController = require('../app/controllers/AuthController')

//RESGISTER USER
router.post('/register', authController.registerUser);

//LOGIN USER
router.post('/login', authController.loginUser);

//REFRESH
router.post('/refresh', authController.requestRefreshToken);

//LOG OUT
router.post('/logout', MiddlewareController.verifytoken, authController.userLogout)

module.exports = router;