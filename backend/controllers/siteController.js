import SiteContent from '../models/SiteContent.js';

export const getContent = async (req, res) => {
  const key = req.params.key;
  const item = await SiteContent.findOne({ key });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const upsertContent = async (req, res) => {
  const key = req.params.key;
  const payload = { ...req.body };
  if (req.file) {
    // multer attached file - expose path as /uploads/filename
    payload.image = `/uploads/${req.file.filename}`;
  }
  const item = await SiteContent.findOneAndUpdate({ key }, { $set: payload }, { upsert: true, new: true, setDefaultsOnInsert: true });
  res.json(item);
};

export const listAll = async (req, res) => {
  const items = await SiteContent.find().sort({ key: 1 });
  res.json(items);
};
