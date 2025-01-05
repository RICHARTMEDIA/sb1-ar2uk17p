export interface SectionVisibility {
  latestRelease: boolean;
  platformLinks: boolean;
  otherReleases: boolean;
  socialLinks: boolean;
}

export interface PlatformLink {
  id: string;
  name: string;
  url: string;
  enabled?: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface Release {
  id: string;
  title: string;
  image: string;
  url?: string;
}

export interface ReleaseFormData {
  title: string;
  description: string;
  image: string;
}

export interface PromoPage {
  id: string;
  title: string;
  artist_name: string;
  banner_image: string;
  latest_release_title: string;
  latest_release_description: string;
  latest_release_image: string;
  platform_links: PlatformLink[];
  other_releases: Release[];
  social_links: SocialLink[];
  sections_visible: SectionVisibility;
  created_at: string;
  is_published: boolean;
}