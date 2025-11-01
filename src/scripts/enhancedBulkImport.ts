// Enhanced bulk import script with improved category detection
import { createClient } from '@supabase/supabase-js';
import { categories } from '../data/categories';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

// Enhanced bulk import data with more diverse examples
const enhancedSampleData = `ChatGPT - https://chat.openai.com
Advanced conversational AI assistant for various tasks and creative projects.
GitHub - https://github.com
World's leading software development platform and version control system.
Notion - https://notion.so
All-in-one workspace for notes, docs, projects and collaboration.
Figma - https://figma.com
Collaborative interface design and prototyping platform.
Spotify - https://spotify.com
Music streaming platform with millions of songs and podcasts.
Discord - https://discord.com
Voice, video, and text communication platform for communities.
Netflix - https://netflix.com
Premium streaming service for movies, TV shows, and documentaries.
MangaDex - https://mangadex.org
A fan-driven platform hosting manga scans in multiple languages, known for its vast library and active community.
MyAnimeList - https://myanimelist.net
Anime and manga database and community platform.
Visual Novel Reader - https://vndb.org
Database and reader for visual novels.
ComicK - https://comick.app
A free manga and manhwa reader with a clean interface and community-uploaded translations.`;

interface ParsedWebsite {
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  popular: boolean;
  clicks: number;
  rating: number;
  dateAdded: string;
  lastUpdated: string;
}

