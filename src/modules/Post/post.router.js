import { Router } from "express";
import * as postcontroller from './post.controller.js';
const router = Router();

router.get("/", postcontroller.getpost);

export default router;