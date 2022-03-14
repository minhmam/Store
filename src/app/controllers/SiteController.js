const Product = require('../models/Product');
const {mutileMogooseToObject} = require('../../util/mongoose');

class SiteController {
    // [GET] /
    home(req, res, next) {
        Product.find({})
            .then(product =>{
                product = product.map(product => product.toObject());
                res.render('home', { product })
            })
            .catch(next);
    }
    
    // [GET] /store
    store(req, res, next) {
        Product.find({})
            .then(product =>{
                product = product.map(product => product.toObject());
                res.render('store', { product })
            })
            .catch(next);
    }
    
    // [GET] /about
    about(req, res) {
        res.render('about');
    }
    
    // [GET] /contact
    contact(req, res) {
        res.render('contact');
    }

    // [GET] /my__account
    my__account(req, res) {
        res.render('my__account');
    }
}

module.exports = new SiteController;