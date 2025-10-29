/**
 * Posts controller for blog management in Maffy Online
 * Handles CRUD operations for blog posts with author association
 */

import Post from '../models/Post.js';
import { validationResult } from 'express-validator';

/**
 * Get all blog posts with author information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} Array of posts with populated author data
 */
export const listPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
  res.json(posts);
};

/**
 * Get a single blog post by slug
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.slug - URL slug of the post
 * @param {Object} res - Express response object
 * @returns {Object} Post object with populated author data
 */
export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'name');
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
};

/**
 * Create a new blog post
 * @param {Object} req - Express request object (authenticated)
 * @param {Object} req.body - Request body containing post data
 * @param {string} req.body.title - Post title
 * @param {string} req.body.slug - URL slug
 * @param {string} req.body.content - Post content
 * @param {string} req.userId - ID of authenticated user (set by auth middleware)
 * @param {Object} res - Express response object
 * @returns {Object} Created post object
 */
export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { title, slug, content } = req.body;
  const post = await Post.create({ title, slug, content, author: req.userId });
  res.status(201).json(post);
};

/**
 * Update an existing blog post
 * @param {Object} req - Express request object (authenticated)
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - Post ID to update
 * @param {Object} req.body - Request body with updated post data
 * @param {Object} res - Express response object
 * @returns {Object} Updated post object
 */
export const updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
};

/**
 * Delete a blog post
 * @param {Object} req - Express request object (authenticated)
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - Post ID to delete
 * @param {Object} res - Express response object
 * @returns {Object} Success message
 */
export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
