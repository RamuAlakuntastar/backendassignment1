const CartModel = require("../Models/cartModel");
const { getAllFactory, deleteFactoryById } = require("../Utilitys/crudFactory");


const addToCart = async (req, res) => {
  try {
   
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity required" });
    }

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = await CartModel.create({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();

    return res.status(200).json({
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllCart = getAllFactory(CartModel);
const deleteCartById = deleteFactoryById(CartModel);

module.exports = {
  addToCart,
  getAllCart,
  deleteCartById,
};
