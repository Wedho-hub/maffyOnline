import mongoose from 'mongoose';

const SiteContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g. 'about', 'home'
  title: { type: String },
  subtitle: { type: String },
  body: { type: mongoose.Schema.Types.Mixed }, // arbitrary JSON structure
  image: { type: String }, // public URL / path to uploaded image
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const SiteContent = mongoose.model('SiteContent', SiteContentSchema);
export default SiteContent;
