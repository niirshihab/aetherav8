// backend/src/config/supabaseClient.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and key must be defined in environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };
