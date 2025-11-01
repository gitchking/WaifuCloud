// Simple test script to verify data retrieval
import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function testDataRetrieval() {
  console.log('Testing data retrieval from Supabase...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Fetch websites
    console.log('Fetching websites...');
    const { data: websites, error: websitesError } = await supabase
      .from('websites')
      .select('*');
    
    if (websitesError) {
      console.error('Error fetching websites:', websitesError.message);
      if (websitesError.message.includes('relation "websites" does not exist')) {
        console.log('Please create the websites table first using the SQL in CREATE_TABLES.sql');
      }
      return;
    }
    
    console.log('✅ Successfully fetched websites. Count:', websites.length);
    
    // Fetch categories
    console.log('Fetching categories...');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*');
    
    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError.message);
      if (categoriesError.message.includes('relation "categories" does not exist')) {
        console.log('Please create the categories table first using the SQL in CREATE_TABLES.sql');
      }
      return;
    }
    
    console.log('✅ Successfully fetched categories. Count:', categories.length);
    
    // Display sample data
    console.log('\n--- Sample Data ---');
    
    if (websites.length > 0) {
      console.log('\nWebsites:');
      websites.slice(0, 3).forEach((website: any) => {
        console.log(`- ${website.title} (${website.url})`);
      });
    }
    
    if (categories.length > 0) {
      console.log('\nCategories:');
      categories.slice(0, 3).forEach((category: any) => {
        console.log(`- ${category.name} (${category.slug})`);
      });
    }
    
    console.log('\n✅ Data retrieval test completed successfully!');
  } catch (error) {
    console.error('❌ Error during data retrieval test:', error);
    console.log('Please check your Supabase credentials and network connection');
  }
}

// Run the test
testDataRetrieval();