/**
 * Sample data seeding script for Maffy Online
 * Populates database with initial services and testimonials
 * Usage: npm run seed:data
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';

// Load environment variables
dotenv.config();

const run = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await Service.deleteMany({});
    await Testimonial.deleteMany({});

    // Sample services data
    const services = [
      {
        title: 'Talent Acquisition',
        description: 'Full-cycle recruitment across tech and business functions',
        features: ['Sourcing', 'Screening', 'Placement']
      },
      {
        title: 'HR Advisory',
        description: 'Policy, contracts and HR process support for SMEs',
        features: ['Policies', 'Org design', 'Compliance']
      },
      {
        title: 'Executive Search',
        description: 'Senior hire search and headhunting',
        features: ['Leadership search', 'Reference checks']
      },
    ];

    // Sample testimonials data
    const testimonials = [
      {
        name: 'Tendai',
        company: 'Acme Ltd',
        role: 'Founder',
        message: 'Maffy Online helped us hire our first product manager. Excellent process and results.'
      },
      {
        name: 'Rudo',
        company: 'ZimTech',
        role: 'HR Lead',
        message: 'Professional and fast. They understood our needs.'
      },
    ];

    // Insert sample data
    await Service.insertMany(services);
    await Testimonial.insertMany(testimonials);

    console.log('Seeded services and testimonials');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

run();
