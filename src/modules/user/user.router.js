import { Router } from "express";
import * as AdminController from "./user.controller.js";

const router = Router();
router.post("/addUser", AdminController.addUser);
router.delete('/deleteUser/:email', AdminController.deleteuser);
router.get("/viewUser", AdminController.viewUsers);
router.post("/recoverPassword", AdminController.recoverPassword);
router.post('/disableUser/:email', AdminController.disableUser);
router.post('/enableUser/:email', AdminController.enableUser);
export default router;