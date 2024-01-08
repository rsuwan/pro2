import { Router } from "express";
import * as communitycontroller from './community.controller.js';
const router = Router();

router.get("/", communitycontroller.getcommunity);

export default router;

