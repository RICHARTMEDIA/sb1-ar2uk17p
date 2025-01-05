import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import SaveStatus from '../ui/SaveStatus';
import ImageUpload from './ImageUpload';
import PlatformLinks from './PlatformLinks';
import ReleaseForm from './ReleaseForm';
import OtherReleases from './OtherReleases';
import SocialLinks from './SocialLinks';
import PromoPreview from './PromoPreview';
import { usePromoPageStore } from '../../stores/promoPageStore';
import type { PlatformLink, Release, ReleaseFormData, SocialLink } from '../../lib/types/promo';

export default function Dashboard() {
  const navigate = useNavigate();
  const createPage = usePromoPageStore((state) => state.createPage);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving' | 'error'>('saved');
  const [artistName, setArtistName] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [latestRelease, setLatestRelease] = useState<ReleaseFormData>({
    title: '',
    description: '',
    image: ''
  });
  const [platformLinks, setPlatformLinks] = useState<PlatformLink[]>([]);
  const [otherReleases, setOtherReleases] = useState<Release[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  const handleSave = async () => {
    if (!latestRelease.title || !latestRelease.image) {
      alert('Please fill in the release title and image');
      return;
    }

    setSaveStatus('saving');
    try {
      const pageId = await createPage({
        title: latestRelease.title,
        artist_name: artistName,
        banner_image: bannerImage,
        latest_release_title: latestRelease.title,
        latest_release_description: latestRelease.description,
        latest_release_image: latestRelease.image,
        platform_links: platformLinks,
        other_releases: otherReleases,
        social_links: socialLinks
      });
      
      setSaveStatus('saved');
      navigate(`/promo/${pageId}`);
    } catch (error) {
      console.error('Failed to save:', error);
      setSaveStatus('error');
    }
  };

  return (
    <div className="flex">
      {/* Editor Panel */}
      <div className="w-2/3 max-h-[calc(100vh-6rem)] overflow-y-auto p-8">
        <div className="max-w-3xl space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-wider text-white">Create Promo Page</h2>
              <SaveStatus status={saveStatus} />
            </div>
            <Button 
              variant="gradient" 
              size="md" 
              onClick={handleSave}
              disabled={saveStatus === 'saving' || !latestRelease.title || !latestRelease.image}
            >
              {saveStatus === 'saving' ? 'SAVING...' : 'SAVE CHANGES'}
            </Button>
          </div>

          <section className="space-y-6">
            <h3 className="text-xl font-semibold tracking-wider text-gray-400">Artist Name</h3>
            <input
              type="text"
              value={artistName}
              onChange={(e) => {
                setArtistName(e.target.value);
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
              onChange={(url) => {
                setBannerImage(url);
                setSaveStatus('unsaved');
              }}
            />
          </section>

          <ReleaseForm 
            onChange={(data) => {
              setLatestRelease(data);
              setSaveStatus('unsaved');
            }}
          />
          
          <PlatformLinks 
            onChange={(links) => {
              setPlatformLinks(links);
              setSaveStatus('unsaved');
            }}
          />
          
          <OtherReleases 
            onChange={(releases) => {
              setOtherReleases(releases);
              setSaveStatus('unsaved');
            }}
          />

          <SocialLinks 
            onChange={(links) => {
              setSocialLinks(links);
              setSaveStatus('unsaved');
            }}
          />
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-1/3 fixed right-0 top-[4rem] bottom-0 overflow-y-auto bg-black">
        <PromoPreview
          artistName={artistName}
          bannerImage={bannerImage}
          latestRelease={latestRelease}
          platformLinks={platformLinks}
          otherReleases={otherReleases}
          socialLinks={socialLinks}
        />
      </div>
    </div>
  );
}