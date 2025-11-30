const express = require("express");
const {
  addToCart,
  getAllCart,
  deleteCartById
} = require("../Controllers/cartController");

const cartRouter = express.Router();
const CartModel = require("../Models/cartModel");

const checkInput = (req, res, next) => {
  if (req.method === "POST") {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "failure",
        message: "Request body cannot be empty",
      });
    }
  }
  next();
};

const updateCartItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity, price } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        status: "failure",
        message: "productId and quantity are required"
      });
    }

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        status: "failure",
        message: "Cart not found"
      });
    }

    const index = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (index === -1) {
      return res.status(404).json({
        status: "failure",
        message: "Item not found in cart"
      });
    }


    cart.items[index].quantity = quantity;


    if (price) cart.items[index].price = price;

    await cart.save();

    res.status(200).json({
      status: "success",
      message: "Cart item updated",
      cart
    });

  } catch (e) {
    res.status(500).json({
      status: "failure",
      message: e.message
    });
  }
};


cartRouter.get("/", getAllCart);
cartRouter.post("/", checkInput, addToCart);
cartRouter.put("/:userId", updateCartItem);
cartRouter.delete("/:userId", deleteCartById);

module.exports = cartRouter;
