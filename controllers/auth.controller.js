const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isEmailValid = (email) => {
  return typeof email === 'string' && email.includes('@') && email.includes('.');
};
const register = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;
    //validime qe sjon request po kom desht me i bo met estu kushtet qysh po funsipnojn
     if (!name || name.trim().length < 2) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email || !isEmailValid(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

     const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashed
    });
