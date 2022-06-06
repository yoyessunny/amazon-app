const express = require('express');
const inventoryrouter = express.Router();
const Order = require("../model/order");
const Inventory = require("../model/inventory");

inventoryrouter.get("/inventory", async(req, res) => {

    try{
    
      const arrayData = await Order.find();
  
      const arrData = Array.from(new Set(arrayData.map(JSON.stringify))).map(JSON.parse);
  
      arrData.map(async(val)=>{
  
          const check = await Inventory.findOne({SKU: val.sku, ASIN: val.asin}); 
          if(check===null) {
              await Inventory.create({
                SKU: val["sku"],
                ASIN: val["asin"],
                Product_Name: val["product_name"],
                }).then(()=>{
                  
                }).catch((err) => {
                  console.log(err);
                });  
          }
      })
    } catch (err) {}
  
    const inventory = await Inventory.find();
    if(inventory){
    res.send(inventory); }
  });
  
  
  module.exports = inventoryrouter