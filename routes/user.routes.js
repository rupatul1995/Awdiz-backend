import { Router } from "express";
import {
  GetAllCartProducts,
  AddToCart,
} from "../controllers/user.controllers.js";
import { checkIsUserValid } from "../Middlewares/all.middlewares.js";

const router = Router();

router.get("/get-all-cart-product", checkIsUserValid, GetAllCartProducts);
router.post("/add-to-cart", checkIsUserValid, AddToCart);

export default router;