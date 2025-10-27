import express from 'express';
import multer from 'multer';
import path from 'path';
import { getContent, upsertContent, listAll } from '../controllers/siteController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// multer setup - store in backend/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(process.cwd(), 'backend', 'uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + Date.now() + ext;
    cb(null, name);
  }
});
const upload = multer({ storage });

router.get('/', listAll);
router.get('/:key', getContent);
// upsert content for a page; allow optional image upload
router.post('/:key', protect, adminOnly, upload.single('image'), upsertContent);

export default router;
