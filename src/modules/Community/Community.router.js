import { Router } from "express";
import * as communitycontroller from './community.controller.js';
import fileUpload, { fileValidation } from "../../services/multer.js";
const router = Router();
//router.post("/createCommunityy", fileUpload(fileValidation.imge).single('image'),communitycontroller.createCommunityy);
router.post("/createCommunity", communitycontroller.createCommunity);

router.get("/viewCommunities", communitycontroller.viewCommunities);
 router.post("/addProperty", communitycontroller.addProperty);
 router.post("/viewProperty", communitycontroller.viewProperty);
 router.post("/removeProperty", communitycontroller.removeProperty);
 router.post("/cancleCreation", communitycontroller.cancleCreation);
export default router;