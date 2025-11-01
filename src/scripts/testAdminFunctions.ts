import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
config({ path: resolve(__dirname, '../../.env') });

// Set environment variables for the Supabase service
process.env.VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://cdpozvboxxzeubudyenc.supabase.co';
process.env.VITE_SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcG96dmJveHh6ZXVidWR5ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mjc1NzcsImV4cCI6MjA3MzAwMzU3N30.uouhj6nzE3q0-wLBmEsCNRMfEhRgH-S6-FyDqUqH8rU';

async function testAdminFunctions() {
  console.log('=== Testing Admin Functions ===');
  
  try {
    // Dynamically import the supabase service
    const { addWebsite, updateWebsite, deleteWebsite } = await import('../services/supabase');
    
    console.log('1. Testing addWebsite function...');
    const testWebsite = {
      title: 'Test Website',
      description: 'This is a test website for admin functionality',
      url: 'https://test-admin-example.com',
      icon: '🧪',
      category: 'dev-tools',
      tags: ['test', 'admin'],
      featured: false,
      popular: false,
      clicks: 0,
      rating: 5.0,
      dateAdded: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    console.log('   Adding test website...');
    const addedWebsite = await addWebsite(testWebsite);
    
    if (addedWebsite) {
      console.log('   ✅ Website added successfully');
      console.log('   Added website ID:', addedWebsite.id);
      
      // Test update
      console.log('\n2. Testing updateWebsite function...');
      const updateResult = await updateWebsite(addedWebsite.id, {
        title: 'Updated Test Website',
        featured: true
      });
      
      if (updateResult) {
        console.log('   ✅ Website updated successfully');
      } else {
        console.log('   ❌ Failed to update website');
      }
      
      // Test delete
      console.log('\n3. Testing deleteWebsite function...');
      const deleteResult = await deleteWebsite(addedWebsite.id);
      
      if (deleteResult) {
        console.log('   ✅ Website deleted successfully');
      } else {
        console.log('   ❌ Failed to delete website');
      }
    } else {
      console.log('   ❌ Failed to add website - this indicates a database issue');
      console.log('   Make sure you have created the tables in Supabase');
    }
    
  } catch (error) {
    console.error('❌ Error testing admin functions:', error);
    console.log('\nThis error likely means the Supabase tables have not been created yet.');
    console.log('Please follow the table creation instructions in ADMIN_FIX_GUIDE.md');
  }
}

// Run the test
testAdminFunctions();