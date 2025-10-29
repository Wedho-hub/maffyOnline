/**
 * Site content routes for Maffy Online
 * Defines endpoints for managing dynamic page content with file upload support
 */

import express from 'express';
import multer from 'multer';
import path from 'path';
import { getContent, upsertContent, listAll } from '../controllers/siteController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Multer configuration for file uploads - store in backend/uploads directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(process.cwd(), 'backend', 'uploads')), // Store files in backend/uploads
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get file extension
    const name = file.fieldname + '-' + Date.now() + ext; // Generate unique filename with timestamp
    cb(null, name);
  }
});
const upload = multer({ storage });

// GET /api/site - List all site content entries (public)
router.get('/', listAll);

// GET /api/site/:key - Retrieve site content by key (public)
router.get('/:key', getContent);

// POST /api/site/:key - Update or create site content by key with optional image upload (admin only)
router.post('/:key', protect, adminOnly, upload.single('image'), upsertContent);

export default router;
