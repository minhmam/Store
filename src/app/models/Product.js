const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {type: String, default: ''},
    description: {type: String, default: ''},
    image: {type: String, default: ''},
    price: {type: String, default: ''},
    category: {type: String, default: ''},
    slug: { type: String, maxlength: 255 },
}, {timestamps: true});

module.exports = mongoose.model('Product', Product);