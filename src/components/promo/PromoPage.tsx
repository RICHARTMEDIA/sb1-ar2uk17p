import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Header from '../Header/Header';
import ArtistHero from '../Hero/ArtistHero';
import LatestRelease from '../Release/LatestRelease';
import DistroLinks from '../Distribution/DistroLinks';
import OtherReleases from '../Release/OtherReleases';
import Subscribe from '../Subscribe/Subscribe';
import type { PromoPage as PromoPageType } from '../../lib/types/promo';

export default function PromoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<PromoPageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchPage() {
      try {
        const { data, error } = await supabase
          .from('promo_pages')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // Row-level security policy violation
            navigate('/admin/login', { 
              state: { returnUrl: `/promo/${id}` }
            });
            return;
          }
          throw error;
        }

        if (mounted) {
          setPageData(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching page:', err);
        if (mounted) {
          setError('Failed to load page');
          setLoading(false);
        }
      }
    }

    if (id) {
      fetchPage();
    }

    return () => {
      mounted = false;
    };
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !pageData) {
    return <div>Error: {error || 'Page not found'}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <ArtistHero imageUrl={pageData.banner_image} />
      <LatestRelease
        title={pageData.latest_release_title}
        description={pageData.latest_release_description}
        imageUrl={pageData.latest_release_image}
      />
      <DistroLinks links={pageData.platform_links} />
      <OtherReleases releases={pageData.other_releases} />
      <Subscribe />
    </div>
  );
}