import { Instagram, Youtube, Globe, MessageCircle } from 'lucide-react';
import type { SocialPlatform } from '../../lib/types/artist';

interface SocialIconProps {
  platform: SocialPlatform | string;
  className?: string;
}

export function SocialIcon({ platform, className = '' }: SocialIconProps) {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return <Instagram className={className} />;
    case 'youtube':
      return <Youtube className={className} />;
    case 'tiktok':
      // Using a more generic icon since TikTok isn't available in lucide
      return (
        <svg 
          viewBox="0 0 24 24" 
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
    case 'telegram':
      return <MessageCircle className={className} />;
    default:
      return <Globe className={className} />;
  }
}