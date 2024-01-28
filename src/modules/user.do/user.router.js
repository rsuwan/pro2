import { Router } from "express";
import * as AdminController from "./user.controller.js";

const router = Router();

router.get("/:email/viewMyPosts", AdminController.viewMyPosts);
router.get("/:email/viewMyComments", AdminController.viewMyComments);
router.get("/:email/viewMyPersonalInformation", AdminController.viewMyPersonalInformation);
router.post("/:email/changePassword", AdminController.changePassword);
router.post("/:email/updateMyPersonalInformation", AdminController.updateMyPersonalInformation);
export default router;
