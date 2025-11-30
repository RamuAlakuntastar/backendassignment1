
const ProductModel = require('../Models/productModel');
const {getFactoryById} = require('../Utilitys/crudFactory');



const getAllProduct = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'limit', 'sort', 'search'];
    excludeFields.forEach((el) => delete queryObj[el]);

    let query = ProductModel.find();

  
    if (req.query.search) {
      query = query.find({
        name: { $regex: req.query.search, $options: 'i' }
      });
    }

 
    if (queryObj.category) {
      query = query.find({ category: queryObj.category });
    }


    if (queryObj.size) {
      query = query.find({ size: { $in: queryObj.size.split(',') } });
    }

  
    if (queryObj.minPrice || queryObj.maxPrice) {
      query = query.find({
        price: {
          ...(queryObj.minPrice ? { $gte: Number(queryObj.minPrice) } : {}),
          ...(queryObj.maxPrice ? { $lte: Number(queryObj.maxPrice) } : {}),
        }
      });
    }


    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);


    const docs = await query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      page,
      limit,
      data: docs
    });

  } catch (e) {
    res.status(500).json({ status: "failure", message: e.message });
  }
};


const getProductById = getFactoryById(ProductModel);



module.exports ={ getAllProduct,
    getProductById }
