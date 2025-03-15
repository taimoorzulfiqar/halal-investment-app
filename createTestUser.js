const { createClient } = require('@supabase/supabase-js');

// Initialize the Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
  const { user, error } = await supabase.auth.signUp({
    email: 'testuser@example.com',
    password: 'TestPassword123'
  });

  if (error) {
    console.error('Error creating test user:', error.message);
  } else {
    console.log('Test user created:', user);
  }
}

createTestUser();
