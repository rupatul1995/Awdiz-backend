import { Router } from "express";
import { AllProducts, NewProduct } from "../Controllers/products.controller.js";

const router=Router();

router.post("/all-products" ,AllProducts);

router.post("/new-allproduct" ,NewProduct);

export default router;