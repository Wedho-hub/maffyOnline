/**
 * Main server file for Maffy Online backend API
 * Sets up Express server with MongoDB connection, middleware, and routes
 */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import servicesRoutes from "./routes/services.js";
import testimonialsRoutes from "./routes/testimonials.js";
import siteRoutes from "./routes/site.js";
import uploadsRoutes from "./routes/uploads.js";
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// API routes setup
app.use("/api/auth", authRoutes); // Authentication routes (login, register, env-login)
app.use("/api/posts", postsRoutes); // Blog posts CRUD operations
app.use("/api/services", servicesRoutes); // Services management
app.use("/api/testimonials", testimonialsRoutes); // Testimonials management
app.use('/api/site', siteRoutes); // Site content management (about/home pages)
app.use('/api/uploads', uploadsRoutes); // File upload handling

// Serve uploaded files statically from backend/uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads')));

// Basic health check endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server on specified port or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
