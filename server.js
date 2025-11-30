const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const promisify = require("util").promisify;
const cors = require('cors');

const { PORT, DB_PASSWORD, DB_USERNAME } = process.env;

const db_url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.5liukrt.mongodb.net/?appName=Cluster0`;


app.use(express.json());
app.use(cookieParser());
app.use(cors());


const userRoutes = require('./Routers/userRouter');
const cartRoutes = require('./Routers/cartRouter');
const orderRoutes = require('./Routers/orderRouter');
const productRoutes = require('./Routers/productRouter');


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);


mongoose.connect(db_url)
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log("Database connection failed", err));



app.get("/", (req, res) => {
  res.cookie("jwt", "Home", {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false, 
  });

  res.status(200).json({
    status: "success",
    message: "Welcome to the Home Page"
  });
});

app.get("/products", (req, res) => {
  let msg = "";
  if (req.cookies.jwt) {
    msg = `You already visited this site. Cookie = ${req.cookies.jwt}`;
  }

  res.status(200).json({
    status: "success",
    message: `Welcome to the Products Page. ${msg}`
  });
});



const promisifyJwtSign = promisify(jwt.sign);
const promisifyJwtVerify = promisify(jwt.verify);

const payload = "1234";
const secretKey = "mysecretkey";

app.get("/sign", async (req, res) => {
  try {
    const token = await promisifyJwtSign(
      { Data: payload },
      secretKey,
      { expiresIn: "1h", algorithm: "HS256" }
    );

    res.cookie("jwt", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      status: "success",
      message: "JWT token generated and cookie set",
      token
    });

  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
});


app.get("/verify", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ status: "failure", message: "Token missing" });
    }

    const decoded = await promisifyJwtVerify(token, secretKey);

    res.status(200).json({
      status: "success",
      message: "JWT token verified",
      decoded
    });

  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
});


app.use((req, res) => {
  res.status(404).json({
    status: "failure",
    message: "Route not found"
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
