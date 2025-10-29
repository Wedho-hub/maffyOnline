/**
 * Admin user seeding script for Maffy Online
 * Creates an initial admin user if one doesn't exist
 * Usage: npm run seed
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

const run = async () => {
  try {
    // Connect to database
    await connectDB();

    // Get admin credentials from environment or use defaults
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@maffy.co.zw';
    const password = process.env.SEED_ADMIN_PW || 'ChangeMe123!';

    // Check if admin already exists
    const exists = await User.findOne({ email });
    if (exists) {
      console.log('Admin already exists');
      process.exit(0);
    }

    // Hash password and create admin user
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: 'Admin',
      email,
      password: hashed,
      role: 'admin'
    });

    console.log('Created admin:', user.email);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
};

run();
