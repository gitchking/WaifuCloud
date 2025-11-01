import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function postSetupCheck() {
  console.log('Post-setup verification...');
  console.log('Using URL:', SUPABASE_URL);
  
  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    console.log('\n1. Checking websites table structure...');
    const { data: websitesColumns, error: websitesError } = await supabase
      .from('websites')
      .select('*')
      .limit(1);
    
    if (websitesError) {
      console.log('❌ Websites table access failed:', websitesError.message);
      return false;
    } else {
      console.log('✅ Websites table accessible');
      console.log('   Columns:', Object.keys(websitesColumns[0] || {}));
    }
    
    console.log('\n2. Checking categories table structure...');
    const { data: categoriesColumns, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(1);
    
    if (categoriesError) {
      console.log('❌ Categories table access failed:', categoriesError.message);
      return false;
    } else {
      console.log('✅ Categories table accessible');
      console.log('   Columns:', Object.keys(categoriesColumns[0] || {}));
    }
    
    console.log('\n🎉 Schema check completed! Your Supabase setup is working.');
    console.log('\nYou can now:');
    console.log('1. Restart your development server');
    console.log('2. Access the admin panel');
    console.log('3. Add, edit, and delete card links without issues');
    
    return true;
    
  } catch (error) {
    console.error('❌ Error during post-setup check:', (error as Error).message);
    return false;
  }
}

// Run the check
postSetupCheck().then(success => {
  if (!success) {
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure you followed the TABLE_SETUP_INSTRUCTIONS.md guide');
    console.log('2. Verify your Supabase credentials in the .env file');
    console.log('3. Check that you ran the SQL commands in the Supabase dashboard');
    console.log('4. Make sure you clicked "Run" after pasting the SQL commands');
  }
});