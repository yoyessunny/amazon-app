const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    
    order_id: {
        type: String,
    },
    date_time: {
        type: String,
    },
    settlement_id: {
        type: String,
    },
    type: {
        type: String,
    },
    Sku: {
        type: String,
    },
    description: {
        type: String,
    },
    quantity: {
            type: String,
        },
        marketplace: {
            type: String,
        },
        account_type: {
            type: String,
        },
        fulfillment: {
            type: String,
        },
        order_city: {
            type: String,
        },
        order_state: {
            type: String,
        },
        order_postal: {
            type: String,
        },
        product_sales: {
            type: String,
        },
        shipping_credits: {
            type: String,
        },
        promotional_rebates: {
            type: String,
        },
        Total_sales: {
            type: String,
        },
        TCS_CGST: {
            type: String,
        },
        TCS_SGST: {
            type: String,
        },
        TCS_IGST: {
            type: String,
        },
        selling_fees: {
            type: String,
        },
        fba_fees: {
            type: String,
        },
        other_transaction_fees: {
            type: String,
        },
        other: {
            type: String,
        },
        total: {
            type: String,
        },
});

const Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;