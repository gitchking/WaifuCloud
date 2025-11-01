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