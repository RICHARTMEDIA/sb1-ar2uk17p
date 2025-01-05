import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { PromoPage } from '../lib/types/promo';

interface PromoPageState {
  pages: PromoPage[];
  loading: boolean;
  error: string | null;
  fetchPages: () => Promise<void>;
  fetchPage: (id: string) => Promise<PromoPage | null>;
  createPage: (pageData: Omit<PromoPage, 'id' | 'created_at' | 'is_published'>) => Promise<string>;
  updatePage: (id: string, pageData: Partial<PromoPage>) => Promise<void>;
  deletePage: (id: string) => Promise<void>;
  togglePublish: (id: string) => Promise<void>;
}

export const usePromoPageStore = create<PromoPageState>((set, get) => ({
  pages: [],
  loading: false,
  error: null,

  fetchPages: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('promo_pages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ pages: data || [], loading: false });
    } catch (error) {
      console.error('Error fetching pages:', error);
      set({ error: 'Failed to fetch pages', loading: false });
    }
  },

  fetchPage: async (id) => {
    try {
      const { data, error } = await supabase
        .from('promo_pages')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  },

  createPage: async (pageData) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('promo_pages')
        .insert([{ ...pageData, user_id: user.id, is_published: false }])
        .select()
        .single();

      if (error) throw error;
      
      const pages = get().pages;
      set({ pages: [data, ...pages], loading: false });
      
      return data.id;
    } catch (error) {
      console.error('Error creating page:', error);
      set({ error: 'Failed to create page', loading: false });
      throw error;
    }
  },

  updatePage: async (id, pageData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('promo_pages')
        .update(pageData)
        .eq('id', id);

      if (error) throw error;

      // Update local state
      const pages = get().pages.map(page => 
        page.id === id ? { ...page, ...pageData } : page
      );
      set({ pages, loading: false });
    } catch (error) {
      console.error('Error updating page:', error);
      set({ error: 'Failed to update page', loading: false });
      throw error;
    }
  },

  deletePage: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('promo_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      const pages = get().pages.filter(page => page.id !== id);
      set({ pages, loading: false });
    } catch (error) {
      console.error('Error deleting page:', error);
      set({ error: 'Failed to delete page', loading: false });
    }
  },

  togglePublish: async (id) => {
    try {
      const page = get().pages.find(p => p.id === id);
      if (!page) return;

      const { error } = await supabase
        .from('promo_pages')
        .update({ is_published: !page.is_published })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      const pages = get().pages.map(p =>
        p.id === id ? { ...p, is_published: !p.is_published } : p
      );
      set({ pages });
    } catch (error) {
      console.error('Error toggling publish state:', error);
      set({ error: 'Failed to update publish state' });
    }
  },
}));