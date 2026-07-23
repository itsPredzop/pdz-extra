import { createClient } from '@supabase/supabase-js';

// This function creates a Supabase client with the Service Role key
// It bypasses Row Level Security (RLS) and should ONLY be used in server environments
export function getSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Supabase URL or Service Role Key is missing. Using placeholders for build.');
  }

  const url = supabaseUrl || 'http://placeholder.supabase.co';
  const key = supabaseServiceKey || 'placeholder';

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
