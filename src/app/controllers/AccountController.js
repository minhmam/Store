const Product = require('../models/Product');
const {mutileMogooseToObject} = require('../../util/mongoose');

class AccountController {
    // [GET] /store/:slug
    show(req, res, next) {
        res.send('my__account')
    }

    // [GET] /account/register
    register(req, res, next) {
        res.render('account/register');
    }

    // [GET] /account/login
    login(req, res, next) {
        res.render('account/login');
    }
}

module.exports = new AccountController;