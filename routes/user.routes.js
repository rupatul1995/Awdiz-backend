import { Router } from "express";
import {
  GetAllCartProducts,
  AddToCart,
  buyProducts,
} from "../Controllers/user.controllers.js";
import { checkIsUserValid } from "../Middlewares/all.middlewares.js";

const router = Router();
router.post("/buy-products",checkIsUserValid, buyProducts);
router.get("/get-all-cart-product", checkIsUserValid, GetAllCartProducts);
router.post("/add-to-cart", checkIsUserValid, AddToCart);

export default router;