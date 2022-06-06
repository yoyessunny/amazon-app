const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    
    amazon_order_id: {
        type: String,
        required: true,
    },
    merchant_order_id: {
        type: String,
    },
    purchase_date: {
        type: String,
    },
    last_updated_date: {
        type: String,
    },
    order_status: {
        type: String,
    },
    fulfillment_channel: {
        type: String,
    },
    sales_channel: {
            type: String,
        },
        order_channel: {
            type: String,
        },
        url: {
            type: String,
        },
        ship_service_level: {
            type: String,
        },
        product_name: {
            type: String,
        },
        sku: {
            type: String,
        },
        asin: {
            type: String,
        },
        item_status: {
            type: String,
        },
        quantity: {
            type: String,
        },
        currency: {
            type: String,
        },
        item_price: {
            type: String,
        },
        item_tax: {
            type: String,
        },
        shipping_price: {
            type: String,
        },
        shipping_tax: {
            type: String,
        },
        gift_wrap_price: {
            type: String,
        },
        gift_wrap_tax: {
            type: String,
        },
        item_promotion_discount: {
            type: String,
        },
        ship_promotion_discount: {
            type: String,
        },
        ship_city: {
            type: String,
        },
        ship_state: {
            type: String,
        },
        ship_postal_code: {
            type: String,
        },
        ship_country: {
            type: String,
        },
        promotion_ids: {
            type: String,
        },
        is_business_order: {
            type: String,
        },
        purchase_order_number: {
            type: String,
        },
        price_designation: {
            type: String,
        },
        fulfilled_by: {
            type: String,
        },
        is_iba: {
            type: String,
        },
        is_payment: {
            type: Boolean,
        },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;