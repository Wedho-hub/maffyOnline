/**
 * SiteContent model for dynamic page content in Maffy Online application
 * Defines the schema for customizable content sections like About and Home pages
 */

import mongoose from 'mongoose';

/**
 * SiteContent schema definition for dynamic page content
 * @typedef {Object} SiteContent
 * @property {string} key - Unique identifier for the content section (e.g., 'about', 'home') (required)
 * @property {string} title - Main title for the content section
 * @property {string} subtitle - Subtitle or tagline for the section
 * @property {*} body - Flexible content body that can be string, object, or array
 * @property {string} image - URL/path to associated image file
 * @property {Date} createdAt - Timestamp when content was created
 * @property {Date} updatedAt - Timestamp when content was last updated
 */
const SiteContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // Unique key like 'about' or 'home'
  title: { type: String }, // Main heading/title
  subtitle: { type: String }, // Secondary heading/subtitle
  body: { type: mongoose.Schema.Types.Mixed }, // Flexible content (string, object, array)
  image: { type: String }, // Path to uploaded image file
  updatedAt: { type: Date, default: Date.now }, // Manual updatedAt (timestamps adds createdAt)
}, { timestamps: true }); // Adds createdAt automatically

// Create and export the SiteContent model
const SiteContent = mongoose.model('SiteContent', SiteContentSchema);
export default SiteContent;
