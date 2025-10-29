/**
 * Blog posts routes for Maffy Online
 * Defines CRUD endpoints for blog articles with authentication and admin authorization
 */

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

// GET /api/posts - Retrieve all blog posts (public)
router.get('/', listPosts);

// GET /api/posts/:slug - Retrieve a single blog post by slug (public)
router.get('/:slug', getPost);

// POST /api/posts - Create a new blog post (admin only)
router.post('/', protect, adminOnly, createPost);

// PUT /api/posts/:id - Update an existing blog post (admin only)
router.put('/:id', protect, adminOnly, updatePost);

// DELETE /api/posts/:id - Delete a blog post (admin only)
router.delete('/:id', protect, adminOnly, deletePost);

export default router;
