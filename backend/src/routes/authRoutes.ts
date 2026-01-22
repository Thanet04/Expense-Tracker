import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validateSignUp, validateSignIn } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/signup', validateSignUp, authController.signUp);
router.post('/signin', validateSignIn, authController.signIn);


export default router;
