const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true   
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],

    totalPrice: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);


cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  next();
});

const CartModel = mongoose.model("CartModel", cartSchema);

module.exports = CartModel;
