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
    console.log("req.body: ",req.body);

    // const {product_asin} = req.body;
    const product_asin = "B072DYG94F";

    await axios.get(`https://api.rainforestapi.com/request?api_key=${process.env.AMAZON_API_KEY}&type=product&asin=${product_asin}&amazon_domain=amazon.in`)
    .then(function (response) {
      console.log(response.data.product.title);
    })
    .catch(function (error) {
      console.log(error);
    });
    res.send("");
    // await Product.create({
    //     product_name: product_name,
    //     product_image: product_image,
    //     product_price: product_price,
    //     product_rating: product_rating,
    //     product_reviews: product_reviews,
    //     product_description: product_description,
    //     product_countInStock: product_countInStock,
    //     product_category: product_category,
    //     delete_flag: false,
    //   }).then(()=>{
    //     res.send("Product Added");
    //   }).catch((err) => {
    //     console.log(err);
    //   });
  } catch (err) {}
});

app.get("/product/:id", async(req, res) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  if(product){
    res.send(product);
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

app.post("/product/:id/reviews", async(req, res) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  if(product){
    const review ={
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.product_reviews = product.reviews.length;
    product.product_rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.send({
      message: 'Review Created',
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
    });
  }else{
    res.send("Product not found");
  }
});


app.listen(5000);