const express = require('express');
const axios = require("axios");
const mongoose = require("mongoose");
const Admin = require("./model/admin");
const Product = require("./model/product");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const {createTokens, validateToken} = require("./JWT");

const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.post("/login", async(req, res) => {
  const {email, password} = req.body;

  const user = await Admin.findOne({email: email});

  if(!user) res.send("User doesnot exist");

  if(user) {
  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match) => {
    if(!match){
      res.send("Wrong Password")
    }else{
      const accessToken = createTokens(user);
      res.json({token: accessToken});
      // res.send("Logged In");
    }
  });
  }
});

app.post("/register", async(req, res) => {
  try{
    console.log("req.body: ",req.body);

    const {email, password, name} = req.body;

    await bcrypt.hash(password, 10).then((hash) => {
       Admin.create({
        email: email,
        password: hash,
        name: name,
      }).then(()=>{
        res.send("Admin Added");
      }).catch((err) => {
        console.log(err);
      });
    });
  } catch (err) {}
});

app.post("/user", validateToken, async(req, res) => {
  const {email} = req.body;
  const user = await Admin.findOne({email: email});
  if(user){
  const loginname = user.name; 
  res.send(loginname); }
});

app.get("/product", async(req, res) => {
  const products = await Product.find();
  if(products){
  res.send(products); }
});

app.post("/productregister", async(req, res) => {
  try{
    const {product_asin} = req.body;
    var product_name, product_price;

    await axios.get(`https://api.rainforestapi.com/request?api_key=${process.env.AMAZON_API_KEY}&type=product&asin=${product_asin}&amazon_domain=amazon.in`)
    .then(function (response) {
      product_name = response.data.product.title;
      product_price = response.data.product.buybox_winner.price.value;
    })
    .catch(function (error) {
      console.log(error);
    });
  
    await Product.create({
        product_name: product_name,
        product_price: product_price,
        product_asin: product_asin,
        delete_flag: false,
      }).then(()=>{
        res.send("Product Added");
      }).catch((err) => {
        console.log(err);
      });
  } catch (err) {}
});

app.get("/competitor/:id", async(req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  var valueArray=[];
  
  if(product){
    product.competitors.map((value, index)=>{
      axios.get(`https://api.rainforestapi.com/request?api_key=${process.env.AMAZON_API_KEY}&type=product&asin=${value.comp_asin}&amazon_domain=amazon.in`)
      .then(function (response) {
        value.comp_name = response.data.product.title;
        value.comp_price = response.data.product.buybox_winner.price.value;
        valueArray.push(value.comp_price);
        console.log(value.comp_price);
      })
      .catch(function (error) {
        console.log(error);
      });
    });
    // console.log(valueArray);
    await product.save();
    res.send(product.competitors);  
  }else{
    res.send("Product not found");
  }

});

app.put("/productedit/:id", async(req, res) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  if(product){
    product.product_name = req.body.name;
    product.product_price = req.body.price;
    product.product_image = req.body.image;
    await product.save();
    res.send("Product Updated");
  }else{
    res.send("Product not found");
  }
});

app.delete("/productdelete/:id", async(req, res) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  if(product){
    product.delete_flag = true;
    await product.save();
    res.send("Product Deleted");
  }else{
    res.send("Product not found");
  }
});

app.delete("/productrestore/:id", async(req, res) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  if(product){
    product.delete_flag = false;
    await product.save();
    res.send("Product Restored");
  }else{
    res.send("Product not found");
  }
});

app.post("/competitorregister/:id", async(req, res) => {
  const id = req.params.id;
  const comp_asin = req.body.comp_asin;
  const product = await Product.findById(id);

  var comp_name, comp_price;

    await axios.get(`https://api.rainforestapi.com/request?api_key=${process.env.AMAZON_API_KEY}&type=product&asin=${comp_asin}&amazon_domain=amazon.in`)
    .then(function (response) {
      comp_name = response.data.product.title;
      comp_price = response.data.product.buybox_winner.price.value;
    })
    .catch(function (error) {
      console.log(error);
    });
  

  if(product){
    const competitor ={
      comp_asin: comp_asin,
      comp_name: comp_name,
      comp_price: comp_price,
    };
    product.competitors.push(competitor);
    const updatedProduct = await product.save();
    res.send({
      message: 'Competitor Created',
      product: updatedProduct.competitors[updatedProduct.competitors.length - 1],
    });
  }else{
    res.send("Product not found");
  }
});


app.listen(5000);