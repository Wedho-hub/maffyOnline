/**
 * Site content controller for managing dynamic page content in Maffy Online
 * Handles retrieval and updates for About and Home page content with file uploads
 */

import SiteContent from '../models/SiteContent.js';

/**
 * Get site content by key
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.key - Content key ('about' or 'home')
 * @param {Object} res - Express response object
 * @returns {Object} Site content object with title, subtitle, body, and image
 */
export const getContent = async (req, res) => {
  const key = req.params.key;
  const item = await SiteContent.findOne({ key });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

/**
 * Update or create site content by key (with file upload support)
 * @param {Object} req - Express request object (authenticated)
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.key - Content key ('about' or 'home')
 * @param {Object} req.body - Request body with content data
 * @param {Object} [req.file] - Uploaded file from multer (optional)
 * @param {Object} res - Express response object
 * @returns {Object} Updated or created site content object
 */
export const upsertContent = async (req, res) => {
  const key = req.params.key;
  const payload = { ...req.body };
  if (req.file) {
    // multer attached file - expose path as /uploads/filename
    payload.image = `/uploads/${req.file.filename}`;
  }
  const item = await SiteContent.findOneAndUpdate({ key }, { $set: payload }, { upsert: true, new: true, setDefaultsOnInsert: true });
  res.json(item);
};

/**
 * List all site content entries
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} Array of all site content sorted by key
 */
export const listAll = async (req, res) => {
  const items = await SiteContent.find().sort({ key: 1 });
  res.json(items);
};
