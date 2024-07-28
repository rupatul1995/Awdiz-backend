import { Router } from "express";
import { LoginAdmin, RegisterAdmin, YourAddedProducts } from "../Controllers/admin.controllers.js";
import { checkIsAdminValid } from "../Middlewares/all.middlewares.js";

const router = Router();

router.post("/login-admin", LoginAdmin);
router.post("/register-admin", RegisterAdmin);
router.post("/your-added-products",checkIsAdminValid,  YourAddedProducts);

export default router;