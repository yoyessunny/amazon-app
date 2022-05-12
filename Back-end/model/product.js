const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewschema = new Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    rating: {
        type: Number,
    },
});

const productschema = new Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    product_name: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
    },
    product_price: {
        type: String,
    },
    product_rating: {
        type: String,
    },
    product_reviews: {
        type: Number,
    },
    product_description: {
        type: String,
    },
    product_countInStock: {
        type: String,
    },
    product_category: {
        type: String,
    },
    delete_flag: {
        type: Boolean,
    },
    reviews: [reviewschema]
});

const Product = mongoose.model("product", productschema);

module.exports = Product;