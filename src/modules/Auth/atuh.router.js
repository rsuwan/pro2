import { Router } from "express";
import * as AuthController from "./auth.controller.js";

const router = Router();
router.post("/signup", AuthController.SignUp);
router.post("/signin", AuthController.SignIn);

export default router;