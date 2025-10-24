import express from 'express';
import { body } from 'express-validator';
import { listTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialsController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();
router.get('/', listTestimonials);
router.post('/', protect, adminOnly, [ body('name').isString().notEmpty(), body('message').isString().notEmpty() ], createTestimonial);
router.put('/:id', protect, adminOnly, updateTestimonial);
router.delete('/:id', protect, adminOnly, deleteTestimonial);

export default router;
