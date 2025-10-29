/**
 * Authentication middleware for Maffy Online
 * Provides JWT token verification and role-based access control
 */

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware to protect routes requiring authentication
 * Verifies JWT token from Authorization header and attaches user data to request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
    req.userId = decoded.id; // Attach user ID to request
    req.userRole = decoded.role; // Attach user role to request
    req.user = await User.findById(decoded.id).select('-password'); // Attach user object (exclude password)
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

/**
 * Middleware to restrict access to admin-only routes
 * Must be used after protect middleware
 * @param {Object} req - Express request object (must have userRole from protect)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const adminOnly = (req, res, next) => {
  if (!req.userRole || req.userRole !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
};
