import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Header from '../Header/Header';
import ArtistHero from '../Hero/ArtistHero';
import VideoGallery from './VideoGallery';
import SocialLinks from './SocialLinks';
import type { ArtistProfile as ArtistProfileType } from '../../lib/types/artist';

export default function ArtistProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ArtistProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data, error } = await supabase
          .from('artist_profile')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProfile(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching artist profile:', err);
        setError('Failed to load artist profile');
        setLoading(false);
      }
    }

    if (id) {
      fetchProfile();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error || !profile) return <div>Error: {error || 'Profile not found'}</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <ArtistHero imageUrl={profile.image} title={profile.name} />
      
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">About</h2>
          <p className="text-lg text-gray-300 whitespace-pre-line">{profile.bio}</p>
        </div>
      </section>

      <VideoGallery videos={profile.videos} />
      <SocialLinks links={profile.social_links} />
    </div>
  );
}