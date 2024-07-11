const { supabase } = require('../config/supabaseClient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * @route POST /login
 * @desc Login user and return JWT token
 * @access Public
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route POST /setup-password
 * @desc Setup password for user
 * @access Public
 */
const setupPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const { error } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('email', email);

    if (error) {
      throw new Error(error.message);
    }

    res.json({ success: true, message: 'Password setup successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route POST /logout
 * @desc Logout user
 * @access Public
 */
const logout = (req, res) => {
  // Invalidate token or remove it from the client side
  res.json({ success: true, message: 'Logout successful' });
};

module.exports = {
  login,
  setupPassword,
  logout
};