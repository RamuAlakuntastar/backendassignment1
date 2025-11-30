const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    size: String,
    price: Number,
    quantity: Number
});

const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" }
});



const OrderModel = mongoose.model("OrderModel", OrderSchema);
module.exports = OrderModel;
