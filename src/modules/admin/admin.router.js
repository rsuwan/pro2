import { Router } from "express";
import * as AdminController from "./admin.controller.js";

const router = Router();
router.post("/addAdmin", AdminController.addAdmin);
router.get("/addAdmin/community", AdminController.community);
router.delete("/deleteAdmin/:email", AdminController.deleteAdmin);
router.get("/viewAdmin", AdminController.viewAdmins);
router.post("/viewCommunityAdmin", AdminController.viewCommunityAdmin);
router.post("/disableAccount/:email", AdminController.disableAccount);
router.post("/enableAccount/:email", AdminController.enableAccount);
router.post("/recoverPassword/:email", AdminController.recoverPassword);

export default router;
