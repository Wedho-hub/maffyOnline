/**
 * Post model for blog articles in Maffy Online application
 * Defines the schema for blog posts with content, author, and publication status
 */

import mongoose from 'mongoose';

/**
 * Post schema definition for blog articles
 * @typedef {Object} Post
 * @property {string} title - Title of the blog post (required)
 * @property {string} slug - URL-friendly identifier, must be unique (required)
 * @property {string} content - Full content of the post in HTML/markdown (required)
 * @property {mongoose.ObjectId} author - Reference to User who created the post
 * @property {boolean} published - Whether the post is published (default: false)
 * @property {Date} createdAt - Timestamp when post was created
 * @property {Date} updatedAt - Timestamp when post was last updated
 */
const postSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Blog post title
  slug: { type: String, required: true, unique: true }, // SEO-friendly URL slug
  content: { type: String, required: true }, // Full post content (HTML allowed)
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
  published: { type: Boolean, default: false } // Publication status
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Post model
const Post = mongoose.model('Post', postSchema);
export default Post;
