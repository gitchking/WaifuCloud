// Script to add/update the Anime category in the existing Supabase database
import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function updateAnimeCategory() {
  console.log('Updating Anime category in the database...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Define the Anime category with proper UUID format and Film icon
    const animeCategory = {
      id: '10f0a7e8-f1b4-4d4b-9a8b-1a1f0a7e8f1b',
      name: 'Anime',
      slug: 'anime',
      description: 'Anime streaming platforms and resources',
      icon: 'Film',
      count: 0
    };
    
    // Update the Anime category
    console.log('Updating Anime category...');
    const { data, error } = await supabase
      .from('categories')
      .update(animeCategory)
      .eq('slug', 'anime')
      .select();
    
    if (error) {
      console.error('Error updating Anime category:', error.message);
      return;
    }
    
    // If no rows were updated, insert the category
    if (data && data.length === 0) {
      console.log('Anime category not found, inserting new one...');
      const { data: insertData, error: insertError } = await supabase
        .from('categories')
        .insert(animeCategory)
        .select();
      
      if (insertError) {
        console.error('Error inserting Anime category:', insertError.message);
        return;
      }
      
      console.log('✅ Anime category inserted successfully!');
      console.log('Data:', insertData);
    } else {
      console.log('✅ Anime category updated successfully!');
      console.log('Data:', data);
    }
  } catch (error) {
    console.error('❌ Error updating Anime category:', error);
  }
}

// Always run the function
updateAnimeCategory();

export { updateAnimeCategory };