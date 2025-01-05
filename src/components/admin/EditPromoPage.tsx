import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/Button';
import SaveStatus from '../ui/SaveStatus';
import ImageUpload from './ImageUpload';
import PlatformLinks from './PlatformLinks';
import ReleaseForm from './ReleaseForm';
import OtherReleases from './OtherReleases';
import SocialLinks from './SocialLinks';
import PromoPreview from './PromoPreview';
import { usePromoPageStore } from '../../stores/promoPageStore';
import { DEFAULT_SECTIONS } from '../../lib/constants/promo';
import type { SectionVisibility } from '../../lib/types/promo';

const DEFAULT_PAGE_DATA = {
  title: '',
  artist_name: '',
  banner_image: '',
  latest_release_title: '',
  latest_release_description: '',
  latest_release_image: '',
  platform_links: [],
  other_releases: [],
  social_links: [],
  sections_visible: DEFAULT_SECTIONS
};

export default function EditPromoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving' | 'error'>('saved');
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(DEFAULT_PAGE_DATA);
  const [originalData, setOriginalData] = useState(DEFAULT_PAGE_DATA);

  const { fetchPage, updatePage } = usePromoPageStore();

  useEffect(() => {
    async function loadPage() {
      if (!id) return;
      const data = await fetchPage(id);
      if (data) {
        const normalizedData = {
          ...DEFAULT_PAGE_DATA,
          ...data,
          sections_visible: {
            ...DEFAULT_SECTIONS,
            ...data.sections_visible
          }
        };
        setPageData(normalizedData);
        setOriginalData(normalizedData);
      }
      setLoading(false);
    }
    loadPage();
  }, [id, fetchPage]);

  const handleSectionVisibilityChange = (section: keyof SectionVisibility) => {
    setPageData(prev => ({
      ...prev,
      sections_visible: {
        ...prev.sections_visible,
        [section]: !prev.sections_visible[section]
      }
    }));
    setSaveStatus('unsaved');
  };

  const handleSave = async () => {
    if (!pageData.latest_release_title || !pageData.latest_release_image) {
      alert('Please fill in the release title and image');
      return;
    }

    setSaveStatus('saving');
    try {
      await updatePage(id!, pageData);
      setOriginalData(pageData);
      setSaveStatus('saved');
    } catch (error) {
      console.error('Failed to update:', error);
      setSaveStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Editor Panel */}
      <div className="w-2/3 max-h-[calc(100vh-6rem)] overflow-y-auto p-8">
        <div className="max-w-3xl space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-wider text-white">Edit Promo Page</h2>
              <SaveStatus status={saveStatus} />
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="md" 
                onClick={() => navigate(`/promo/${id}`)}
              >
                Exit Edit Mode
              </Button>
              <Button 
                variant="gradient" 
                size="md" 
                onClick={handleSave}
                disabled={saveStatus === 'saving' || saveStatus === 'saved'}
              >
                {saveStatus === 'saving' ? 'SAVING...' : 'SAVE CHANGES'}
              </Button>
            </div>
          </div>

          <section className="space-y-6">
            <h3 className="text-xl font-semibold tracking-wider text-gray-400">Artist Name</h3>
            <input
              type="text"
              value={pageData.artist_name}
              onChange={(e) => {
                setPageData({ ...pageData, artist_name: e.target.value });
                setSaveStatus('unsaved');
              }}
              placeholder="Enter artist name"
              className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
            />
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-semibold tracking-wider text-gray-400">Header Image</h3>
            <ImageUpload 
              label="Banner Image URL"
              description="Recommended size: 1920x1080px"
              initialValue={pageData.banner_image}
              onChange={(url) => {
                setPageData({ ...pageData, banner_image: url });
                setSaveStatus('unsaved');
              }}
            />
          </section>

          <ReleaseForm 
            visible={pageData.sections_visible.latestRelease}
            onVisibilityChange={() => handleSectionVisibilityChange('latestRelease')}
            initialData={{
              title: pageData.latest_release_title,
              description: pageData.latest_release_description,
              image: pageData.latest_release_image
            }}
            onChange={(data) => {
              setPageData({
                ...pageData,
                latest_release_title: data.title,
                latest_release_description: data.description,
                latest_release_image: data.image
              });
              setSaveStatus('unsaved');
            }}
          />
          
          <PlatformLinks 
            visible={pageData.sections_visible.platformLinks}
            onVisibilityChange={() => handleSectionVisibilityChange('platformLinks')}
            initialLinks={pageData.platform_links}
            onChange={(links) => {
              setPageData({ ...pageData, platform_links: links });
              setSaveStatus('unsaved');
            }}
          />
          
          <OtherReleases 
            visible={pageData.sections_visible.otherReleases}
            onVisibilityChange={() => handleSectionVisibilityChange('otherReleases')}
            initialReleases={pageData.other_releases}
            onChange={(releases) => {
              setPageData({ ...pageData, other_releases: releases });
              setSaveStatus('unsaved');
            }}
          />

          <SocialLinks
            visible={pageData.sections_visible.socialLinks}
            onVisibilityChange={() => handleSectionVisibilityChange('socialLinks')}
            initialLinks={pageData.social_links}
            onChange={(links) => {
              setPageData({ ...pageData, social_links: links });
              setSaveStatus('unsaved');
            }}
          />
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-1/3 fixed right-0 top-[4rem] bottom-0 overflow-y-auto bg-black">
        <PromoPreview
          artistName={pageData.artist_name}
          bannerImage={pageData.banner_image}
          latestRelease={{
            title: pageData.latest_release_title,
            description: pageData.latest_release_description,
            image: pageData.latest_release_image
          }}
          platformLinks={pageData.platform_links}
          otherReleases={pageData.other_releases}
          socialLinks={pageData.social_links}
          sectionsVisible={pageData.sections_visible}
        />
      </div>
    </div>
  );
}