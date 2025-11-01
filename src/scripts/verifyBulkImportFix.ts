// Test the fixed parseBulkImportData function
function parseBulkImportData(data: string) {
  // Split by newlines and filter out empty lines
  const rawLines = data.trim().split('\n');
  const lines = rawLines.filter(line => line.trim() !== '');
  
  // If we have an odd number of lines, the last line is incomplete
  const validLineCount = lines.length % 2 === 0 ? lines.length : lines.length - 1;
  
  const websitesToAdd: any[] = [];
  
  console.log(`Processing ${validLineCount} lines (${validLineCount/2} website pairs)`);
  
  // Process data in pairs of lines (title+url, description)
  for (let i = 0; i < validLineCount; i += 2) {
    const titleLine = lines[i]?.trim();
    let descriptionLine = lines[i + 1]?.trim();
    
    console.log(`Processing pair ${i/2 + 1}:`, { titleLine, descriptionLine });
    
    // Skip if we don't have a title line
    if (!titleLine) {
      console.log(`Skipping pair ${i/2 + 1}: Empty title line`);
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
      console.log(`Parsed with regex - Title: "${title}", URL: "${url}"`);
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
        console.log(`Parsed by URL search - Title: "${title}", URL: "${url}"`);
      } else {
        // No URL found, skip this entry
        console.log(`No URL found in line: "${titleLine}", skipping entry`);
        continue;
      }
    }
    
    // Validate URL
    try {
      new URL(url); // This will throw if URL is invalid
      console.log(`URL is valid: ${url}`);
    } catch {
      // Invalid URL, skip this entry
      console.log(`Invalid URL, skipping entry: ${url}`);
      continue;
    }
    
    // Validate title
    if (!title || title.length < 2) {
      console.log(`Invalid title, skipping entry: "${title}"`);
      continue;
    }
    
    console.log(`Valid entry found - Title: "${title}", URL: "${url}"`);
    
    // Use specified category or auto-detect based on URL content with more precise detection
    let category = 'manga-readers'; // Default category
    if (categorySlug) {
      // Use the specified category
      category = categorySlug;
      console.log(`Using specified category: ${category}`);
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
      console.log(`Auto-detected category: ${category}`);
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
    
    console.log(`Added website: ${title} -> ${category}`);
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
  
  console.log(`Total websites to add: ${websitesToAdd.length}`);
  return websitesToAdd;
}

// Test data in the correct format
const testData = `ChatGPT - https://chat.openai.com
Advanced conversational AI assistant for various tasks and creative projects. #category:ai-tools
GitHub - https://github.com
World's leading software development platform and version control system. #category:dev-tools
Notion - https://notion.so
All-in-one workspace for notes, docs, projects and collaboration.
MangaDex - https://mangadex.org
A fan-driven platform hosting manga scans in multiple languages, known for its vast library and active community. #category:manga-readers
Netflix - https://netflix.com
Premium streaming service for movies, TV shows, and documentaries. #category:streaming`;

console.log('Testing fixed bulk import parsing...');
const parsedData = parseBulkImportData(testData);

console.log('\nParsed websites:');
parsedData.forEach((website, index) => {
  console.log(`${index + 1}. ${website.title} -> Category: ${website.category}`);
});

console.log(`\nTotal websites parsed: ${parsedData.length}`);