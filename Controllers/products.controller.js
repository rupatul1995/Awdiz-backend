import Admin from "../models/admin.model.js";
import Product from "../models/products.model.js";

export const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    return res.json({ error, success: false });
  }
};

export const GetSingleProducts = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.json({ success: false, error: "Product ID is required." });
    }
    const product = await Product.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    return res.json({ error, success: false });
  }
};
export const CreateNewProduct = async (req, res) => {
  try {
    const { name, price, category, quantity, image } = req.body.productData;
    const { userId } = req.body;
    if (!name || !price || !category || !quantity || !image || !userId) {
      return res.json({ success: false, error: "All fields are required." });
    }
    const isProductExist = await Product.findOne({
      name,
      category,
      creatorId: userId,
    });
    if (isProductExist) {
      return res.json({ success: false, error: "Product is already exists." });
    }

    const newProduct = new Product({
      name: name,
      price: price,
      category,
      quantity,
      image,
      creatorId: userId,
    });
    await newProduct.save();

    return res.json({
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};




export const filter = async (req, res) => {
  try {
    const { price } = req.body; 
    if (!price) {
      return res.json({ success: false, error: "Price is required." });
    }
    // const filteredProducts = await Product.find({ price: { $eq: 899 } });
 
    // const filteredProducts = await Product.find({ price: { $ne: 999 } });
 
    // const filteredProducts = await Product.find({ price: { $gt: 999 } });

    // const filteredProducts = await Product.find({ price: { $gte: 999 } });

    // const filteredProducts = await Product.find({ price: { $lt: 999 } });

    // const filteredProducts = await Product.find({ price: { $le: 999 } });

    // const filteredProducts = await Product.find({
    //     $or: [{ price: { $gt: 1000 } }, { quantity: { $lte: 20 } }],
    //   });

    // const filteredProducts = await Product.find({
    //     $and: [{ price: { $gt: 1000 } }, { quantity: { $lte: 20 } }],
    //   });

    // const filteredProducts = await Product.find({
    //     price: { $not: { $gt: 1000 } },
    //   });

      const filteredProducts = await Product.find({
        $nor : [{ price: { $gt: 1000 } }, { quantity: { $lte: 20 } }],
      });


    return res.json({ success: true, products: filteredProducts });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};