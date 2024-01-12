import { Router } from "express";
import * as communitycontroller from './community.controller.js';
const router = Router();
router.get("/viewCommunities", communitycontroller.viewCommunities);
router.post("/createCommunity", communitycontroller.createCommunity);
router.post("/addProperty", communitycontroller.addProperty);
router.post("/viewProperty", communitycontroller.viewProperty);
router.post("/removeProperty", communitycontroller.removeProperty);
router.post("/cancleCreation", communitycontroller.cancleCreation);

export default router;