import { Router } from "express";
import { getUrl, createUrl } from "../controllers/shortner.controller.js";
import { validate } from "../middleware/validate.js";
import { createUrlSchema, getUrlParamsSchema } from "../schemas/shortner.schema.js";

const router = Router();

router.get("/url/:id", validate({ params: getUrlParamsSchema }), getUrl);
router.post("/url", validate({ body: createUrlSchema }), createUrl);

export default router;
