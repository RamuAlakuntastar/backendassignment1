
const CartModel = require('../Models/cartModel');
const { getAllFactory, createFactory, deleteFactoryById } = require('../Utilitys/crudFactory');




const addToCart = createFactory(CartModel);
const getAllCart = getAllFactory(CartModel);
const deleteCartById = deleteFactoryById(CartModel);
 

module.exports = {
    addToCart,
    getAllCart,
    deleteCartById
};