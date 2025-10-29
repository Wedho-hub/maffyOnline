/**
 * Service model for Maffy Online services
 * Defines the schema for HR and talent acquisition services offered by the company
 */

import mongoose from 'mongoose';

/**
 * Service schema definition for company services
 * @typedef {Object} Service
 * @property {string} title - Name of the service (required)
 * @property {string} description - Detailed description of the service (required)
 * @property {string[]} features - Array of key features or benefits of the service
 * @property {Date} createdAt - Timestamp when service was created
 * @property {Date} updatedAt - Timestamp when service was last updated
 */
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Service name/title
  description: { type: String, required: true }, // Detailed service description
  features: [String] // Array of key features or bullet points
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Service model
const Service = mongoose.model('Service', serviceSchema);
export default Service;
