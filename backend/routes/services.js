import express from 'express';
import { body } from 'express-validator';
import { listServices, createService, updateService, deleteService } from '../controllers/servicesController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();
router.get('/', listServices);
router.post('/', protect, adminOnly, [ body('title').isString().notEmpty(), body('description').isString().notEmpty() ], createService);
router.put('/:id', protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

export default router;
