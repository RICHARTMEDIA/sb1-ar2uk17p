import { useState, useEffect } from 'react';
import { useArtistStore } from '../../stores/artistStore';
import { Button } from '../ui/Button';
import SaveStatus from '../ui/SaveStatus';
import BasicInfo from './sections/BasicInfo';
import LatestRelease from './sections/LatestRelease';
import OtherReleases from './sections/OtherReleases';
import Videos from './sections/Videos';
import SocialLinks from './sections/SocialLinks';
import Products from './sections/Products';
import Gallery from './sections/Gallery';
import ArtistPreview from './ArtistPreview';
import PreviewActions from './PreviewActions';
import { DEFAULT_SECTIONS, DEFAULT_RELEASE } from '../../lib/constants/artist';
import type { SectionVisibility, Release } from '../../lib/types/artist';

type SaveState = 'saved' | 'unsaved' | 'saving' | 'error';

export default function ArtistProfileEditor() {
  const { profile, loading, error, fetchProfile, updateProfile } = useArtistStore();
  const [saveStatus, setSaveStatus] = useState<SaveState>('saved');
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    bio: '',
    sections_visible: DEFAULT_SECTIONS,
    latest_release: DEFAULT_RELEASE,
    other_releases: [],
    videos: [],
    social_links: [],
    products: [],
    gallery: []
  });

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        image: profile.image,
        bio: profile.bio,
        sections_visible: profile.sections_visible || DEFAULT_SECTIONS,
        latest_release: profile.latest_release || DEFAULT_RELEASE,
        other_releases: profile.other_releases || [],
        videos: profile.videos || [],
        social_links: profile.social_links || [],
        products: profile.products || [],
        gallery: profile.gallery || []
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await updateProfile(formData);
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
              <h2 className="text-2xl font-bold tracking-wider text-white">Artist Profile</h2>
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

          <LatestRelease
            visible={formData.sections_visible.latestRelease}
            release={formData.latest_release}
            onVisibilityChange={() => {
              setFormData(prev => ({
                ...prev,
                sections_visible: {
                  ...prev.sections_visible,
                  latestRelease: !prev.sections_visible.latestRelease
                }
              }));
              setSaveStatus('unsaved');
            }}
            onChange={(field, value) => {
              setFormData(prev => ({
                ...prev,
                latest_release: { ...prev.latest_release, [field]: value }
              }));
              setSaveStatus('unsaved');
            }}
          />

          <OtherReleases
            visible={formData.sections_visible.otherReleases}
            releases={formData.other_releases}
            onVisibilityChange={() => {
              setFormData(prev => ({
                ...prev,
                sections_visible: {
                  ...prev.sections_visible,
                  otherReleases: !prev.sections_visible.otherReleases
                }
              }));
              setSaveStatus('unsaved');
            }}
            onChange={(releases) => {
              setFormData(prev => ({ ...prev, other_releases: releases }));
              setSaveStatus('unsaved');
            }}
          />

          <Videos
            visible={formData.sections_visible.videos}
            videos={formData.videos}
            onVisibilityChange={() => {
              setFormData(prev => ({
                ...prev,
                sections_visible: {
                  ...prev.sections_visible,
                  videos: !prev.sections_visible.videos
                }
              }));
              setSaveStatus('unsaved');
            }}
            onChange={(videos) => {
              setFormData(prev => ({ ...prev, videos }));
              setSaveStatus('unsaved');
            }}
          />

          <SocialLinks
            visible={formData.sections_visible.socialLinks}
            links={formData.social_links}
            onVisibilityChange={() => {
              setFormData(prev => ({
                ...prev,
                sections_visible: {
                  ...prev.sections_visible,
                  socialLinks: !prev.sections_visible.socialLinks
                }
              }));
              setSaveStatus('unsaved');
            }}
            onChange={(links) => {
              setFormData(prev => ({ ...prev, social_links: links }));
              setSaveStatus('unsaved');
            }}
          />

          <Products
            visible={formData.sections_visible.products}
            products={formData.products}
            onVisibilityChange={() => {
              setFormData(prev => ({
                ...prev,
                sections_visible: {
                  ...prev.sections_visible,
                  products: !prev.sections_visible.products
                }
              }));
              setSaveStatus('unsaved');
            }}
            onChange={(products) => {
              setFormData(prev => ({ ...prev, products }));
              setSaveStatus('unsaved');
            }}
          />

          <Gallery
            visible={formData.sections_visible.gallery}
            images={formData.gallery}
            onVisibilityChange={() => {
              setFormData(prev => ({
                ...prev,
                sections_visible: {
                  ...prev.sections_visible,
                  gallery: !prev.sections_visible.gallery
                }
              }));
              setSaveStatus('unsaved');
            }}
            onChange={(images) => {
              setFormData(prev => ({ ...prev, gallery: images }));
              setSaveStatus('unsaved');
            }}
          />
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-1/3 fixed right-0 top-[4rem] bottom-0 overflow-y-auto bg-black">
        <ArtistPreview {...formData} />
      </div>
    </div>
  );
}