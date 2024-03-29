import { Router } from "express";
import { authMiddleware } from "../middleware/jwtauth.js";
import { getNote } from "../controllers/notes.controller.js";

const router = Router();

router.use(authMiddleware);

router.route("/").get(getNote);


export default router
