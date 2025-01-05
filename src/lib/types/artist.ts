export type SocialPlatform = 'Instagram' | 'TikTok' | 'YouTube' | 'Telegram';

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
}

export interface Release {
  id: string;
  title: string;
  description?: string;
  image: string;
  url?: string;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  status: ProductStatus;
}

export type ProductStatus = 'sale' | 'soldout' | 'hidden';

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

export interface SectionVisibility {
  latestRelease: boolean;
  otherReleases: boolean;
  videos: boolean;
  socialLinks: boolean;
  products: boolean;
  gallery: boolean;
}

export interface ArtistProfile {
  id: string;
  name: string;
  bio: string;
  image: string;
  sections_visible: SectionVisibility;
  latest_release: Release;
  other_releases: Release[];
  videos: Video[];
  social_links: SocialLink[];
  products: Product[];
  gallery: GalleryImage[];
}