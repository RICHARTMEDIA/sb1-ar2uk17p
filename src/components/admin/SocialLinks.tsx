import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import Toggle from '../ui/Toggle';
import type { SocialLink } from '../../lib/types/promo';

interface SocialLinksProps {
  onChange: (links: SocialLink[]) => void;
}

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'Telegram', 'Twitter', 'Facebook'] as const;

export default function SocialLinks({ onChange }: SocialLinksProps) {
  const [links, setLinks] = useState<SocialLink[]>([]);

  const addLink = () => {
    const newLinks = [...links, { 
      id: crypto.randomUUID(),
      platform: '',
      url: ''
    }];
    setLinks(newLinks);
    onChange(newLinks);
  };

  const removeLink = (id: string) => {
    const newLinks = links.filter(link => link.id !== id);
    setLinks(newLinks);
    onChange(newLinks);
  };

  const updateLink = (id: string, field: keyof SocialLink, value: string) => {
    const newLinks = links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    setLinks(newLinks);
    onChange(newLinks);
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-wider text-gray-400">Social Links</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={addLink}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Link
        </Button>
      </div>

      <div className="space-y-4">
        {links.map((link) => (
          <div 
            key={link.id}
            className="grid grid-cols-[1fr,1fr,auto] gap-4 items-start"
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
    </section>
  );
}