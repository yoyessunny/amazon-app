const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
    
    Shipment_ID: {
        type: String,
    },
    Shipment_Date: {
        type: String,
    },
    Warehouse: {
        type: String,
    },
    Shipped_Via: {
        type: String,
    },
    SKUs: {
        type: String,
    },
    Total_Quantity: {
        type: String,
    },
});

const Shipment = mongoose.model("shipment", shipmentSchema);

module.exports = Shipment;