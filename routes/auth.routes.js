import { Router } from "express";
import {Register} from  "../Controllers/auth.controllers.js";
import { Login } from "../Controllers/auth.controllers.js";
const router=Router();

router.post('/register', Register);
router.post('/login',Login);
export default router;