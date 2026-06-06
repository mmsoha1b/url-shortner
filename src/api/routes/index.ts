import { Router } from "express";
import healthRoutes from "./health.routes.js";
import shortnerRoutes from "./shortner.routes.js";

const router = Router();

router.use(healthRoutes);
router.use(shortnerRoutes);

export default router;
