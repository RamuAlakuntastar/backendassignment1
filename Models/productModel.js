const moogose = require('mongoose');


const productSchemaRules = {
    name: { type: String, required: true},
    imageUrl: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    category: { type: String, required: true},
    size: { type: [String], required: true},
    createdAt: { type: Date, default: Date.now }
}

const productSchema = new moogose.Schema(productSchemaRules);
const ProductModel = moogose.model('ProductModel', productSchema);


module.exports = ProductModel;



