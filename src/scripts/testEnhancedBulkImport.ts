// Test script for enhanced bulk import functionality
import { parseBulkImportData } from './enhancedBulkImport';

// Test data with various categories
const testData = `ChatGPT - https://chat.openai.com
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

console.log('Testing enhanced bulk import parsing...');
const parsedData = parseBulkImportData(testData);

console.log('Parsed websites:');
parsedData.forEach((website, index) => {
  console.log(`${index + 1}. ${website.title} -> Category: ${website.category}`);
});

// Show category distribution
const categoryCount: Record<string, number> = {};
parsedData.forEach(website => {
  categoryCount[website.category] = (categoryCount[website.category] || 0) + 1;
});

console.log('\nCategory distribution:');
Object.entries(categoryCount).forEach(([category, count]) => {
  console.log(`  ${category}: ${count}`);
});

console.log('\nAll parsed data:');
console.log(JSON.stringify(parsedData, null, 2));