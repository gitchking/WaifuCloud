import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function directTest() {
  console.log('Direct test of Supabase connection...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Try to list tables directly
    console.log('Attempting to list tables...');
    const { data: tables, error: tablesError } = await supabase.rpc('list_tables');
    
    if (tablesError) {
      console.log('Could not list tables via RPC:', tablesError.message);
    } else {
      console.log('Tables via RPC:', tables);
    }
    
    // Try a simple select from websites
    console.log('Attempting direct select from websites...');
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .limit(1);
      
      if (error) {
        console.error('❌ Error selecting from websites:', error.message);
        console.log('Error code:', error.code);
      } else {
        console.log('✅ Successfully selected from websites');
        console.log('Data:', data);
      }
    } catch (selectError) {
      console.error('❌ Exception during select:', selectError);
    }
    
  } catch (error) {
    console.error('❌ Error in direct test:', error);
  }
}

// Run the direct test
directTest();