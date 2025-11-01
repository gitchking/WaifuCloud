import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function initializeCategoryCounts() {
  console.log('Initializing category counts...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Get all websites grouped by category
    const { data: websites, error: websitesError } = await supabase
      .from('websites')
      .select('category');
    
    if (websitesError) {
      console.error('Error fetching websites:', websitesError.message);
      return;
    }
    
    // Count websites by category
    const categoryCounts: Record<string, number> = {};
    websites.forEach(website => {
      categoryCounts[website.category] = (categoryCounts[website.category] || 0) + 1;
    });
    
    console.log('Category counts:', categoryCounts);
    
    // Get all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, slug');
    
    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError.message);
      return;
    }
    
    console.log('Updating category counts...');
    
    // Update each category with its count
    for (const category of categories) {
      const count = categoryCounts[category.slug] || 0;
      
      const { error: updateError } = await supabase
        .from('categories')
        .update({ count: count })
        .eq('id', category.id);
      
      if (updateError) {
        console.error(`Error updating count for category ${category.slug}:`, updateError.message);
      } else {
        console.log(`Updated ${category.slug} count to ${count}`);
      }
    }
    
    console.log('Category counts initialization completed!');
    
  } catch (error) {
    console.error('Error initializing category counts:', (error as Error).message);
  }
}

// Run the initialization
initializeCategoryCounts();