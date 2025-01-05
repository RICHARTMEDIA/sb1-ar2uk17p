export const MUSIC_PLATFORMS = [
  'Spotify',
  'Apple Music',
  'YouTube',
  'Яндекс Музыка',
  'TikTok'
] as const;

export const PLATFORM_ICONS = {
  spotify: '/icons/spotify.svg',
  'apple music': '/icons/apple-music.svg',
  youtube: '/icons/youtube.svg',
  tiktok: '/icons/tiktok.svg'
} as const;

export type MusicPlatform = typeof MUSIC_PLATFORMS[number];

export function getPlatformIcon(platform: string): string | undefined {
  const key = platform.toLowerCase();
  return PLATFORM_ICONS[key as keyof typeof PLATFORM_ICONS];
}