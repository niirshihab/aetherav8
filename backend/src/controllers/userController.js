const { supabase } = require('../config/supabaseClient');
const { sendWelcomeEmail } = require('../services/emailServices');

/**
 * @route POST /api/users
 * @desc Add a new user
 * @access Private
 */
const addUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const { data: existingUser, error: existingUserError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser || existingUserError) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const { data: newUser, error: newUserError } = await supabase
      .from('users')
      .insert([{ username, email, password }]);

    if (newUserError) {
      throw newUserError;
    }

    const setupLink = `${process.env.FRONTEND_URL}/setup-password?userId=${newUser[0].id}`;
    await sendWelcomeEmail(email, username, setupLink);

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route PUT /api/users/:id
 * @desc Edit a user
 * @access Private
 */
const editUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id);

    if (error) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user
 * @access Private
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: deletedUser, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route GET /api/users
 * @desc Fetch all users
 * @access Private
 */
const getUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase.from('users').select('*');

    if (error) {
      throw error;
    }

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addUser,
  editUser,
  deleteUser,
  getUsers,
};