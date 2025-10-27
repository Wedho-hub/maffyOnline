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

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/testimonials", testimonialsRoutes);
// site content (about/home) and uploads
app.use('/api/site', siteRoutes);
app.use('/api/uploads', uploadsRoutes);

// serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads')));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
