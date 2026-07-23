import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// This is the client for browser and generic safe access.
// In Next.js App Router, ensure environment variables are properly defined.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
