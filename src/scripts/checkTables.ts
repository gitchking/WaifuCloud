import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function checkTables() {
  console.log('Checking Supabase tables...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Try to get table information from the schema
    console.log('Checking table information...');
    
    // Method 1: Try to query the tables directly
    console.log('\n1. Testing websites table access...');
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('count()');
      
      if (error) {
        console.log('❌ Error accessing websites table:', error.message);
        console.log('   This indicates the table does not exist');
      } else {
        console.log('✅ Websites table exists and is accessible');
        console.log('   Record count:', data.length > 0 ? data[0].count : 0);
      }
    } catch (error) {
      console.log('❌ Exception accessing websites table:', (error as Error).message);
    }
    
    console.log('\n2. Testing categories table access...');
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('count()');
      
      if (error) {
        console.log('❌ Error accessing categories table:', error.message);
        console.log('   This indicates the table does not exist');
      } else {
        console.log('✅ Categories table exists and is accessible');
        console.log('   Record count:', data.length > 0 ? data[0].count : 0);
      }
    } catch (error) {
      console.log('❌ Exception accessing categories table:', (error as Error).message);
    }
    
    // Method 2: Check if we can list the tables in the schema
    console.log('\n3. Checking schema information...');
    try {
      // This might not work depending on permissions, but let's try
      const { data, error } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');
      
      if (error) {
        console.log('Could not retrieve schema information:', error.message);
      } else {
        console.log('Tables in public schema:');
        const tableNames = data.map((row: any) => row.table_name);
        console.log(tableNames);
        
        const hasWebsites = tableNames.includes('websites');
        const hasCategories = tableNames.includes('categories');
        
        console.log('Websites table exists:', hasWebsites);
        console.log('Categories table exists:', hasCategories);
      }
    } catch (error) {
      console.log('Exception checking schema:', (error as Error).message);
    }
    
    console.log('\n--- Summary ---');
    console.log('If tables do not exist, please create them manually:');
    console.log('1. Go to https://app.supabase.com/project/cdpozvboxxzeubudyenc');
    console.log('2. Click on "SQL Editor" in the left sidebar');
    console.log('3. Click "New query"');
    console.log('4. Run the SQL commands from CREATE_TABLES.sql');
    
  } catch (error) {
    console.error('❌ Error during check:', error);
  }
}

// Run the check
checkTables();