import { Router } from "express";
import { AllProducts, CreateNewProduct,  } from "../Controllers/products.controller.js";

const router=Router();

router.get("/all-products" ,AllProducts);

router.post("/create-new-product" ,CreateNewProduct);

export default router;