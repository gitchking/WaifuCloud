import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function initSupabaseDirect() {
  console.log('Initializing Supabase tables directly...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Create websites table
    console.log('Creating websites table...');
    const { error: websitesError } = await supabase.rpc('create_websites_table');
    if (websitesError) {
      console.log('Websites table may already exist or error occurred:', websitesError);
    } else {
      console.log('Websites table created successfully');
    }
    
    // Create categories table
    console.log('Creating categories table...');
    const { error: categoriesError } = await supabase.rpc('create_categories_table');
    if (categoriesError) {
      console.log('Categories table may already exist or error occurred:', categoriesError);
    } else {
      console.log('Categories table created successfully');
    }
    
    console.log('✅ Supabase tables initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing Supabase tables:', error);
  }
}

// Run the initialization
initSupabaseDirect();