const express = require("express");
const {
    getAllProduct,
    getProductById 
} = require("../Controllers/productController");


const productRouter = express.Router();





productRouter.get("/", getAllProduct);
productRouter.get("/:userId", getProductById);


module.exports = productRouter;
