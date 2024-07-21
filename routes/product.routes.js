import { Router } from "express";
import {
  CreateNewProduct,
  GetAllProducts,
} from "../Controllers/products.controller.js";

const router = Router();

router.get("/get-all-product", GetAllProducts);
router.post("/create-new-product", CreateNewProduct);

export default router;