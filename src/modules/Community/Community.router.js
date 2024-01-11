import { Router } from "express";
import * as communitycontroller from './community.controller.js';
const router = Router();
router.post("/viewCommunities", communitycontroller.viewCommunities);
router.post("/createCommunity", communitycontroller.createCommunity);
router.post("/addProperty", communitycontroller.addProperty);
router.post("/viewProperty", communitycontroller.viewProperty);
router.post("/removeProperty", communitycontroller.removeProperty);
<<<<<<< HEAD
=======

>>>>>>> 55735e5d8e2a81963ce6e1047e9ed7891dc7d16d
export default router;

