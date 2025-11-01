import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function simpleTest() {
  console.log('Testing Supabase connection...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Test connection by trying to access websites table
    console.log('Testing websites table access...');
    const { data, error } = await supabase
      .from('websites')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Error accessing websites table:', error.message);
      console.log('This likely means the table does not exist yet.');
      console.log('Please create the tables using the SQL commands provided in the CREATE_TABLES.sql file.');
    } else {
      console.log('✅ Successfully connected to websites table');
      console.log('Found records:', data.length);
    }
    
  } catch (error) {
    console.error('❌ Error testing Supabase connection:', error);
  }
}

// Run the test
simpleTest();