/**
 * Testimonials routes for Maffy Online
 * Defines CRUD endpoints for client testimonials with validation and admin authorization
 */

import express from 'express';
import { body } from 'express-validator';
import { listTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialsController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// GET /api/testimonials - Retrieve all testimonials (public)
router.get('/', listTestimonials);

// POST /api/testimonials - Create a new testimonial (admin only)
router.post('/', protect, adminOnly, [
	body('name').isString().notEmpty(), // Validate name is non-empty string
	body('message').isString().notEmpty() // Validate message is non-empty string
], createTestimonial);

// PUT /api/testimonials/:id - Update an existing testimonial (admin only)
router.put('/:id', protect, adminOnly, updateTestimonial);

// DELETE /api/testimonials/:id - Delete a testimonial (admin only)
router.delete('/:id', protect, adminOnly, deleteTestimonial);

export default router;
