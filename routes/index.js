import { Router } from "express";
import ProductsRoutes from './product.routes.js';
import AuthRoutes from './auth.routes.js';
import AdminRouter  from './admin.routes.js';

const router=Router();

router.use("/auth" ,AuthRoutes);

router.use("/admin",AdminRouter);

router.use("/product" ,ProductsRoutes);

export default router;