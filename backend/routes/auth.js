/**
 * Authentication routes for Maffy Online
 * Defines endpoints for user registration, login, and environment-based admin login
 */

import express from 'express';
import { body } from 'express-validator';
import { register, login, envLogin } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register - Register a new user account
router.post('/register', [
	body('name').isString().notEmpty(), // Validate name is a non-empty string
	body('email').isEmail(), // Validate email format
	body('password').isLength({ min: 6 }), // Validate password minimum length
], register);

// POST /api/auth/login - Authenticate user with email and password
router.post('/login', [
	body('email').isEmail(), // Validate email format
	body('password').exists() // Validate password exists
], login);

// POST /api/auth/env-login - Authenticate admin using environment variables (ADMIN_USER, ADMIN_PASS)
router.post('/env-login', [
	body('username').isString().notEmpty(), // Validate username is non-empty string
	body('password').isString().notEmpty() // Validate password is non-empty string
], envLogin);

export default router;
