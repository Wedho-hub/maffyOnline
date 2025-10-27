import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const envLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const envUser = process.env.ADMIN_USER;
    const envPass = process.env.ADMIN_PASS; // plaintext (legacy)
    const envPassHash = process.env.ADMIN_PASS_HASH; // preferred: bcrypt hash
    if (!envUser || (!envPass && !envPassHash)) return res.status(500).json({ message: 'Env admin not configured' });

    if (username !== envUser) return res.status(401).json({ message: 'Invalid credentials' });

    // If a hash is provided, compare with bcrypt. Otherwise fall back to plaintext compare.
    if (envPassHash) {
      const ok = await bcrypt.compare(password, envPassHash);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    } else {
      if (password !== envPass) return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: 'env-admin', role: 'admin', name: envUser }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: 'env-admin', name: envUser, email: '' } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
