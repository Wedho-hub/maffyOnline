/**
 * Testimonials controller for managing client testimonials in Maffy Online
 * Handles CRUD operations for customer reviews and feedback
 */

import Testimonial from '../models/Testimonial.js';
import { validationResult } from 'express-validator';

/**
 * Get all testimonials
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} Array of all testimonials sorted by creation date
 */
export const listTestimonials = async (req, res) => {
  const items = await Testimonial.find().sort({ createdAt: -1 });
  res.json(items);
};

/**
 * Create a new testimonial
 * @param {Object} req - Express request object (authenticated)
 * @param {Object} req.body - Request body containing testimonial data
 * @param {string} req.body.name - Name of the testimonial giver
 * @param {string} req.body.message - Testimonial message/content
 * @param {string} [req.body.role] - Job title of the testimonial giver
 * @param {string} [req.body.company] - Company name of the testimonial giver
 * @param {Object} res - Express response object
 * @returns {Object} Created testimonial object
 */
export const createTestimonial = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const item = await Testimonial.create(req.body);
  res.status(201).json(item);
};

/**
 * Update an existing testimonial
 * @param {Object} req - Express request object (authenticated)
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - Testimonial ID to update
 * @param {Object} req.body - Request body with updated testimonial data
 * @param {Object} res - Express response object
 * @returns {Object} Updated testimonial object
 */
export const updateTestimonial = async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

/**
 * Delete a testimonial
 * @param {Object} req - Express request object (authenticated)
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - Testimonial ID to delete
 * @param {Object} res - Express response object
 * @returns {Object} Success message
 */
export const deleteTestimonial = async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
