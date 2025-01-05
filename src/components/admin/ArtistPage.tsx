import { useEffect, useState } from 'react';
import { useArtistStore } from '../../stores/artistStore';
import { Button } from '../ui/Button';
import SaveStatus from './SaveStatus';
import BasicInfo from './sections/BasicInfo';
import SectionToggles from './sections/SectionToggles';
import VideoSection from './sections/VideoSection';
import ArtistPreview from './ArtistPreview';
import PreviewActions from './PreviewActions';
import type { SectionVisibility } from '../../lib/types/artist';

type SaveState = 'saved' | 'unsaved' | 'saving' | 'error';

const DEFAULT_SECTIONS: SectionVisibility = {
  latestRelease: true,
  otherReleases: true,
  videos: true,
  socialLinks: true,
  products: true
};

export default function ArtistPage() {
  const { profile, loading, error, fetchProfile, updateProfile } = useArtistStore();
  const [saveStatus, setSaveStatus] = useState<SaveState>('saved');
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    bio: '',
    social_links: [],
    videos: []
  });
  const [sectionsVisible, setSectionsVisible] = useState<SectionVisibility>(DEFAULT_SECTIONS);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        image: profile.image,
        bio: profile.bio,
        social_links: profile.social_links,
        videos: profile.videos
      });
      setSectionsVisible(profile.sections_visible || DEFAULT_SECTIONS);
    }
  }, [profile]);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await updateProfile({
        ...formData,
        sections_visible: sectionsVisible
      });
      setSaveStatus('saved');
    } catch (error) {
      console.error('Failed to save:', error);
      setSaveStatus('error');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      {/* Editor Panel */}
      <div className="w-2/3 max-h-[calc(100vh-6rem)] overflow-y-auto p-8">
        <div className="max-w-3xl space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-wider">Artist Profile</h2>
              <SaveStatus status={saveStatus} />
            </div>
            <div className="flex gap-2">
              <PreviewActions />
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

          <BasicInfo
            name={formData.name}
            bio={formData.bio}
            image={formData.image}
            onNameChange={(e) => {
              setFormData(prev => ({ ...prev, name: e.target.value }));
              setSaveStatus('unsaved');
            }}
            onBioChange={(e) => {
              setFormData(prev => ({ ...prev, bio: e.target.value }));
              setSaveStatus('unsaved');
            }}
            onImageChange={(url) => {
              setFormData(prev => ({ ...prev, image: url }));
              setSaveStatus('unsaved');
            }}
          />

          <SectionToggles
            sections={sectionsVisible}
            onChange={(key) => {
              setSectionsVisible(prev => ({
                ...prev,
                [key]: !prev[key]
              }));
              setSaveStatus('unsaved');
            }}
          />
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-1/3 fixed right-0 top-[4rem] bottom-0 overflow-y-auto bg-black">
        <ArtistPreview {...formData} sections_visible={sectionsVisible} />
      </div>
    </div>
  );
}