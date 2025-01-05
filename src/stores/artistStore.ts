import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { ArtistProfile, SocialLink, Video } from '../lib/types/artist';

interface ArtistState {
  profile: ArtistProfile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<ArtistProfile>) => Promise<void>;
  addVideo: (video: Omit<Video, 'id'>) => Promise<void>;
  removeVideo: (videoId: string) => Promise<void>;
  updateSocialLinks: (links: SocialLink[]) => Promise<void>;
}

export const useArtistStore = create<ArtistState>((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      let { data, error } = await supabase
        .from('artist_profile')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, create initial profile
          const initialProfile = {
            name: '',
            image: '',
            bio: '',
            social_links: [],
            videos: [],
            user_id: user.id
          };

          const { data: newProfile, error: createError } = await supabase
            .from('artist_profile')
            .insert([initialProfile])
            .select()
            .single();

          if (createError) throw createError;
          data = newProfile;
        } else {
          throw error;
        }
      }

      set({ profile: data, loading: false });
    } catch (error) {
      console.error('Error fetching artist profile:', error);
      set({ error: 'Failed to load artist profile', loading: false });
    }
  },

  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const payload = {
        ...data,
        updated_at: new Date().toISOString()
      };

      const { data: updatedProfile, error } = await supabase
        .from('artist_profile')
        .update(payload)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      set({ profile: updatedProfile, loading: false });
    } catch (error) {
      console.error('Error updating artist profile:', error);
      set({ error: 'Failed to update profile', loading: false });
    }
  },

  addVideo: async (video) => {
    const profile = get().profile;
    if (!profile) return;

    const newVideo = { ...video, id: crypto.randomUUID() };
    const videos = [...(profile.videos || []), newVideo];

    await get().updateProfile({ videos });
  },

  removeVideo: async (videoId) => {
    const profile = get().profile;
    if (!profile) return;

    const videos = profile.videos.filter(v => v.id !== videoId);
    await get().updateProfile({ videos });
  },

  updateSocialLinks: async (links) => {
    const profile = get().profile;
    if (!profile) return;

    await get().updateProfile({ social_links: links });
  }
}));