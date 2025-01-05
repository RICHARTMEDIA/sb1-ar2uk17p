import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Toggle } from '../../ui/Toggle';
import SectionHeader from './SectionHeader';
import type { SocialLink } from '../../../lib/types/promo';

interface SocialLinksProps {
  visible: boolean;
  initialLinks?: SocialLink[];
  onVisibilityChange: () => void;
  onChange: (links: SocialLink[]) => void;
}

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'Telegram'] as const;

export default function SocialLinks({
  visible,
  initialLinks = [],
  onVisibilityChange,
  onChange
}: SocialLinksProps) {
  const addLink = () => {
    onChange([...initialLinks, {
      id: crypto.randomUUID(),
      platform: '',
      url: ''
    }]);
  };

  const removeLink = (id: string) => {
    onChange(initialLinks.filter(link => link.id !== id));
  };

  const updateLink = (id: string, field: keyof SocialLink, value: string) => {
    onChange(initialLinks.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Social Links"
        visible={visible}
        onVisibilityChange={onVisibilityChange}
      />

      <div className={visible ? 'space-y-6' : 'hidden'}>
        <div className="space-y-4">
          {initialLinks.map((link) => (
            <div 
              key={link.id}
              className="grid grid-cols-[1fr,1fr,auto] gap-4 items-start bg-zinc-900/30 p-4 rounded-lg"
            >
              <select
                value={link.platform}
                onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
              >
                <option value="">Select Platform</option>
                {PLATFORMS.map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
                <option value="custom">Custom</option>
              </select>

              <input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                placeholder="Profile URL"
                className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
              />

              <Button
                variant="outline"
                size="sm"
                onClick={() => removeLink(link.id)}
                className="text-red-500 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          size="sm"
          onClick={addLink}
          className="flex items-center gap-1.5 text-xs whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Link
        </Button>
      </div>
    </section>
  );
}