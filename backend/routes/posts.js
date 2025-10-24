import express from 'express';
import {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postsController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', listPosts);
router.get('/:slug', getPost);
router.post('/', protect, adminOnly, createPost);
router.put('/:id', protect, adminOnly, updatePost);
router.delete('/:id', protect, adminOnly, deletePost);

export default router;
