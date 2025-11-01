import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

// SQL commands to create tables
const CREATE_TABLES_SQL = `
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
`;

// SQL commands to insert initial data
const INSERT_DATA_SQL = `
-- Insert initial categories
INSERT INTO categories (id, name, slug, description, icon, count) VALUES
('1f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'AI Tools', 'ai-tools', 'Artificial intelligence powered applications', 'Brain', 45),
('2f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Dev Tools', 'dev-tools', 'Developer productivity and coding tools', 'Code2', 38),
('3f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Productivity', 'productivity', 'Tools to boost your productivity', 'Zap', 52),
('4f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Streaming', 'streaming', 'Video and audio streaming platforms', 'Play', 23),
('5f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Games', 'games', 'Online gaming and entertainment', 'Gamepad2', 31),
('6f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Social', 'social', 'Social networking and communication', 'Users', 19),
('7f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Music', 'music', 'Music streaming and audio tools', 'Music', 27),
('8f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Search Engines', 'search-engines', 'Alternative search platforms', 'Search', 12),
('9f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Visual Novels', 'visual-novels', 'Interactive story games', 'BookOpen', 16),
('af0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Manga Readers', 'manga-readers', 'Digital manga reading platforms', 'Book', 14),
('bf0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Databases', 'databases', 'Data storage and management tools', 'Database', 22),
('cf0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Privacy Tools', 'privacy-tools', 'Security and privacy applications', 'Shield', 18),
('df0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Forum', 'forum', 'Discussion and community platforms', 'MessageSquare', 13),
('ef0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Statistics', 'statistics', 'Analytics and data visualization', 'BarChart3', 15),
('ff0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Art', 'art', 'Digital art and creative tools', 'Palette', 29),
('0f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Asian Drama', 'asian-drama', 'Asian television and drama streaming', 'Tv', 11)
ON CONFLICT (slug) DO NOTHING;

-- Insert initial websites
INSERT INTO websites (id, title, description, url, icon, category, tags, featured, popular, clicks, rating, dateAdded, lastUpdated) VALUES
('1f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'ChatGPT', 'Advanced conversational AI assistant for various tasks and creative projects', 'https://chat.openai.com', '🤖', 'ai-tools', '{"AI", "Chat", "Assistant", "OpenAI"}', true, true, 15420, 4.8, '2024-01-15', '2024-01-20'),
('2f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'GitHub', 'World''s leading software development platform and version control system', 'https://github.com', '⚙️', 'dev-tools', '{"Git", "Code", "Development", "Open Source"}', true, true, 12830, 4.9, '2024-01-10', '2024-01-18'),
('3f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Notion', 'All-in-one workspace for notes, docs, projects and collaboration', 'https://notion.so', '📝', 'productivity', '{"Notes", "Workspace", "Organization", "Collaboration"}', true, false, 9650, 4.7, '2024-01-12', '2024-01-19'),
('4f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Figma', 'Collaborative interface design and prototyping platform', 'https://figma.com', '🎨', 'art', '{"Design", "UI/UX", "Prototyping", "Collaboration"}', false, true, 8940, 4.8, '2024-01-14', '2024-01-21'),
('5f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Spotify', 'Music streaming platform with millions of songs and podcasts', 'https://spotify.com', '🎵', 'music', '{"Music", "Streaming", "Podcasts", "Playlist"}', false, true, 7230, 4.6, '2024-01-11', '2024-01-17'),
('6f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Discord', 'Voice, video, and text communication platform for communities', 'https://discord.com', '💬', 'social', '{"Chat", "Gaming", "Community", "Voice"}', false, false, 6180, 4.5, '2024-01-13', '2024-01-16'),
('7f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Netflix', 'Premium streaming service for movies, TV shows, and documentaries', 'https://netflix.com', '🎬', 'streaming', '{"Movies", "TV Shows", "Entertainment", "Streaming"}', true, true, 11200, 4.4, '2024-01-09', '2024-01-22'),
('8f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'MangaDex', 'Free online manga reader with extensive library and translations', 'https://mangadex.org', '📚', 'manga-readers', '{"Manga", "Reading", "Free", "Community"}', false, false, 4560, 4.3, '2024-01-16', '2024-01-20')
ON CONFLICT (url) DO NOTHING;
`;

async function executeSql() {
  console.log('Executing SQL commands to create tables...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client with service role key for table creation
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Execute table creation SQL
    console.log('Creating tables...');
    const { error: createError } = await supabase.rpc('execute_sql', { sql: CREATE_TABLES_SQL });
    
    if (createError) {
      console.log('Error creating tables:', createError.message);
      console.log('Trying alternative method...');
      
      // Alternative method - execute each statement separately
      const statements = CREATE_TABLES_SQL
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);
      
      for (const statement of statements) {
        console.log('Executing:', statement.substring(0, 50) + '...');
        const { error } = await supabase.rpc('execute_sql', { sql: statement });
        if (error) {
          console.log('Error executing statement:', error.message);
        } else {
          console.log('✓ Statement executed successfully');
        }
      }
    } else {
      console.log('✓ Tables created successfully');
    }
    
    // Execute data insertion SQL
    console.log('Inserting initial data...');
    const { error: insertError } = await supabase.rpc('execute_sql', { sql: INSERT_DATA_SQL });
    
    if (insertError) {
      console.log('Error inserting data:', insertError.message);
      console.log('Trying alternative method...');
      
      // Alternative method - execute each statement separately
      const statements = INSERT_DATA_SQL
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);
      
      for (const statement of statements) {
        console.log('Executing:', statement.substring(0, 50) + '...');
        const { error } = await supabase.rpc('execute_sql', { sql: statement });
        if (error) {
          console.log('Error executing statement:', error.message);
        } else {
          console.log('✓ Statement executed successfully');
        }
      }
    } else {
      console.log('✓ Initial data inserted successfully');
    }
    
    console.log('✅ SQL execution completed');
    
  } catch (error) {
    console.error('❌ Error executing SQL:', error);
  }
}

// Run the SQL execution
executeSql();