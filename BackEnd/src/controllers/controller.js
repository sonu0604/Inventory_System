const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const userModel = require('../models/model');

const register = async (req, res) => {
  const { username, password, role, email, contact, name } = req.body;
  const picture = req.file ? `/uploads/${req.file.filename}` : null;

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate password
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({
        message:
          "Password must be at least 6 characters, include a digit and a special character"
      });
  }

  // Check if user exists
  userModel.findUserByEmail(email, async (err, result) => {
    if (result && result.length > 0) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password_hash: hashedPassword,
      role,
      email,
      contact,
      name,
      picture
    };

    userModel.createUser(newUser, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Registration failed", error: err });

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: result.insertId,
          username,
          email,
          role,
          contact,
          name,
          picture
        }
      });
    });
  });
};


const login = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, async (err, result) => {
    if (err || result.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
        email: user.email
      }
    });
  });
};

module.exports = {
  register,
  login
};
