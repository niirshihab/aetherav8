const { supabase } = require('../config/supabaseClient');

/**
 * @route GET /api/hr/metrics
 * @desc Get HR metrics
 * @access Private
 */
const getMetrics = async (req, res) => {
  try {
    const { data: users, error: usersError } = await supabase.from('users').select('*');
    const { data: leaveRequests, error: leaveError } = await supabase
      .from('leave_requests')
      .select('*');
    const { data: expenseRequests, error: expenseError } = await supabase
      .from('expense_requests')
      .select('*');

    if (usersError || leaveError || expenseError) {
      throw new Error('Error fetching HR metrics');
    }

    const metrics = {
      totalEmployees: users.length,
      totalLeaveRequests: leaveRequests.length,
      totalExpenseRequests: expenseRequests.length,
      totalExpenseValue: expenseRequests.reduce((total, req) => total + req.amount, 0),
    };

    res.status(200).json({ success: true, data: metrics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMetrics,
};