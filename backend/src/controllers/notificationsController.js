// backend/src/controllers/notificationsController.js

const { supabase } = require('../config/supabaseClient');

/**
 * @route GET /api/notifications
 * @desc Get all notifications for a user
 * @access Private
 */
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.user;

    const { data: notifications, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route PUT /api/notifications/:id/read
 * @desc Mark a notification as read
 * @access Private
 */
const markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route DELETE /api/notifications/:id
 * @desc Delete a notification
 * @access Private
 */
const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  deleteNotification
};