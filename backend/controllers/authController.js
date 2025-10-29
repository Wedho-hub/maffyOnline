/**
 * Authentication controller for Maffy Online
 * Handles user registration, login, and environment-based admin authentication
 */

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Register a new user account
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing user data
 * @param {string} req.body.name - User's full name
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's password (will be hashed)
 * @param {string} [req.body.role] - User's role (admin/editor/user)
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user ID and email on success
 */
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    // Hash password and create user
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Authenticate user login with email and password
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing login credentials
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's password
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with JWT token and user data on success
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Verify password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Authenticate admin login using environment variables (fallback method)
 * Supports both plaintext and hashed passwords for backward compatibility
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing login credentials
 * @param {string} req.body.username - Admin username from env
 * @param {string} req.body.password - Admin password from env
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with JWT token and user data on success
 */
export const envLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Get admin credentials from environment variables
    const envUser = process.env.ADMIN_USER;
    const envPass = process.env.ADMIN_PASS; // plaintext (legacy)
    const envPassHash = process.env.ADMIN_PASS_HASH; // preferred: bcrypt hash

    // Check if environment admin is configured
    if (!envUser || (!envPass && !envPassHash)) return res.status(500).json({ message: 'Env admin not configured' });

    // Verify username
    if (username !== envUser) return res.status(401).json({ message: 'Invalid credentials' });

    // Verify password (prefer hash over plaintext)
    if (envPassHash) {
      const ok = await bcrypt.compare(password, envPassHash);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    } else {
      if (password !== envPass) return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token for environment admin
    const token = jwt.sign({ id: 'env-admin', role: 'admin', name: envUser }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: 'env-admin', name: envUser, email: '' } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
