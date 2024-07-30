import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const AddToCart = async (req, res) => {
  try {
    // console.log(req.userId, "req.userId")
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
      await newCart.save(); // create model for cart.
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
      // isCartExist.cartProducts.push(productId);
      const responseAfterAdd = await Cart.findOneAndUpdate(
        { user: userId },
        { $addToSet: { cartProducts: productId } }
      );
      console.log(responseAfterAdd, "responseAfterAdd");
      // await isCartExist.save(); // create model for cart.
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