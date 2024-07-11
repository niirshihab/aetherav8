const { supabase } = require('../config/supabaseClient');

/**
 * @route POST /api/documents
 * @desc Upload a document
 * @access Private
 */
const uploadDocument = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .insert([req.body]);

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @route GET /api/documents
 * @desc Fetch all documents
 * @access Private
 */
const getDocuments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
};