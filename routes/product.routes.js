import { Router } from "express";
import {
  CreateNewProduct,
  filter,
  GetAllProducts,
  GetSingleProducts,
} from "../Controllers/products.controller.js";
import { checkIsAdminValid } from "../Middlewares/all.middlewares.js";

const router = Router();

router.get("/get-all-product", GetAllProducts);
router.post("/get-single-product", GetSingleProducts);
router.post("/create-new-product", checkIsAdminValid, CreateNewProduct);
router.post('/filter',filter)

export default router;