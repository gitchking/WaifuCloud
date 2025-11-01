import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function initSupabaseTables() {
  console.log('Initializing Supabase tables...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Test connection
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase
      .from('websites')
      .select('count()');
    
    if (error) {
      console.log('Supabase connection test failed:', error.message);
      console.log('This likely means the tables do not exist yet.');
      console.log('Please create the tables using the SQL commands in CREATE_TABLES.sql');
    } else {
      console.log('✅ Supabase connection successful');
      console.log('Websites table exists with', data[0].count, 'records');
    }
    
  } catch (error) {
    console.error('❌ Error testing Supabase connection:', error);
  }
}

// Run the initialization
initSupabaseTables();