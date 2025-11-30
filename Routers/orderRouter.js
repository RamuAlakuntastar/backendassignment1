const express = require('express');
const orderRouter = express.Router();
const { createOrder, getAllOrders, getOrderById } = require('../Controllers/orderController');

orderRouter.post('/', createOrder);
orderRouter.get('/', getAllOrders);
orderRouter.get('/:id', getOrderById);

module.exports = orderRouter;
