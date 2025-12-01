
const ProductModel = require('../Models/productModel');
const {getFactoryById} = require('../Utilitys/crudFactory');



const getAllProduct = async (req, res) => {
  try {
    let query = ProductModel.find();

  
    if (req.query.search) {
      query = query.find({
        name: { $regex: req.query.search, $options: "i" },
      });
    }

  
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    const products = await query;

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });

  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
};


const getProductById = getFactoryById(ProductModel);



module.exports ={ getAllProduct,
    getProductById }
