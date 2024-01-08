import { Router } from "express";
import  * as    AuthController from "./auth.controller";
const router = Router();
router.post('/SignUp',AuthController,SignUp)
export default router;