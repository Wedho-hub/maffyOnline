/**
 * Services controller for managing HR services in Maffy Online
 * Handles CRUD operations for company services offered to clients
 */

import Service from '../models/Service.js';
import { validationResult } from 'express-validator';

/**
 * Get all services
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} Array of all services sorted by creation date
 */
export const listServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
};

/**
 * Create a new service
 * @param {Object} req - Express request object (authenticated)
 * @param {Object} req.body - Request body containing service data
 * @param {string} req.body.title - Service title
 * @param {string} req.body.description - Service description
 * @param {string[]} [req.body.features] - Array of service features
 * @param {Object} res - Express response object
 * @returns {Object} Created service object
 */
export const createService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const service = await Service.create(req.body);
  res.status(201).json(service);
};

/**
 * Update an existing service
 * @param {Object} req - Express request object (authenticated)
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - Service ID to update
 * @param {Object} req.body - Request body with updated service data
 * @param {Object} res - Express response object
 * @returns {Object} Updated service object
 */
export const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!service) return res.status(404).json({ message: 'Not found' });
  res.json(service);
};

/**
 * Delete a service
 * @param {Object} req - Express request object (authenticated)
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - Service ID to delete
 * @param {Object} res - Express response object
 * @returns {Object} Success message
 */
export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
