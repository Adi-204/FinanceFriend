import { Router } from "express";
import { authMiddleware } from "../middleware/jwtauth.js";
import { getAdvice, getPdf } from "../controllers/advisor.controller.js";

const router = Router();

router.use(authMiddleware);

router.route("/").post(getAdvice);
router.route("/pdf").post(getPdf);

export default router
