const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productschema = new Schema({
    
    SKU: {
        type: String,
        required: true,
        unique: true,
    },
    EAN_CODE: {
        type: String,
    },
    Brand_Name: {
        type: String,
    },
    Product_Name: {
        type: String,
        unique: true,
    },
    HSN_Code: {
        type: String,
    },
    GST: {
        type: String,
    },
        Description: {
            type: String,
        },
        Bullet1: {
            type: String,
        },
        Bullet2: {
            type: String,
        },
        Bullet3: {
            type: String,
        },
        Bullet4: {
            type: String,
        },
        Bullet5: {
            type: String,
        },
        Item_Weight: {
            type: String,
        },
        Item_Length: {
            type: String,
        },
        Item_Width: {
            type: String,
        },
        Item_Height: {
            type: String,
        },
        Item_Unit_Measure: {
            type: String,
        },
        Country: {
            type: String,
        },
        MRP: {
            type: String,
        },
        Manufacturer: {
            type: String,
        },
        Ingredients: {
            type: String,
        },
        Category: {
            type: String,
        },
        Keywords: {
            type: String,
        },
        Main_Image: {
            type: String,
        },
        Image1: {
            type: String,
        },
        Image2: {
            type: String,
        },
        Image3: {
            type: String,
        },
        Image4: {
            type: String,
        },
        Image5: {
            type: String,
        },
        Image6: {
            type: String,
        },
});

const Product = mongoose.model("product", productschema);

module.exports = Product;