function parseBulkImportData(data: string): Omit<ParsedWebsite, 'id'>[] {
  // Split by newlines and filter out empty lines
  const lines = data.trim().split('\n').filter(line => line.trim() !== '');
  const websitesToAdd: Omit<ParsedWebsite, 'id'>[] = [];
  
  // Process data in pairs of lines (title+url, description)
  for (let i = 0; i < lines.length; i += 2) {
    const titleLine = lines[i]?.trim();
    let descriptionLine = lines[i + 1]?.trim();
    
    // Skip if we don't have a title line
    if (!titleLine) continue;
    
    // If we have a title line but no description, use empty string
    let description = descriptionLine || '';
    
    // Check if category is specified in the description line
    let categorySlug = '';
    const categoryMatch = description.match(/#category:([a-z0-9-]+)/i);
    if (categoryMatch) {
      categorySlug = categoryMatch[1];
      // Remove the category specification from the description
      description = description.replace(/#category:[a-z0-9-]+/i, '').trim();
    }
    
    // Extract title and URL from title line
    // Format: "Title - URL" or just "Title - URL" without extra formatting
    let title = '';
    let url = '';
    
    // Try to match the format "Title - URL"
    const titleUrlMatch = titleLine.match(/^(.*?)\s*-\s*(https?:\/\/.*)$/i);
    if (titleUrlMatch) {
      title = titleUrlMatch[1].trim();
      url = titleUrlMatch[2].trim();
    } else {
      // If that doesn't work, try to find URL anywhere in the line
      const urlMatch = titleLine.match(/(https?:\/\/[^\s]+)/i);
      if (urlMatch) {
        url = urlMatch[1];
        // Extract title as everything before the URL
        title = titleLine.substring(0, titleLine.indexOf(url)).replace(/[-\s]+$/, '').trim();
        // If title is empty, use the domain as title
        if (!title) {
          try {
            const urlObj = new URL(url);
            title = urlObj.hostname.replace('www.', '');
            // Capitalize first letter
            title = title.charAt(0).toUpperCase() + title.slice(1);
          } catch {
            title = 'Untitled';
          }
        }
      } else {
        // No URL found, skip this entry
        continue;
      }
    }
    
    // Validate URL
    try {
      new URL(url); // This will throw if URL is invalid
    } catch {
      // Invalid URL, skip this entry
      continue;
    }
    
    // Validate title
    if (!title || title.length < 2) {
      continue;
    }
    
    // Use specified category or auto-detect based on URL content with more precise detection
    let category = 'manga-readers'; // Default category
    if (categorySlug) {
      // Use the specified category
      category = categorySlug;
    } else {
      // Auto-detect category based on URL, title, and description
      const urlLower = url.toLowerCase();
      const titleLower = title.toLowerCase();
      const descriptionLower = description.toLowerCase();
      
      // More sophisticated category detection based on URL, title, and description
      if (urlLower.includes('manga') || titleLower.includes('manga') || descriptionLower.includes('manga') ||
          urlLower.includes('manhwa') || titleLower.includes('manhwa') || descriptionLower.includes('manhwa') ||
          urlLower.includes('manhua') || titleLower.includes('manhua') || descriptionLower.includes('manhua') ||
          urlLower.includes('comic') || titleLower.includes('comic') || descriptionLower.includes('comic')) {
        category = 'manga-readers';
      } else if (urlLower.includes('anime') || titleLower.includes('anime') || descriptionLower.includes('anime') ||
                 urlLower.includes('animelist') || titleLower.includes('animelist') || descriptionLower.includes('animelist')) {
        category = 'anime';
      } else if (urlLower.includes('novel') || titleLower.includes('novel') || descriptionLower.includes('novel') ||
                 urlLower.includes('fiction') || titleLower.includes('fiction') || descriptionLower.includes('fiction')) {
        category = 'visual-novels';
      } else if (urlLower.includes('ai') || titleLower.includes('ai') || descriptionLower.includes('ai') ||
                 urlLower.includes('chatgpt') || titleLower.includes('chatgpt') || descriptionLower.includes('chatgpt') ||
                 urlLower.includes('openai') || titleLower.includes('openai') || descriptionLower.includes('openai')) {
        category = 'ai-tools';
      } else if (urlLower.includes('github') || titleLower.includes('github') || descriptionLower.includes('github') ||
                 urlLower.includes('git') || titleLower.includes('git') || descriptionLower.includes('git')) {
        category = 'dev-tools';
      } else if (urlLower.includes('notion') || titleLower.includes('notion') || descriptionLower.includes('notion') ||
                 urlLower.includes('productivity') || titleLower.includes('productivity') || descriptionLower.includes('productivity')) {
        category = 'productivity';
      } else if (urlLower.includes('netflix') || titleLower.includes('netflix') || descriptionLower.includes('netflix') ||
                 urlLower.includes('stream') || titleLower.includes('stream') || descriptionLower.includes('stream')) {
        category = 'streaming';
      } else if (urlLower.includes('game') || titleLower.includes('game') || descriptionLower.includes('game')) {
        category = 'games';
      } else if (urlLower.includes('discord') || titleLower.includes('discord') || descriptionLower.includes('discord') ||
                 urlLower.includes('social') || titleLower.includes('social') || descriptionLower.includes('social')) {
        category = 'social';
      } else if (urlLower.includes('spotify') || titleLower.includes('spotify') || descriptionLower.includes('spotify') ||
                 urlLower.includes('music') || titleLower.includes('music') || descriptionLower.includes('music')) {
        category = 'music';
      } else if (urlLower.includes('search') || titleLower.includes('search') || descriptionLower.includes('search')) {
        category = 'search-engines';
      } else if (urlLower.includes('database') || titleLower.includes('database') || descriptionLower.includes('database')) {
        category = 'databases';
      } else if (urlLower.includes('privacy') || titleLower.includes('privacy') || descriptionLower.includes('privacy') ||
                 urlLower.includes('vpn') || titleLower.includes('vpn') || descriptionLower.includes('vpn')) {
        category = 'privacy-tools';
      } else if (urlLower.includes('forum') || titleLower.includes('forum') || descriptionLower.includes('forum')) {
        category = 'forum';
      } else if (urlLower.includes('stat') || titleLower.includes('stat') || descriptionLower.includes('stat') ||
                 urlLower.includes('analytic') || titleLower.includes('analytic') || descriptionLower.includes('analytic')) {
        category = 'statistics';
      } else if (urlLower.includes('art') || titleLower.includes('art') || descriptionLower.includes('art') ||
                 urlLower.includes('design') || titleLower.includes('design') || descriptionLower.includes('design') ||
                 urlLower.includes('figma') || titleLower.includes('figma') || descriptionLower.includes('figma')) {
        category = 'art';
      } else if (urlLower.includes('drama') || titleLower.includes('drama') || descriptionLower.includes('drama')) {
        category = 'asian-drama';
      }
    }
    
    websitesToAdd.push({
      title,
      url,
      description,
      category,
      tags: [], // Will be populated based on URL and title
      featured: false,
      popular: false,
      clicks: 0,
      rating: 4.5,
      dateAdded: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  }
  
  // Add tags based on content
  websitesToAdd.forEach(website => {
    const tags: string[] = [];
    
    // Add tags based on title content
    const titleLower = website.title?.toLowerCase() || '';
    if (titleLower.includes('manga')) tags.push('Manga');
    if (titleLower.includes('manhwa')) tags.push('Manhwa');
    if (titleLower.includes('manhua')) tags.push('Manhua');
    if (titleLower.includes('webtoon')) tags.push('Webtoon');
    if (titleLower.includes('comic')) tags.push('Comic');
    if (titleLower.includes('novel') && !titleLower.includes('light novel')) tags.push('Novel');
    if (titleLower.includes('light novel')) tags.push('Light Novel');
    if (titleLower.includes('ai')) tags.push('AI');
    if (titleLower.includes('tool')) tags.push('Tool');
    if (titleLower.includes('productivity')) tags.push('Productivity');
    if (titleLower.includes('stream')) tags.push('Streaming');
    if (titleLower.includes('game')) tags.push('Game');
    if (titleLower.includes('social')) tags.push('Social');
    if (titleLower.includes('music')) tags.push('Music');
    if (titleLower.includes('search')) tags.push('Search');
    if (titleLower.includes('database')) tags.push('Database');
    if (titleLower.includes('privacy')) tags.push('Privacy');
    if (titleLower.includes('forum')) tags.push('Forum');
    if (titleLower.includes('stat')) tags.push('Statistics');
    if (titleLower.includes('art')) tags.push('Art');
    if (titleLower.includes('drama')) tags.push('Drama');
    if (titleLower.includes('anime')) tags.push('Anime');
    if (titleLower.includes('chat')) tags.push('Chat');
    if (titleLower.includes('code')) tags.push('Code');
    if (titleLower.includes('design')) tags.push('Design');
    if (titleLower.includes('platform')) tags.push('Platform');
    
    // Add tags based on URL content
    const urlLower = website.url?.toLowerCase() || '';
    if (urlLower.includes('raw')) tags.push('Raw');
    if (urlLower.includes('scan') || urlLower.includes('tl')) tags.push('Scanlation');
    if (urlLower.includes('fan')) tags.push('Fan');
    if (urlLower.includes('free')) tags.push('Free');
    if (urlLower.includes('reader')) tags.push('Reader');
    if (urlLower.includes('community')) tags.push('Community');
    
    // Add generic tags
    tags.push('Free', 'Reader');
    
    // Remove duplicates and limit to reasonable number
    website.tags = [...new Set(tags)].slice(0, 10);
  });
  
  return websitesToAdd;
}

async function enhancedBulkImport() {
  console.log('Testing enhanced bulk import parsing...');
  
  const parsedData = parseBulkImportData(enhancedSampleData);
  console.log('Parsed data:', parsedData);
  
  // Show category distribution
  const categoryCount: Record<string, number> = {};
  parsedData.forEach(website => {
    categoryCount[website.category] = (categoryCount[website.category] || 0) + 1;
  });
  
  console.log('Category distribution:', categoryCount);
  
  console.log('Creating Supabase client...');
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  
  console.log('Testing Supabase connection...');
  try {
    const { data, error } = await supabase.from('websites').select('*', { count: 'exact' });
    if (error) {
      console.error('Supabase connection error:', error.message);
      return;
    }
    console.log('Supabase connection successful. Current websites count:', data?.length || 0);
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return;
  }
  
  console.log('Testing enhanced bulk import with Supabase...');
  let successCount = 0;
  let failedCount = 0;
  
  for (const website of parsedData) {
    try {
      console.log(`Adding website: ${website.title} (Category: ${website.category})`);
      const { data, error } = await supabase
        .from('websites')
        .insert({
          title: website.title,
          description: website.description,
          url: website.url,
          category: website.category,
          tags: website.tags,
          featured: website.featured,
          popular: website.popular,
          clicks: website.clicks,
          rating: website.rating,
          dateadded: website.dateAdded,
          lastupdated: website.lastUpdated
        })
        .select();
      
      if (error) {
        console.error(`Failed to add ${website.title}:`, error.message);
        failedCount++;
      } else {
        console.log(`Successfully added ${website.title}`);
        successCount++;
      }
    } catch (error) {
      console.error(`Error adding ${website.title}:`, error);
      failedCount++;
    }
  }
  
  console.log(`Enhanced bulk import completed. Success: ${successCount}, Failed: ${failedCount}`);
  
  // Show final category distribution in database
  try {
    const { data: websites, error } = await supabase.from('websites').select('category');
    if (!error && websites) {
      const dbCategoryCount: Record<string, number> = {};
      websites.forEach(website => {
        dbCategoryCount[website.category] = (dbCategoryCount[website.category] || 0) + 1;
      });
      console.log('Final database category distribution:', dbCategoryCount);
    }
  } catch (error) {
    console.error('Error fetching category distribution:', error);
  }
  
  // Clean up test data
  if (successCount > 0) {
    console.log('Cleaning up test data...');
    for (const website of parsedData) {
      try {
        await supabase
          .from('websites')
          .delete()
          .eq('url', website.url);
        console.log(`Removed test website: ${website.title}`);
      } catch (error) {
        console.error(`Error removing test website ${website.title}:`, error);
      }
    }
  }
}

// Run the enhanced test
enhancedBulkImport();

export { parseBulkImportData };