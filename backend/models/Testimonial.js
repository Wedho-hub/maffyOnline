/**
 * Testimonial model for client testimonials in Maffy Online application
 * Defines the schema for customer reviews and feedback
 */

import mongoose from 'mongoose';

/**
 * Testimonial schema definition for client feedback
 * @typedef {Object} Testimonial
 * @property {string} name - Name of the person giving the testimonial (required)
 * @property {string} role - Job title or position of the testimonial giver
 * @property {string} message - The testimonial message/content (required)
 * @property {string} company - Company name of the testimonial giver
 * @property {Date} createdAt - Timestamp when testimonial was created
 * @property {Date} updatedAt - Timestamp when testimonial was last updated
 */
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the testimonial giver
  role: String, // Job title (optional)
  message: { type: String, required: true }, // Testimonial content/message
  company: String // Company name (optional)
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Testimonial model
const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
