import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import SectionHeader from './sections/SectionHeader';
import type { PlatformLink } from '../../lib/types/promo';

interface PlatformLinksProps {
  visible: boolean;
  initialLinks?: PlatformLink[];
  onVisibilityChange: () => void;
  onChange: (links: PlatformLink[]) => void;
}

export default function PlatformLinks({ 
  visible,
  initialLinks = [], 
  onVisibilityChange,
  onChange 
}: PlatformLinksProps) {
  const [links, setLinks] = useState<PlatformLink[]>(initialLinks);

  useEffect(() => {
    setLinks(initialLinks);
  }, [JSON.stringify(initialLinks)]);

  const addLink = () => {
    const newLinks = [...links, { 
      id: crypto.randomUUID(),
      name: '',
      url: '',
      enabled: true
    }];
    setLinks(newLinks);
    onChange(newLinks);
  };

  const removeLink = (id: string) => {
    const newLinks = links.filter(link => link.id !== id);
    setLinks(newLinks);
    onChange(newLinks);
  };

  const updateLink = (id: string, field: keyof PlatformLink, value: string | boolean) => {
    const newLinks = links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    setLinks(newLinks);
    onChange(newLinks);
  };

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Platform Links"
        visible={visible}
        onVisibilityChange={onVisibilityChange}
      />

      <div className={visible ? 'space-y-4' : 'hidden'}>
        {links.map((link) => (
          <div 
            key={link.id}
            className="grid grid-cols-[1fr,1fr,auto,auto] gap-4 items-start bg-zinc-900/30 p-4 rounded-lg"
          >
            <input
              type="text"
              value={link.name}
              onChange={(e) => updateLink(link.id, 'name', e.target.value)}
              placeholder="Platform Name"
              className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
            />
            <input
              type="url"
              value={link.url}
              onChange={(e) => updateLink(link.id, 'url', e.target.value)}
              placeholder="Platform URL"
              className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
            />
            <Toggle
              checked={link.enabled !== false}
              onChange={() => updateLink(link.id, 'enabled', link.enabled === false)}
              label={link.enabled !== false ? 'Visible' : 'Hidden'}
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

        <Button 
          variant="outline" 
          size="sm"
          onClick={addLink}
          className="flex items-center gap-1.5 text-xs whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Platform
        </Button>
      </div>
    </section>
  );
}