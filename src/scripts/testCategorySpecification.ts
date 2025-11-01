// Test script for category specification in bulk import
import { parseBulkImportData } from './enhancedBulkImport';

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

console.log('Testing category specification in bulk import...');
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

// Verify specific cases
console.log('\nVerification:');
const chatGpt = parsedData.find(w => w.title === 'ChatGPT');
console.log(`ChatGPT category: ${chatGpt?.category} (expected: ai-tools) - ${chatGpt?.category === 'ai-tools' ? 'PASS' : 'FAIL'}`);

const mangaDex = parsedData.find(w => w.title === 'MangaDex');
console.log(`MangaDex category: ${mangaDex?.category} (expected: manga-readers) - ${mangaDex?.category === 'manga-readers' ? 'PASS' : 'FAIL'}`);

const autoDetect = parsedData.find(w => w.title === 'Test Auto-detect');
console.log(`Auto-detect category: ${autoDetect?.category} (expected: manga-readers) - ${autoDetect?.category === 'manga-readers' ? 'PASS' : 'FAIL'}`);

const noDesc = parsedData.find(w => w.title === 'Test No Description');
console.log(`No description handling: ${noDesc ? 'PASS' : 'FAIL'}`);

const manualOverride = parsedData.find(w => w.title === 'Test Manual Override');
console.log(`Manual override category: ${manualOverride?.category} (expected: games) - ${manualOverride?.category === 'games' ? 'PASS' : 'FAIL'}`);

console.log('\nAll parsed data:');
console.log(JSON.stringify(parsedData, null, 2));