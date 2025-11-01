// Test script for bulk import functionality with new data
import { createClient } from '@supabase/supabase-js';
import { parseBulkImportData } from './enhancedBulkImport';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

// Sample bulk import data with new websites
const sampleData = `TestManga - https://testmanga.example.com
A test manga reader platform for testing purposes.
TestManhwa - https://testmanhwa.example.com
A test manhwa reader platform for testing purposes.`;

async function testBulkImport() {
  console.log('Testing bulk import parsing...');
  
  const parsedData = parseBulkImportData(sampleData);
  console.log('Parsed data:', parsedData);
  
  console.log('Creating Supabase client...');
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  
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

// Run the test
testBulkImport();