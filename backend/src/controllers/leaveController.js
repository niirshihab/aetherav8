const { supabase } = require('../config/supabaseClient');

/**
 * @route POST /api/leave-requests
 * @desc Request leave
 * @access Private
 */
const requestLeave = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('leave_requests')
      .insert([req.body]);

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @route PUT /api/leave-requests/:id
 * @desc Approve or reject leave request
 * @access Private
 */
const approveRejectLeave = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const { data, error } = await supabase
      .from('leave_requests')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  requestLeave,
  approveRejectLeave,
};