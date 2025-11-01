import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function verifyTables() {
  console.log('Verifying Supabase tables...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Test websites table
    console.log('\n1. Testing websites table...');
    try {
      const { data: websitesData, error: websitesError } = await supabase
        .from('websites')
        .select('id, title')
        .limit(1);
      
      if (websitesError) {
        console.error('❌ Error accessing websites table:', websitesError.message);
        console.log('   Please create the websites table using the SQL commands in CREATE_TABLES.sql');
      } else {
        console.log('✅ Websites table is accessible');
        console.log('   Sample data:', websitesData);
      }
    } catch (error) {
      console.error('❌ Exception accessing websites table:', (error as Error).message);
    }
    
    // Test categories table
    console.log('\n2. Testing categories table...');
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('id, name')
        .limit(1);
      
      if (categoriesError) {
        console.error('❌ Error accessing categories table:', categoriesError.message);
        console.log('   Please create the categories table using the SQL commands in CREATE_TABLES.sql');
      } else {
        console.log('✅ Categories table is accessible');
        console.log('   Sample data:', categoriesData);
      }
    } catch (error) {
      console.error('❌ Exception accessing categories table:', (error as Error).message);
    }
    
    // Test inserting a record
    console.log('\n3. Testing data insertion...');
    try {
      const testWebsite = {
        title: 'Test Website',
        description: 'This is a test website for verification',
        url: 'https://test-example.com',
        icon: '🧪',
        category: 'dev-tools',
        tags: ['test', 'verification'],
        featured: false,
        popular: false,
        clicks: 0,
        rating: 5.0,
        dateAdded: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      const { data: insertData, error: insertError } = await supabase
        .from('websites')
        .insert(testWebsite)
        .select();
      
      if (insertError) {
        console.error('❌ Error inserting test record:', insertError.message);
        console.log('   This might be due to missing tables or incorrect permissions');
      } else {
        console.log('✅ Successfully inserted test record');
        console.log('   Inserted data:', insertData);
        
        // Clean up test record
        if (insertData && insertData[0]) {
          const { error: deleteError } = await supabase
            .from('websites')
            .delete()
            .eq('id', insertData[0].id);
          
          if (deleteError) {
            console.error('❌ Error cleaning up test record:', deleteError.message);
          } else {
            console.log('✅ Successfully cleaned up test record');
          }
        }
      }
    } catch (error) {
      console.error('❌ Exception during insertion test:', (error as Error).message);
    }
    
    console.log('\n--- Verification Complete ---');
    
  } catch (error) {
    console.error('❌ Error during verification:', error);
  }
}

// Run the verification
verifyTables();