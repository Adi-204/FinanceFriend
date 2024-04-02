import { Router } from "express";
import { authMiddleware } from "../middleware/jwtauth.js";
import { getAdvice } from "../controllers/advisor.controller.js";

const router = Router();

router.use(authMiddleware);

router.route("/").post(getAdvice);

export default router
