const express = require("express");
const { createOrder, getAllOrders, getOrderById } = require("../Controllers/orderController");
const authMiddleware = require("../Middleware/authMiddleware");

const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/", authMiddleware, getAllOrders);
orderRouter.get("/:id", authMiddleware, getOrderById);

module.exports = orderRouter;
