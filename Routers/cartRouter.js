const express = require("express");
const { addToCart, getAllCart, deleteCartById } = require("../Controllers/cartController");
const authMiddleware = require("../Middleware/authMiddleware");

const cartRouter = express.Router();

cartRouter.post("/", authMiddleware, addToCart);
cartRouter.get("/", authMiddleware, getAllCart);
cartRouter.delete("/:id", authMiddleware, deleteCartById);

module.exports = cartRouter;
