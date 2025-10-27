import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(process.cwd(), 'backend', 'uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// single file upload - returns public path
router.post('/', protect, adminOnly, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const publicPath = `/uploads/${req.file.filename}`;
  res.json({ url: publicPath, filename: req.file.filename });
});

export default router;
