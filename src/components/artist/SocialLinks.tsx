import { Instagram, Youtube, Twitter, Globe } from 'lucide-react';
import type { SocialLink } from '../../lib/types/artist';

interface SocialLinksProps {
  links: SocialLink[];
}

const ICON_MAP = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  website: Globe,
  default: Globe
};

export default function SocialLinks({ links }: SocialLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Connect</h2>
        <div className="flex flex-wrap gap-6">
          {links.map((link) => {
            const IconComponent = ICON_MAP[link.name.toLowerCase() as keyof typeof ICON_MAP] || ICON_MAP.default;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <IconComponent className="w-6 h-6" />
                <span className="text-lg">{link.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}