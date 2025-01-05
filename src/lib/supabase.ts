import { createClient } from '@supabase/supabase-js';
import { config } from './config';

// Create the Supabase client with persistent session handling
export const supabase = createClient(
  config.supabase.url || '',
  config.supabase.anonKey || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage,
      storageKey: 'promo_auth_token'
    }
  }
);

// Helper to check if Supabase is configured
export function isSupabaseConfigured() {
  return Boolean(config.supabase.url && config.supabase.anonKey);
}