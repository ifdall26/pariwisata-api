const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// Endpoint register
router.post('/register', async (req, res) => {
  const { nama, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      nama,
      email,
      password: hashedPassword
    });

    console.log('User registered successfully:', newUser.email);
    return res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Failed to register user' });
  }
});

// Endpoint login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received:', email, password); // Debugging line

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found:', email); // Debugging line
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Password does not match for user:', email); // Debugging line
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('User authenticated successfully:', email); // Debugging line
    return res.status(200).json({
      message: 'Login successful!',
      user: {
        email: user.email,
        name: user.nama, // Tambahkan nama pengguna di sini
      }
    });
  } catch (error) {
    console.error('Error during login:', error); // Debugging line
    return res.status(500).json({ error: 'Failed to login user' });
  }
});

module.exports = router;
