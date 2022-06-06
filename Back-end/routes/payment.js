const express = require('express');
const paymentrouter = express.Router();
const Payment = require("../model/payment");
const Order = require("../model/order");

paymentrouter.get("/payment", async(req, res) => {
    const payments = await Payment.find();
    if(payments){
    res.send(payments); }
  });
  
  
  var i = 0;
  paymentrouter.post("/paymentimport", async(req, res) => {
    try{
  
      const arrayData = req.body;
  
      const arrData = Array.from(new Set(arrayData.map(JSON.stringify))).map(JSON.parse);
  
      arrData.map(async(val)=>{

          if(val["type"] === "Order"){
            const order = await Order.findOne({amazon_order_id: val["order id"]});
            if(order){
              order.is_payment = true;
              await order.save(); 
            }         
          }
    
          const check = await Payment.findOne({date_time: val["date/time"], settlement_id: val["settlement id"], type: val["type"], total: val["total"]}); 
          if(check===null) {
              await Payment.create({
                date_time: val["date/time"],
                settlement_id: val["settlement id"],
                type: val["type"],
                order_id: val["order id"],
                Sku: val["Sku"],
                description: val["description"],
                quantity: val["quantity"],
                marketplace: val["marketplace"],
                account_type: val["account type"],
                fulfillment: val["fulfillment"],
                order_city: val["order city"],
                order_state: val["order state"],
                order_postal: val["order postal"],
                product_sales: val["product sales"],
                shipping_credits: val["shipping credits"],
                promotional_rebates: val["promotional rebates"],
                Total_sales: val["Total sales tax liable(GST before adjusting TCS)"],
                TCS_CGST: val["TCS-CGST"],
                TCS_SGST: val["TCS-SGST"],
                TCS_IGST: val["TCS-IGST"],
                selling_fees: val["selling fees"],
                fba_fees: val["fba fees"],
                other_transaction_fees: val["other transaction fees"],
                other: val["other"],
                total: val["total"],
                }).then(()=>{
                  i++;
                }).catch((err) => {
                  console.log(err);
                });  
          }
      })
      setTimeout(()=>
      res.send("Total rows-"+arrayData.length+
      " Duplicate rows-"+(arrayData.length - arrData.length)+" Rows added-"+i), 4000);
    } catch (err) {}
  });

  module.exports = paymentrouter
