import { Router } from "express";
import * as postcontroller from './post.controller.js';
const router = Router();

router.get("/:community/postView", postcontroller.postView);
router.post("/:community/createPost", postcontroller.createPost);
router.get("/:community/viewPosts", postcontroller.viewPosts);
// router.post("/:community/createPost", fileUpload(fileValidation.image).fields([
//     {name:'mainImage',maxCount:1},
//     {name:'supImages',maxCount:30},
//     ]),postcontroller.createPost);
// router.post("/:community/likePost", postcontroller.likePost);

export default router;