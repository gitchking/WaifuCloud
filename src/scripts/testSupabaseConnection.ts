// Simple test script to verify Supabase connection
import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Test websites table with actual data fetch
    console.log('Testing websites table...');
    const { data: websitesData, error: websitesError } = await supabase
      .from('websites')
      .select('*')
      .limit(1);
    
    if (websitesError) {
      console.error('❌ Error accessing websites table:', websitesError.message);
      if (websitesError.message.includes('relation "websites" does not exist')) {
        console.log('The websites table does not exist yet. You need to create it.');
      }
      return;
    }
    
    console.log('✅ Websites table connection successful. Sample records found:', websitesData.length);
    
    // Test categories table with actual data fetch
    console.log('Testing categories table...');
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(1);
    
    if (categoriesError) {
      console.error('❌ Error accessing categories table:', categoriesError.message);
      if (categoriesError.message.includes('relation "categories" does not exist')) {
        console.log('The categories table does not exist yet. You need to create it.');
      }
      return;
    }
    
    console.log('✅ Categories table connection successful. Sample records found:', categoriesData.length);
    
    console.log('✅ All Supabase connections successful!');
    console.log('Your Supabase setup is working correctly.');
    
    // Show some sample data if available
    if (websitesData.length > 0) {
      console.log('\nSample website:');
      console.log('- Title:', websitesData[0].title);
      console.log('- URL:', websitesData[0].url);
    }
    
    if (categoriesData.length > 0) {
      console.log('\nSample category:');
      console.log('- Name:', categoriesData[0].name);
      console.log('- Slug:', categoriesData[0].slug);
    }
  } catch (error) {
    console.error('❌ Error testing Supabase connection:', error);
    console.log('Please check your Supabase credentials and network connection');
  }
}

// Run the test
testSupabaseConnection();