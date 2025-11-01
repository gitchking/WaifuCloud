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
('0f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Asian Drama', 'asian-drama', 'Asian television and drama streaming', 'Tv', 11),
('10f0a7e8f-1b4d-4b9a-8b1a-1f0a7e8f1b4d', 'Anime', 'anime', 'Anime streaming platforms and resources', 'Film', 0)
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