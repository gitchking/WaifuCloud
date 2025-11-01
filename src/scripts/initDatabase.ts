// Simple database initialization script
import { createClient } from '@supabase/supabase-js';
import { websites } from '../data/websites';
import { categories } from '../data/categories';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function initDatabase() {
  console.log('Initializing database with sample data...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Insert categories
    console.log('Inserting categories...');
    const { error: categoriesError } = await supabase
      .from('categories')
      .upsert(categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        count: cat.count
      })), {
        onConflict: 'slug'
      });
    
    if (categoriesError) {
      console.error('Error inserting categories:', categoriesError.message);
      if (categoriesError.message.includes('relation "categories" does not exist')) {
        console.log('Please create the categories table first using the SQL in CREATE_TABLES.sql');
      }
      return;
    }
    
    console.log('Categories inserted successfully!');
    
    // Insert websites
    console.log('Inserting websites...');
    const { error: websitesError } = await supabase
      .from('websites')
      .upsert(websites.map(website => ({
        id: website.id,
        title: website.title,
        description: website.description,
        url: website.url,
        icon: website.icon || null,
        category: website.category,
        tags: website.tags,
        featured: website.featured,
        popular: website.popular,
        clicks: website.clicks,
        rating: website.rating,
        dateAdded: website.dateAdded,
        lastUpdated: website.lastUpdated
      })), {
        onConflict: 'url'
      });
    
    if (websitesError) {
      console.error('Error inserting websites:', websitesError.message);
      if (websitesError.message.includes('relation "websites" does not exist')) {
        console.log('Please create the websites table first using the SQL in CREATE_TABLES.sql');
      }
      return;
    }
    
    console.log('Websites inserted successfully!');
    console.log('✅ Database initialization completed!');
    console.log('You can now start your development server with "npm run dev"');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    console.log('Please check your Supabase credentials and network connection');
  }
}

// Run the initialization if this file is executed directly
if (require.main === module) {
  initDatabase();
}

export { initDatabase };