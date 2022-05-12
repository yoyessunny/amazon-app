const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const competitorschema = new Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    comp_asin: {
        type: String,
        required: true
    },
    comp_name: {
        type: String,
    },
    comp_price: {
        type: String,
    },
});

const productschema = new Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    product_name: {
        type: String,
        required: true
    },
    product_asin: {
        type: String,
    },
    product_price: {
        type: String,
    },
    delete_flag: {
        type: Boolean,
    },
    competitors: [competitorschema]
});

const Product = mongoose.model("product", productschema);

module.exports = Product;