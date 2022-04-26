const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: { type: String, require: true }, 
    name: { type: String, require: true },
    description: { type: String, require: true },
    defaultPrice: { type: Number, require: true },
    price: { type: Number, require: true },
    img: { type: String, require: true },
    defaultQuantity: { type: Number, require: true },
    quantity: { type: Number, require: true },
    category: { type: Array, require: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);