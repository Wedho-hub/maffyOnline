/**
 * Services routes for Maffy Online
 * Defines CRUD endpoints for HR services with validation and admin authorization
 */

import express from 'express';
import { body } from 'express-validator';
import { listServices, createService, updateService, deleteService } from '../controllers/servicesController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// GET /api/services - Retrieve all services (public)
router.get('/', listServices);

// POST /api/services - Create a new service (admin only)
router.post('/', protect, adminOnly, [
	body('title').isString().notEmpty(), // Validate title is non-empty string
	body('description').isString().notEmpty() // Validate description is non-empty string
], createService);

// PUT /api/services/:id - Update an existing service (admin only)
router.put('/:id', protect, adminOnly, updateService);

// DELETE /api/services/:id - Delete a service (admin only)
router.delete('/:id', protect, adminOnly, deleteService);

export default router;
