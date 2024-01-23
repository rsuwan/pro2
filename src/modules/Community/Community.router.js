import { Router } from "express";
import * as communitycontroller from "./community.controller.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
const router = Router();
router.post(
  "/createCommunity",
  fileUpload(fileValidation.image).single("image"),
  communitycontroller.createCommunity
);
//router.get("/viewCommunities", communitycontroller.viewCommunities);
router.get("/getCommunities", communitycontroller.getCommunities);
router.get("/getactiveCommunities", communitycontroller.getActiveCommunities);
//router.get("/:id", communitycontroller.getSpecificCommunity);
router.post("/addProperty", communitycontroller.addProperty);
router.post("/viewProperty", communitycontroller.viewProperty);
router.post("/removeProperty", communitycontroller.removeProperty);
router.post("/cancleCreation", communitycontroller.cancleCreation);
router.put(
  "/:id",
  fileUpload(fileValidation.image).single("image"),
  communitycontroller.updateCommunity);
  router.put("/prparty/:id", communitycontroller.updateProperty);//مش شغال منيح

export default router;
