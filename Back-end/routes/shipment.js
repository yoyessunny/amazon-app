const express = require('express');
const shipmentrouter = express.Router();
const Shipment = require("../model/shipment");

shipmentrouter.get("/shipment", async(req, res) => {
    const shipments = await Shipment.find();
    if(shipments){
    res.send(shipments); }
  });


  shipmentrouter.post("/shipmentregister", async(req, res) => {
    try{
  
      const {Shipment_ID, Shipment_Date, Warehouse, Shipped_Via, No_of_products} = req.body;
      const SKU = [];
      const Product_Name = [];
      const Quantity = [];
        for(let i=0;i<No_of_products;i++){
          SKU[i] = req.body[`SKU${i}`];
          Product_Name[i] = req.body[`Product_Name${i}`];
          Quantity[i] = req.body[`Quantity${i}`];
        }
  
      const SKUs = SKU.length;
      const Total_Quantity = Quantity.reduce(getSum, 0);

      function getSum(total, num) {
        return parseInt(total) + parseInt(num);
      }
    
      await Shipment.create({
        Shipment_ID: Shipment_ID,
        Shipment_Date: Shipment_Date,
        Warehouse: Warehouse,
        Shipped_Via: Shipped_Via,
        SKUs: SKUs,
        Total_Quantity: Total_Quantity,
        }).then(()=>{
          res.send("Shipment Added");
        }).catch((err) => {
          console.log(err);
        });
  
    } catch (err) {console.log(err);}
  });


  module.exports = shipmentrouter