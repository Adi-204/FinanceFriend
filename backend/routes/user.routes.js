import { Router } from "express";
import { registerUser,loginUser,logoutUser, refreshToken,getUserDetails } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/jwtauth.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/refresh").get(refreshToken);
router.route("/getDetails").post(authMiddleware,getUserDetails);

export default router

