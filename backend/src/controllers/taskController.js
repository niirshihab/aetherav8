const express = require('express');
const { supabase } = require('../config/supabaseClient');
const router = express.Router();

/**
 * @route POST /tasks
 * @desc Create a new task
 * @access Public
 */
router.post('/tasks', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([req.body]);

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /tasks
 * @desc Get all tasks
 * @access Public
 */
router.get('/tasks', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /tasks/today
 * @desc Get tasks for today
 * @access Public
 */
router.get('/tasks/today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('dueDate', today);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /tasks/tomorrow
 * @desc Get tasks for tomorrow
 * @access Public
 */
router.get('/tasks/tomorrow', async (req, res) => {
  try {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('dueDate', tomorrow);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;