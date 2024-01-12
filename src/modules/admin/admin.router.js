import { Router } from "express";
import * as AdminController from "./admin.controller.js";

const router = Router();
router.post("/addAdmin", AdminController.addAdmin);
router.get("/addAdmin/community", AdminController.community);
router.post("/deleteAdmin", AdminController.deleteAdmin);
router.get("/viewAdmin", AdminController.viewAdmin);
router.post("/enableAccount", AdminController.enableAccount);
router.post("/disableAccount", AdminController.disableAccount);
router.post("/recoverPassword", AdminController.recoverPassword);

export default router;