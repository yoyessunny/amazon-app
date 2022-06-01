const express = require('express');
const axios = require("axios");
const mongoose = require("mongoose");
const Admin = require("./model/admin");
const Product = require("./model/product");
const Order = require("./model/order");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require('bcrypt');
const {createTokens, validateToken} = require("./JWT");
// const multer = require('multer');
const upload = require('express-fileupload');

const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  key: "userId",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60*60*24*30*1000,
  },
})
);
app.use(upload());
// const fileStorage = multer.diskStorage({
//   destination: (req,file,cb) => {
//     cb(null, 'documents');
//   },
//   filename: (req,file,cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });

// app.use(multer({storage: fileStorage}).single('document'));


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const router = require('./routes/order');
app.use(router);

const paymentrouter = require('./routes/payment');
app.use(paymentrouter);

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

  try{
  
    const arrayData = await Order.find();

    const arrData = Array.from(new Set(arrayData.map(JSON.stringify))).map(JSON.parse);

    arrData.map(async(val)=>{

        const check = await Product.findOne({SKU: val.sku, ASIN: val.asin}); 
        if(check===null) {
            await Product.create({
              SKU: val["sku"],
              ASIN: val["asin"],
              Product_Name: val["product_name"],
              MRP: val["item_price"],
              }).then(()=>{
                
              }).catch((err) => {
                console.log(err);
              });  
        }
    })
  } catch (err) {}

  const products = await Product.find();
  if(products){
  res.send(products); }
});

app.post("/productregister", async(req, res) => {
  try{

    const {SKU, EAN_CODE, Brand_Name, Product_Name, HSN_Code, GST,
      Description, Bullet1, Bullet2, Bullet3, Bullet4, Bullet5,
      Item_Weight, Item_Length, Item_Width, Item_Height, Item_Unit_Measure,
      Country, MRP, Manufacturer, Ingredients, Category, Keywords,
      Main_Image, Image1, Image2, Image3, Image4, Image5, Image6, Document_Name} = req.body;

    const {file} = req.files;
    const extension = file.name.split(".");
    const DocumentName = Document_Name.replace(/\s+/g, '_');
    const filename = SKU+'-'+DocumentName+'.'+extension[1];
    file.mv(__dirname + "/documents/" + filename)

    const checkSKU = await Product.findOne({SKU: SKU});
    if(checkSKU){
      res.send("Product Exists");
    }

    const checkName = await Product.findOne({Product_Name: Product_Name});
    if(checkName){
      res.send("Product Exists");
    }

    if(checkSKU || checkName){
      return 
    }
    else {
    await Product.create({
        SKU: SKU,
        EAN_CODE: EAN_CODE,
        Brand_Name: Brand_Name,
        Product_Name: Product_Name,
        HSN_Code: HSN_Code,
        GST: GST,
        Description: Description,
        Bullet1: Bullet1,
        Bullet2: Bullet2,
        Bullet3: Bullet3,
        Bullet4: Bullet4,
        Bullet5: Bullet5,
        Item_Weight: Item_Weight,
        Item_Length: Item_Length,
        Item_Width: Item_Width,
        Item_Height: Item_Height,
        Item_Unit_Measure: Item_Unit_Measure,
        Country: Country,
        MRP: MRP,
        Manufacturer: Manufacturer,
        Ingredients: Ingredients,
        Category: Category,
        Keywords: Keywords,
        Main_Image: Main_Image,
        Image1: Image1,
        Image2: Image2,
        Image3: Image3,
        Image4: Image4,
        Image5: Image5,
        Image6: Image6,
      }).then(()=>{
        res.send("Product Added");
      }).catch((err) => {
        console.log(err);
      });
    }

  } catch (err) {}
});

app.get("/product/:id", async(req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  
  if(product){
    res.send(product);  
  }else{
    res.send("Product not found");
  }

});

app.post("/productedit/:id", async(req, res) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);

  const {SKU, EAN_CODE, Brand_Name, Product_Name, HSN_Code, GST,
    Description, Bullet1, Bullet2, Bullet3, Bullet4, Bullet5,
    Item_Weight, Item_Length, Item_Width, Item_Height, Item_Unit_Measure,
    Country, MRP, Manufacturer, Ingredients, Category, Keywords,
    Main_Image, Image1, Image2, Image3, Image4, Image5, Image6} = req.body;

  if(product){
    product.SKU = SKU;
    product.EAN_CODE = EAN_CODE;
    product.Brand_Name = Brand_Name;
    product.Product_Name = Product_Name;
    product.HSN_Code = HSN_Code;
    product.GST = GST;
    product.Description = Description;
    product.Bullet1 = Bullet1;
    product.Bullet2 = Bullet2;
    product.Bullet3 = Bullet3;
    product.Bullet4 = Bullet4;
    product.Bullet5 = Bullet5;
    product.Item_Weight = Item_Weight;
    product.Item_Length = Item_Length;
    product.Item_Width = Item_Width;
    product.Item_Height = Item_Height;
    product.Item_Unit_Measure = Item_Unit_Measure;
    product.Country = Country;
    product.MRP = MRP;
    product.Manufacturer = Manufacturer;
    product.Ingredients = Ingredients;
    product.Category = Category;
    product.Keywords = Keywords;
    product.Main_Image = Main_Image;
    product.Image1 = Image1;
    product.Image2 = Image2;
    product.Image3 = Image3;
    product.Image4 = Image4;
    product.Image5 = Image5;
    product.Image6 = Image6;
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