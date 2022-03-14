const Product = require('../models/Product');
const {mongooseToObject} = require('../../util/mongoose');
const {mutileMogooseToObject} = require('../../util/mongoose');
// const { isPlainObject } = require('immer/dist/internal');

class StoreController {
    // [GET] /store/:slug
    show(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then(product => {
                // product = product ? product.toObject() : product;
                // res.render('store/show', { product });
                res.render('store/show', { product: mongooseToObject(product) });
            })
            .catch(next);
    }

    // [GET] /store/plants
    plants(req, res, next) {
        Product.find({})
            .lean()
            .then(product => {
                const arrProduct = [];
                product.forEach(product => {
                    if(product.category === "Plants") {
                        return arrProduct.push(product)
                    }
                });
                res.render("store/plants", { arrProduct })
            });
    }
    // [GET] /store/cactus
    cactus(req, res, next) {
        Product.find({})
            .lean()
            .then(product => {
                const arrProduct = [];
                product.forEach(product => {
                    if(product.category === "Cactus") {
                        return arrProduct.push(product)
                    }
                });
                res.render("store/cactus", { arrProduct })
            });
    }
}

module.exports = new StoreController;