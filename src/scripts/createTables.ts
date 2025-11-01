import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function createTables() {
  console.log('Creating Supabase tables...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client with service key for table creation
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // First, let's try to create the websites table
    console.log('Attempting to create websites table...');
    
    // We'll use a different approach - try to insert a test record to see if table exists
    const { error: websitesError } = await supabase
      .from('websites')
      .select('id')
      .limit(1);
    
    if (websitesError && websitesError.message.includes('not found')) {
      console.log('Websites table does not exist. You need to create it manually through the Supabase dashboard.');
      console.log('Please go to https://app.supabase.com/project/cdpozvboxxzeubudyenc/sql');
      console.log('And run the SQL commands from CREATE_TABLES.sql file');
    } else {
      console.log('✅ Websites table exists');
    }
    
    // Check categories table
    console.log('Attempting to create categories table...');
    const { error: categoriesError } = await supabase
      .from('categories')
      .select('id')
      .limit(1);
    
    if (categoriesError && categoriesError.message.includes('not found')) {
      console.log('Categories table does not exist. You need to create it manually through the Supabase dashboard.');
      console.log('Please go to https://app.supabase.com/project/cdpozvboxxzeubudyenc/sql');
      console.log('And run the SQL commands from CREATE_TABLES.sql file');
    } else {
      console.log('✅ Categories table exists');
    }
    
    console.log('\nTo create the tables manually, please follow these steps:');
    console.log('1. Go to https://app.supabase.com/project/cdpozvboxxzeubudyenc');
    console.log('2. Click on "SQL Editor" in the left sidebar');
    console.log('3. Click "New query"');
    console.log('4. Paste and run the following SQL:');
    console.log('\n--- CREATE TABLES SQL ---');
    console.log(`
-- Create websites table
CREATE TABLE IF NOT EXISTS websites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  icon TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  popular BOOLEAN DEFAULT false,
  clicks INTEGER DEFAULT 0,
  rating NUMERIC(3,2) DEFAULT 4.5,
  dateAdded DATE DEFAULT CURRENT_DATE,
  lastUpdated DATE DEFAULT CURRENT_DATE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS websites_category_idx ON websites(category);
CREATE INDEX IF NOT EXISTS websites_featured_idx ON websites(featured);
CREATE INDEX IF NOT EXISTS websites_popular_idx ON websites(popular);
CREATE INDEX IF NOT EXISTS websites_last_updated_idx ON websites(lastUpdated);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  count INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS categories_slug_idx ON categories(slug);
    `);
    console.log('--- END SQL ---');
    
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    console.log('Please check your Supabase credentials and network connection');
  }
}

// Run the table creation
createTables();