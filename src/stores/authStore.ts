import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getAuthErrorMessage } from '../lib/auth/errors';
import { sanitizeCredentials } from '../lib/auth/validation';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: false,
  error: null,

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    
    if (!isSupabaseConfigured()) {
      set({ loading: false, error: 'Authentication is not configured properly' });
      return;
    }

    try {
      const { email: cleanEmail, password: cleanPassword } = sanitizeCredentials(email, password);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword
      });

      if (error) {
        set({ 
          loading: false, 
          error: getAuthErrorMessage(error)
        });
        return;
      }

      if (!data?.user || !data?.session) {
        set({ loading: false, error: 'Login failed - no user data' });
        return;
      }

      set({ 
        user: data.user, 
        session: data.session,
        loading: false, 
        error: null 
      });
    } catch (error) {
      console.error('Login error:', error);
      set({ 
        loading: false, 
        error: getAuthErrorMessage(error)
      });
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    try {
      await supabase.auth.signOut();
      set({ user: null, session: null, loading: false });
    } catch (error) {
      console.error('Signout error:', error);
      set({ loading: false, error: 'Failed to sign out' });
    }
  },

  checkUser: async () => {
    set({ loading: true });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: { user } } = await supabase.auth.getUser();
        set({ user, session, loading: false, error: null });
      } else {
        set({ user: null, session: null, loading: false, error: null });
      }
    } catch (error) {
      console.error('Check user error:', error);
      set({ user: null, session: null, loading: false, error: null });
    }
  },

  clearError: () => set({ error: null })
}));

// Set up auth state change listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    useAuthStore.setState({ session });
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({ user: null, session: null });
  }
});