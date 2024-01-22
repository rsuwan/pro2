import { Router } from "express";
import * as AdminController from "./user.controller.js";

const router = Router();
router.post("/addUser", AdminController.addUser);
router.delete('/deleteUser/:email', AdminController.deleteuser);
router.get("/viewUser", AdminController.viewUsers);
router.post("/disableUser", AdminController.disableUser);
router.post("/enableUser", AdminController.enableUser);
router.post("/recoverPassword", AdminController.recoverPassword);

export default router;