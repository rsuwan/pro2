import { Router } from 'express';
import { SignUp, SignIn ,confirmEmail} from './auth.js';

const router = Router();
router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/confirmEmail/:token', confirmEmail);

export default router;
