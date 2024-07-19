import { Router } from "express";
import { AdminLogin, AdminRegister } from "../Controllers/admin.controllers.js";


const router=Router();

router.post('/admin-login',AdminLogin);
router.post("/admin-register", AdminRegister);
export default router;