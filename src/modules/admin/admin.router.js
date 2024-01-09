import { Router } from "express";
import * as AdminController from "./admin.controller.js";

const router = Router();
router.post("/addadmin", AdminController.AddAdmin);
router.post("/deleteuser", AdminController.DeleteUser);

export default router;