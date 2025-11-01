import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function diagnoseAdmin() {
  console.log('=== Admin Dashboard Diagnosis ===');
  console.log('Supabase URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // 1. Check if we can connect to Supabase at all
    console.log('\n1. Testing basic Supabase connection...');
    try {
      const { error } = await supabase.rpc('version');
      if (error) {
        console.log('   Basic connection test failed:', error.message);
      } else {
        console.log('   ✅ Basic connection successful');
      }
    } catch (error) {
      console.log('   Basic connection test exception:', (error as Error).message);
    }
    
    // 2. Check if websites table exists
    console.log('\n2. Checking websites table...');
    try {
      const { error } = await supabase
        .from('websites')
        .select('id')
        .limit(1);
      
      if (error) {
        console.log('   ❌ Websites table access failed:', error.message);
        console.log('   This means the table does not exist or you don\'t have permission to access it');
      } else {
        console.log('   ✅ Websites table exists and is accessible');
      }
    } catch (error) {
      console.log('   Websites table check exception:', (error as Error).message);
    }
    
    // 3. Check if categories table exists
    console.log('\n3. Checking categories table...');
    try {
      const { error } = await supabase
        .from('categories')
        .select('id')
        .limit(1);
      
      if (error) {
        console.log('   ❌ Categories table access failed:', error.message);
        console.log('   This means the table does not exist or you don\'t have permission to access it');
      } else {
        console.log('   ✅ Categories table exists and is accessible');
      }
    } catch (error) {
      console.log('   Categories table check exception:', (error as Error).message);
    }
    
    // 4. Check environment variables
    console.log('\n4. Checking environment configuration...');
    const hasUrl = !!process.env.VITE_SUPABASE_URL || !!process.env.SUPABASE_URL;
    const hasKey = !!process.env.VITE_SUPABASE_ANON_KEY || !!process.env.SUPABASE_KEY;
    
    console.log('   VITE_SUPABASE_URL set:', !!process.env.VITE_SUPABASE_URL);
    console.log('   SUPABASE_URL set:', !!process.env.SUPABASE_URL);
    console.log('   VITE_SUPABASE_ANON_KEY set:', !!process.env.VITE_SUPABASE_ANON_KEY);
    console.log('   SUPABASE_KEY set:', !!process.env.SUPABASE_KEY);
    
    if (!hasUrl || !hasKey) {
      console.log('   ❌ Missing Supabase configuration in environment variables');
      console.log('   Please check your .env file');
    } else {
      console.log('   ✅ Supabase configuration found');
    }
    
    // 5. Summary
    console.log('\n=== Diagnosis Summary ===');
    console.log('If you see "table access failed" messages above, you need to create the tables.');
    console.log('Follow these steps:');
    console.log('1. Go to https://app.supabase.com/project/cdpozvboxxzeubudyenc');
    console.log('2. Click on "SQL Editor" in the left sidebar');
    console.log('3. Click "New query"');
    console.log('4. Copy and paste the SQL commands from CREATE_TABLES.sql');
    console.log('5. Click "Run" to execute the commands');
    console.log('6. Restart your development server');
    
  } catch (error) {
    console.error('❌ Error during diagnosis:', (error as Error).message);
  }
}

// Run the diagnosis
diagnoseAdmin();