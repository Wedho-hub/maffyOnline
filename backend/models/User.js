/**
 * User model for Maffy Online application
 * Defines the schema for user accounts with authentication and role management
 */

import mongoose from 'mongoose';

/**
 * User schema definition
 * @typedef {Object} User
 * @property {string} name - Full name of the user (required)
 * @property {string} email - Email address, must be unique (required)
 * @property {string} password - Hashed password (required)
 * @property {string} role - User role: 'admin', 'editor', or 'user' (default: 'user')
 * @property {Date} createdAt - Timestamp when user was created
 * @property {Date} updatedAt - Timestamp when user was last updated
 */
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Full name of the user
  email: { type: String, required: true, unique: true }, // Unique email for authentication
  password: { type: String, required: true }, // Bcrypt hashed password
  role: { type: String, enum: ['admin', 'editor', 'user'], default: 'user' } // Access control role
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;
