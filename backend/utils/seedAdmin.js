import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const run = async () => {
  try{
    await connectDB();
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@maffy.co.zw';
    const exists = await User.findOne({ email });
    if (exists) { console.log('Admin already exists'); process.exit(0); }
    const password = process.env.SEED_ADMIN_PW || 'ChangeMe123!';
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name: 'Admin', email, password: hashed, role: 'admin' });
    console.log('Created admin', user.email);
    process.exit(0);
  }catch(err){ console.error(err); process.exit(1); }
};

run();
