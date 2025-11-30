const OrderModel = require("../Models/orderModel");
const CartModel = require("../Models/cartModel");
const ProductModel = require("../Models/productModel");
const  sendOrderEmail = require("../util/sendOrderEmail");
const { getAllFactory, getFactoryById } = require("../Utilitys/crudFactory");

const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;

   
    const cart = await CartModel.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        status: "failure",
        message: "Your cart is empty"
      });
    }

   
    for (let item of cart.items) {
      const dbProduct = await ProductModel.findById(item.productId._id);
      if (dbProduct.stock < item.quantity) {
        return res.status(400).json({
          status: "failure",
          message: `${dbProduct.name} has only ${dbProduct.stock} left`
        });
      }
    }

    
    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    const order = await OrderModel.create({
      userId,
      items: cart.items.map(i => ({
        productId: i.productId._id,
        name: i.productId.name,
        size: i.productId.size,
        price: i.productId.price,
        quantity: i.quantity
      })),
      totalAmount
    });

   
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity }
      });
    }

   
    cart.items = [];
    await cart.save();

    
    await sendOrderEmail(order, req.user?.email || "test@example.com");

    res.status(200).json({
      status: "success",
      message: "Order placed successfully",
      order
    });

  } catch (err) {
    console.log("Order error:", err);
    res.status(500).json({
      status: "failure",
      message: err.message
    });
  }
};
const getAllOrders = getAllFactory(OrderModel);

const getOrderById = getFactoryById(OrderModel);


module.exports = { createOrder, getAllOrders, getOrderById };
