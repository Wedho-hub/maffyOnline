import Testimonial from '../models/Testimonial.js';
import { validationResult } from 'express-validator';

export const listTestimonials = async (req, res) => {
  const items = await Testimonial.find().sort({ createdAt: -1 });
  res.json(items);
};

export const createTestimonial = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const item = await Testimonial.create(req.body);
  res.status(201).json(item);
};

export const updateTestimonial = async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const deleteTestimonial = async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
