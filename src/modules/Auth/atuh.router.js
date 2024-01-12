import { Router } from 'express';
import { SignUp, SignIn, confirmEmail } from './auth.controller.js';

const router = Router();
router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.post('/confirmEmail/:token', confirmEmail);
export default router;
