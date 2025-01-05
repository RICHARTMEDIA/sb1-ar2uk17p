import { Music, Play } from 'lucide-react';

interface PlatformIconProps {
  platform: string;
  className?: string;
}

export function PlatformIcon({ platform, className = '' }: PlatformIconProps) {
  const normalizedPlatform = platform.toLowerCase();
  let iconClass = 'platform-icon-default';

  if (normalizedPlatform.includes('spotify')) {
    iconClass = 'platform-icon-spotify';
  } else if (normalizedPlatform.includes('apple')) {
    iconClass = 'platform-icon-apple';
  } else if (normalizedPlatform.includes('youtube')) {
    iconClass = 'platform-icon-youtube';
  } else if (normalizedPlatform.includes('tiktok')) {
    iconClass = 'platform-icon-tiktok';
  }

  const Icon = normalizedPlatform.includes('youtube') || normalizedPlatform.includes('tiktok')
    ? Play
    : Music;

  return <Icon className={`${className} ${iconClass}`} />;
}