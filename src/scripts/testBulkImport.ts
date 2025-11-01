// Test script for bulk import functionality
import { createClient } from '@supabase/supabase-js';
import { parseBulkImportData } from './enhancedBulkImport';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

// Sample bulk import data
const sampleData = `ComicK - https://comick.app
A free manga and manhwa reader with a clean interface and community-uploaded translations.
MangaDex - https://mangadex.org
A fan-driven platform hosting manga scans in multiple languages, known for its vast library and active community.
MangaKatana - https://mangakatana.com
A simple and fast manga reader with a large collection of manga series.
MangaPark - https://mangapark.net
A manga reading platform with a wide variety of manga genres and languages.`;

async function testBulkImport() {
  console.log('Testing bulk import parsing...');
  
  const parsedData = parseBulkImportData(sampleData);
  console.log('Parsed data:', parsedData);
  
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
  
  console.log('Testing bulk import with Supabase...');
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
  
  console.log(`Bulk import completed. Success: ${successCount}, Failed: ${failedCount}`);
}

// Run the test
testBulkImport();