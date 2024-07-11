import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mgkmgpnkkroxmjrmkvag.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1na21ncG5ra3JveG1qcm1rdmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2ODMzNTAsImV4cCI6MjAzNjI1OTM1MH0.3raGv0zGK2yB1zbC1xUqtssmqo0aOkaLHrH49gw8NWg';
export const supabase = createClient(supabaseUrl, supabaseKey);