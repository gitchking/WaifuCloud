// Debug script for bulk import parsing
function parseBulkImportData(data: string) {
  const lines = data.trim().split('\n');
  const websitesToAdd: any[] = [];
  
  console.log(`Total lines: ${lines.length}`);
  
  // Process data in pairs of lines (title+url, description)
  for (let i = 0; i < lines.length; i += 2) {
    console.log(`Processing pair ${i/2 + 1}:`);
    const titleLine = lines[i]?.trim();
    let descriptionLine = lines[i + 1]?.trim();
    
    console.log(`  Title line: "${titleLine}"`);
    console.log(`  Description line: "${descriptionLine}"`);
    
    // Skip empty lines
    if (!titleLine) {
      console.log(`  Skipping empty title line`);
      continue;
    }
    
    // If we have a title line but no description, use empty string
    let description = descriptionLine || '';
    
    // Check if category is specified in the description line
    let categorySlug = '';
    const categoryMatch = description.match(/#category:([a-z0-9-]+)/i);
    if (categoryMatch) {
      categorySlug = categoryMatch[1];
      // Remove the category specification from the description
      description = description.replace(/#category:[a-z0-9-]+/i, '').trim();
      console.log(`  Found category specification: ${categorySlug}`);
      console.log(`  Description after removal: "${description}"`);
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
      console.log(`  Parsed with regex - Title: "${title}", URL: "${url}"`);
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
        console.log(`  Parsed by URL search - Title: "${title}", URL: "${url}"`);
      } else {
        // No URL found, skip this entry
        console.log(`  No URL found, skipping entry`);
        continue;
      }
    }
    
    // Validate URL
    try {
      new URL(url); // This will throw if URL is invalid
      console.log(`  URL is valid`);
    } catch {
      // Invalid URL, skip this entry
      console.log(`  Invalid URL, skipping entry`);
      continue;
    }
    
    // Validate title
    if (!title || title.length < 2) {
      console.log(`  Invalid title, skipping entry`);
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
                 urlLower.includes('design') || titleLower.includes('design') || descriptionLower.includes('design')) {
        category = 'art';
      } else if (urlLower.includes('drama') || titleLower.includes('drama') || descriptionLower.includes('drama')) {
        category = 'asian-drama';
      }
    }
    
    console.log(`  Final category: ${category}`);
    
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
    
    console.log(`  Added website: ${title} -> ${category}\n`);
  }
  
  return websitesToAdd;
}

// Test data with category specifications
const testData = `ChatGPT - https://chat.openai.com
Advanced conversational AI assistant for various tasks and creative projects. #category:ai-tools

GitHub - https://github.com
World's leading software development platform and version control system. #category:dev-tools

Notion - https://notion.so
All-in-one workspace for notes, docs, projects and collaboration. #category:productivity

Figma - https://figma.com
Collaborative interface design and prototyping platform. #category:art

Spotify - https://spotify.com
Music streaming platform with millions of songs and podcasts. #category:music

Discord - https://discord.com
Voice, video, and text communication platform for communities. #category:social

Netflix - https://netflix.com
Premium streaming service for movies, TV shows, and documentaries. #category:streaming

MangaDex - https://mangadex.org
A fan-driven platform hosting manga scans in multiple languages, known for its vast library and active community. #category:manga-readers

MyAnimeList - https://myanimelist.net
Anime and manga database and community platform. #category:anime

Visual Novel Reader - https://vndb.org
Database and reader for visual novels. #category:visual-novels

ComicK - https://comick.app
A free manga and manhwa reader with a clean interface and community-uploaded translations. #category:manga-readers

Test Auto-detect - https://test-auto-detect.com
This should auto-detect to manga-readers because of the URL. 

Test No Description - https://test-no-desc.com

Test Manual Override - https://test-manual.com
This should be in the games category despite the URL. #category:games`;

console.log('Debugging bulk import parsing...\n');
const parsedData = parseBulkImportData(testData);

console.log('\nFinal results:');
console.log(`Parsed ${parsedData.length} websites:`);
parsedData.forEach((website, index) => {
  console.log(`${index + 1}. ${website.title} -> Category: ${website.category}`);
});