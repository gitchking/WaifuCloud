import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function testConnection() {
  console.log('Testing Supabase connection...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Test basic connection by selecting current timestamp from websites table
    console.log('Testing basic connection...');
    const { data: timeData, error: timeError } = await supabase
      .from('websites')
      .select('id')
      .limit(1);
    
    if (timeError) {
      console.log('❌ Basic connection test failed:', timeError.message);
    } else {
      console.log('✅ Basic connection successful');
    }
    
    // Test websites table access
    console.log('\nTesting websites table access...');
    const { data: websitesData, error: websitesError } = await supabase
      .from('websites')
      .select('id, title')
      .limit(3);
    
    if (websitesError) {
      console.log('❌ Websites table access failed:', websitesError.message);
    } else {
      console.log('✅ Websites table accessible');
      console.log('Sample websites:', websitesData);
    }
    
    // Test categories table access
    console.log('\nTesting categories table access...');
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name')
      .limit(3);
    
    if (categoriesError) {
      console.log('❌ Categories table access failed:', categoriesError.message);
    } else {
      console.log('✅ Categories table accessible');
      console.log('Sample categories:', categoriesData);
    }
    
    // Test inserting a record
    console.log('\nTesting data insertion...');
    const testRecord = {
      title: 'Connection Test Website',
      description: 'Test website for connection verification',
      url: 'https://test-connection-example.com',
      icon: '🧪',
      category: 'dev-tools',
      tags: ['test', 'connection'],
      featured: false,
      popular: false,
      clicks: 0,
      rating: 5.0,
      dateadded: new Date().toISOString().split('T')[0],
      lastupdated: new Date().toISOString().split('T')[0]
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('websites')
      .insert(testRecord)
      .select();
    
    if (insertError) {
      console.log('❌ Data insertion test failed:', insertError.message);
    } else {
      console.log('✅ Data insertion successful');
      
      // Clean up by deleting the test record
      if (insertData && insertData[0]) {
        const { error: deleteError } = await supabase
          .from('websites')
          .delete()
          .eq('id', insertData[0].id);
        
        if (deleteError) {
          console.log('⚠️  Warning: Could not clean up test record:', deleteError.message);
        } else {
          console.log('✅ Test record cleaned up successfully');
        }
      }
    }
    
    console.log('\n--- Connection Test Complete ---');
    
  } catch (error) {
    console.error('❌ Error during connection test:', (error as Error).message);
  }
}

// Run the test
testConnection();