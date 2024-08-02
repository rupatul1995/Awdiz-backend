import Cart from "../models/cart.model.js";
import Product from "../models/products.model.js";

export const AddToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.json({ success: false, error: "User and product required." });
    }

    const isCartExist = await Cart.findOne({ user: userId });

    if (!isCartExist) {
      const newCart = new Cart({
        user: userId,
        cartProducts: [productId],
      });
      await newCart.save(); 
      return res.json({
        success: true,
        message: "Product successfully added to cart.",
      });
    } else {
      const isProductExist = isCartExist.cartProducts.includes(productId);
      if (isProductExist) {
        return res.json({
          success: true,
          message: "Product already exist in cart.",
        });
      }
      
      const responseAfterAdd = await Cart.findOneAndUpdate(
        { user: userId },
        { $addToSet: { cartProducts: productId } }
      );
      console.log(responseAfterAdd, "responseAfterAdd");
      return res.json({
        success: true,
        message: "Product successfully added to cart.",
      });
    }
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export const GetAllCartProducts = async (req, res) => {
  try {
    const userId = req.userId;

    const cartData = await Cart.findOne({ user: userId });
    var cartProducts = [];
    console.log(cartData.cartProducts);
    for (var i = 0; i <= cartData?.cartProducts?.length - 1; i++) {
      const response = await Product.findById(cartData?.cartProducts[i]);
      cartProducts.push(response);
    }

    return res.json({ success: true, cartProducts });
  } catch (error) {
    return res.json({ success: false, error });
  }
};





export const wishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.json({ success: false, error: "User and product required." });
    }

    const isCartExist = await List.findOne({ user: userId });

    if (!isCartExist) {
      const newList = new List({
        user: userId,
        cartProducts: [productId],
      });
      await newList.save(); 
      return res.json({
        success: true,
        message: "Product successfully added to cart.",
      });
    } else {
      const isProductExist = isCartExist.listProducts.includes(productId);
      if (isProductExist) {
        return res.json({
          success: true,
          message: "Product already exist in cart.",
        });
      }
      
      const responseAfterAdd = await List.findOneAndUpdate(
        { user: userId },
        { $addToSet: { listProducts: productId } }
      );
      console.log(responseAfterAdd, "responseAfterAdd");
      return res.json({
        success: true,
        message: "Product successfully added to cart.",
      });
    }
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export const GetAllWishlisProducts = async (req, res) => {
  try {
    const userId = req.userId;

    const listData = await List.findOne({ user: userId });
    var listProducts = [];
    console.log(listData.listProducts);
    for (var i = 0; i <= listData?.listProducts?.length - 1; i++) {
      const response = await Product.findById(listData?.listProducts[i]);
      listProducts.push(response);
    }

    return res.json({ success: true, listProducts });
  } catch (error) {
    return res.json({ success: false, error });
  }
};