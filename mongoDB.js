const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ["fruit", "vegetable", "dairy"],
    lowerCase: true,
  },
  farm: {
    type: Schema.Types.ObjectId,
    ref: "Farm",
  },
});

const Product = mongoose.model("Product", productSchema);
////////////

const seedProducts = [
  {
    name: "Ruby Grabefruit",
    price: 1.99,
    category: "fruit",
  },
  {
    name: "Fairy Eggplant",
    price: 1.0,
    category: "vegetable",
  },
  {
    name: "Organic Melon",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "Organic Mini Seedless Melon",
    price: 3.99,
    category: "fruit",
  },
  {
    name: "Organic Celery",
    price: 1.5,
    category: "vegetable",
  },
  {
    name: "Chocolate Whole Milk",
    price: 2.99,
    category: "dairy",
  },
];

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

///////////
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const Farm = require("./models/farm");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStandTake2")
  .then(() => {
    console.log("MONGO CONNCTED");
  })
  .catch(() => {
    console.log("MONGO ERROR");
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Farm routs
app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index", { farms });
});

app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

app.post("/farms", async (req, res) => {
  const newFarm = new Farm(req.body);
  await newFarm.save();
  res.redirect("farms");
});

app.get("/farms/:id", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id).populate("products");
  res.render("farms/show", { farm });
});

app.get("/farms/:id/products/new", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  res.render("products/new", { categories, farm });
});

app.post("/farms/:id/products", async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  const product = new Product({ name, price, category });
  const farm = await Farm.findById(id);
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save();
  res.redirect(`/farms/${id}`);
});

app.delete("/farms/:id", async (req, res) => {
  const { id } = req.params;
  const deletedFarm = await Farm.findByIdAndDelete(id);
  res.redirect("/farms");
});

//Product routs
const categories = ["fruit", "vegetable", "dairy"];

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`products/${newProduct.id}`);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("farm");
  res.render("products/show", { product });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product.id}`);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000");
});
