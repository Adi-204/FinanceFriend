import { Router } from "express";
import { authMiddleware } from "../middleware/jwtauth.js";
import { 
    getFinanceDetails, 
    getPersonalDetails, 
    updateFinanceDetails, 
    updatePersonalDetails 
} from "../controllers/dashboard.controller.js";

const router = Router();

router.use(authMiddleware);

router.route("/personal").get(getPersonalDetails);
router.route("/personal").post(updatePersonalDetails);
router.route("/finance").get(getFinanceDetails);
router.route("/finance").post(updateFinanceDetails);

export default router;
