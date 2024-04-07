import { Router } from "express";
import { authMiddleware } from "../middleware/jwtauth.js";
import { 
    analyzeFinance, 
    analyzeFuture, 
    analyzeLegal 
} from "../controllers/risk.controller.js";
import { analyzeHealth } from "../controllers/risk.controller.js";

const router = Router();

router.use(authMiddleware);

router.route("/finance").post(analyzeFinance);
router.route("/health").post(analyzeHealth);
router.route("/legal").post(analyzeLegal);
router.route("/future").post(analyzeFuture);

export default router

