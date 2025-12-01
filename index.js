const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const cors = require("cors");

// Environment variables
const { PORT, DB_USERNAME, DB_PASSWORD, JWT_SECRET } = process.env;

// MongoDB connection string
const db_url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.5liukrt.mongodb.net/?appName=Cluster0`;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Import routers
const userRoutes = require("./Routers/userRouter");
const productRoutes = require("./Routers/productRouter");
const cartRoutes = require("./Routers/cartRouter");
const orderRoutes = require("./Routers/orderRouter");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

// Test routes
app.get("/", (req, res) => {
  res.cookie("jwt", "Home", { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
  res.status(200).json({ status: "success", message: "Welcome to the Home Page" });
});

app.get("/products", (req, res) => {
  const msg = req.cookies.jwt ? `You already visited. Cookie = ${req.cookies.jwt}` : "";
  res.status(200).json({ status: "success", message: `Welcome to Products Page. ${msg}` });
});

// JWT helpers
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

app.get("/sign", async (req, res) => {
  try {
    const token = await signAsync({ data: "1234" }, JWT_SECRET || "mysecretkey", {
      expiresIn: "1h",
      algorithm: "HS256",
    });
    res.cookie("jwt", token, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({ status: "success", message: "JWT generated", token });
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
});

app.get("/verify", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(400).json({ status: "failure", message: "Token missing" });
    const decoded = await verifyAsync(token, JWT_SECRET || "mysecretkey");
    res.status(200).json({ status: "success", message: "JWT verified", decoded });
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
});

// Global error handler (added for better 500 error handling)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ status: 'failure', message: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: "failure", message: "Route not found" });
});

// MongoDB connection and server start
mongoose
  .connect(db_url)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log("Database connection failed", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});