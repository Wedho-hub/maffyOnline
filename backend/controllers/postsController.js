import Post from '../models/Post.js';
import { validationResult } from 'express-validator';

export const listPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
  res.json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'name');
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
};

export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { title, slug, content } = req.body;
  const post = await Post.create({ title, slug, content, author: req.userId });
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
};

export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
