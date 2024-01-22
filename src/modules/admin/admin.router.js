import { Router } from "express";
import * as AdminController from "./admin.controller.js";

const router = Router();
router.post("/addAdmin", AdminController.addAdmin);
router.get("/addAdmin/community", AdminController.community);
//router.post("/deleteAdmin", AdminController.deleteAdmin);
router.get("/viewAdmin", AdminController.viewAdmins);
router.post("/viewCommunityAdmin", AdminController.viewCommunityAdmin);
router.post("/disableAdmin", AdminController.disableAdmin);
router.post("/enableAdmin", AdminController.enableAdmin);
router.post("/recoverPassword", AdminController.recoverPassword);
router.delete('/deleteAdmin', AdminController.deleteAdmin);

export default router;