import { Router } from "express";
import { authMiddleware } from "../middleware/jwtauth.js";
import { billAnalysis } from "../controllers/bill.controller.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.use(authMiddleware);

router.route('/analysis').post(upload.single('image'),billAnalysis);

export default router;
