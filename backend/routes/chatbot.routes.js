import { Router } from "express";
import { authMiddleware } from "../middleware/jwtauth.js";
import { sendQuery } from "../controllers/chatbot.controller.js";

const router = Router();

router.use(authMiddleware);

router.route("/").post(sendQuery);

export default router
