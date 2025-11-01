import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function setupTables() {
  console.log('Setting up Supabase tables...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Check if websites table exists by trying to query it
    console.log('Checking if websites table exists...');
    const { error: websitesError } = await supabase
      .from('websites')
      .select('id')
      .limit(1);
    
    if (websitesError && websitesError.message.includes('not found')) {
      console.log('Websites table does not exist. Creating it...');
      
      // For security reasons, we can't create tables directly through the client
      // We need to guide the user to create them manually
      console.log('\n❌ Cannot create tables directly through the client.');
      console.log('Please follow these steps to create the tables manually:');
      console.log('\n1. Go to https://app.supabase.com/project/cdpozvboxxzeubudyenc');
      console.log('2. Click on "SQL Editor" in the left sidebar');
      console.log('3. Click "New query"');
      console.log('4. Copy and paste the following SQL commands:');
      console.log('\n--- START SQL COMMANDS ---\n');
      
      // Read the SQL file content and display it
      const fs = require('fs');
      const path = require('path');
      
      try {
        const sqlPath = path.join(__dirname, '..', '..', 'CREATE_TABLES.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        console.log(sqlContent);
      } catch (fileError) {
        console.log('Could not read CREATE_TABLES.sql file. Here are the commands:');
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
      }
      
      console.log('\n--- END SQL COMMANDS ---\n');
      console.log('5. Click "Run" to execute the commands');
      console.log('6. After running the commands, run this script again to verify');
      
    } else {
      console.log('✅ Websites table exists');
    }
    
    // Check if categories table exists
    console.log('Checking if categories table exists...');
    const { error: categoriesError } = await supabase
      .from('categories')
      .select('id')
      .limit(1);
    
    if (categoriesError && categoriesError.message.includes('not found')) {
      console.log('Categories table does not exist.');
      // The instructions above will cover creating this table too
    } else {
      console.log('✅ Categories table exists');
    }
    
    console.log('\n--- Setup Instructions ---');
    console.log('To fix the issue blocking card link additions:');
    console.log('1. Create the tables using the SQL commands above');
    console.log('2. Restart your development server');
    console.log('3. Try adding a card link again');
    
  } catch (error) {
    console.error('❌ Error during setup:', error);
  }
}

// Run the setup
setupTables();