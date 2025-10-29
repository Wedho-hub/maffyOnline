/**
 * File upload routes for Maffy Online
 * Handles secure file uploads with admin authorization and returns public URLs
 */

import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(process.cwd(), 'backend', 'uploads')), // Store in backend/uploads
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Prefix filename with timestamp
});

const upload = multer({ storage });

// POST /api/uploads - Upload a single file and return public URL (admin only)
router.post('/', protect, adminOnly, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const publicPath = `/uploads/${req.file.filename}`; // Public path for accessing the file
  res.json({ url: publicPath, filename: req.file.filename });
});

export default router;
