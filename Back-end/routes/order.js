const express = require('express');
const router = express.Router();
const Order = require("../model/order");
const Payment = require("../model/payment");

router.get("/order", async(req, res) => {
    const orders = await Order.find();
    if(orders){
    res.send(orders); }
  });


  router.get("/order/:id", async(req, res) => {
    const id = req.params.id;
    const order = await Order.findOne({amazon_order_id: id});
    if(order){
      res.send(order);
    }else{
      res.send("Order not found");
    }
  });
  

  router.get("/orderpayment/:id", async(req, res) => {
    const OrderID = req.params.id;
    const payments = await Payment.find({order_id: OrderID});
    if(payments){
      res.send(payments);
    }else{
      res.send("Payment not found");
    }
  });

  
  var i = 0;

  router.post("/orderimport", async(req, res) => {
    try{
  
      const arrayData = req.body;
  
      const arrData = Array.from(new Set(arrayData.map(JSON.stringify))).map(JSON.parse);
  
      arrData.map(async(val)=>{
  
          const check = await Order.findOne({amazon_order_id: val["amazon-order-id"], sku: val.sku}); 
          if(check===null) {
              await Order.create({
                amazon_order_id: val["amazon-order-id"],
                merchant_order_id: val["merchant-order-id"],
                purchase_date: val["purchase-date"],
                last_updated_date: val["last-updated-date"],
                order_status: val["order-status"],
                fulfillment_channel: val["fulfillment-channel"],
                sales_channel: val["sales-channel"],
                order_channel: val["order-channel"],
                url: val.url,
                ship_service_level: val["ship-service-level"],
                product_name: val["product-name"],
                sku: val.sku,
                asin: val.asin,
                item_status: val["item-status"],
                quantity: val.quantity,
                currency: val.currency,
                item_price: val["item-price"],
                item_tax: val["item-tax"],
                shipping_price: val["shipping-price"],
                shipping_tax: val["shipping-tax"],
                gift_wrap_price: val["gift-wrap-price"],
                gift_wrap_tax: val["gift-wrap-tax"],
                item_promotion_discount: val["item-promotion-discount"],
                ship_promotion_discount: val["ship-promotion-discount"],
                ship_city: val["ship-city"],
                ship_state: val["ship-state"],
                ship_postal_code: val["ship-postal-code"],
                ship_country: val["ship-country"],
                promotion_ids: val["promotion-ids"],
                is_business_order: val["is-business-order"],
                purchase_order_number: val["purchase-order-number"],
                price_designation: val["price-designation"],
                fulfilled_by: val["fulfilled-by"],
                is_iba: val["is-iba"],
                }).then(()=>{
                  i++;
                }).catch((err) => {
                  console.log(err);
                });  
          }
      })
      setTimeout(()=>
      res.send("Total rows-"+arrayData.length+
      " Duplicate rows-"+(arrayData.length - arrData.length)+" Rows added-"+i), 2000);
    } catch (err) {}
  });

  module.exports = router
