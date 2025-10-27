import express from 'express';
import { body } from 'express-validator';
import { register, login, envLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', [
	body('name').isString().notEmpty(),
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
], register);

router.post('/login', [
	body('email').isEmail(),
	body('password').exists()
], login);

// login using credentials defined in the server .env (ADMIN_USER, ADMIN_PASS)
router.post('/env-login', [ body('username').isString().notEmpty(), body('password').isString().notEmpty() ], envLogin);

export default router;
