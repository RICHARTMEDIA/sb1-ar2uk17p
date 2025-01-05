import type { SectionVisibility, Release } from '../types/artist';

export const DEFAULT_SECTIONS: SectionVisibility = {
  latestRelease: true,
  otherReleases: true,
  videos: true,
  socialLinks: true,
  products: true,
  gallery: true
};

export const DEFAULT_RELEASE: Release = {
  id: crypto.randomUUID(),
  title: '',
  description: '',
  image: '',
  url: ''
};