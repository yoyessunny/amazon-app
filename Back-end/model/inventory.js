const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    
    SKU: {
        type: String,
        required: true,
    },
    ASIN: {
        type: String,
    },
    Product_Name: {
        type: String,
    },
    Stock_on_FBA: {
        type: String,
    },
    Stock_on_MFN: {
        type: String,
    },
});

const Inventory = mongoose.model("inventory", inventorySchema);

module.exports = Inventory;