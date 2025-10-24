import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import servicesRoutes from "./routes/services.js";
import testimonialsRoutes from "./routes/testimonials.js";

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

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
