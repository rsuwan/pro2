import { Router } from "express";
import * as AdminController from "./user.controller.js";

const router = Router();
router.post("/addUser", AdminController.addUser);
router.delete('/deleteUser', AdminController.deleteuser);
router.get("/viewUser", AdminController.viewUser);
router.post("/disableUser", AdminController.disableUser);
router.post("/enableUser", AdminController.enableUser);
router.post("/recoverPassword", AdminController.recoverPassword);

export default router;