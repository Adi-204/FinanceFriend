import { Router } from "express";
import { authMiddleware } from "../middleware/jwtauth.js";
import { customChat } from "../controllers/chatbot.controller.js";
import { autoAnalysis } from "../controllers/chatbot.controller.js";

const router = Router();

router.use(authMiddleware);

router.route("/custom").post(customChat);
router.route("/analyze").get(autoAnalysis);

export default router
