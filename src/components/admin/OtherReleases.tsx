import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import ImageUpload from './ImageUpload';
import type { Release } from '../../lib/types/promo';

interface OtherReleasesProps {
  initialReleases?: Array<{
    title: string;
    image: string;
    url?: string;
  }>;
  onChange: (releases: Array<{ title: string; image: string; url?: string }>) => void;
}

export default function OtherReleases({ initialReleases = [], onChange }: OtherReleasesProps) {
  const [releases, setReleases] = useState<Release[]>(() => 
    initialReleases.map(release => ({
      id: crypto.randomUUID(),
      title: release.title,
      image: release.image,
      url: release.url || ''
    }))
  );

  // Notify parent of changes
  const notifyChange = useCallback((newReleases: Release[]) => {
    const formattedReleases = newReleases.map(release => ({
      title: release.title,
      image: release.image,
      url: release.url || undefined
    }));
    onChange(formattedReleases);
  }, [onChange]);

  const addRelease = () => {
    const newReleases = [...releases, {
      id: crypto.randomUUID(),
      title: '',
      image: '',
      url: ''
    }];
    setReleases(newReleases);
    notifyChange(newReleases);
  };

  const removeRelease = (id: string) => {
    const newReleases = releases.filter(release => release.id !== id);
    setReleases(newReleases);
    notifyChange(newReleases);
  };

  const updateRelease = (id: string, field: keyof Release, value: string) => {
    const newReleases = releases.map(release =>
      release.id === id ? { ...release, [field]: value } : release
    );
    setReleases(newReleases);
    notifyChange(newReleases);
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-wider text-gray-400">Other Releases</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={addRelease}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Release
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {releases.map((release) => (
          <div 
            key={release.id}
            className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800"
          >
            <div className="flex justify-between">
              <input
                type="text"
                value={release.title}
                onChange={(e) => updateRelease(release.id, 'title', e.target.value)}
                placeholder="Release Title"
                className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeRelease(release.id)}
                className="ml-4 text-red-500 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <ImageUpload
              label="Cover Image URL"
              initialValue={release.image}
              onChange={(url) => updateRelease(release.id, 'image', url)}
            />

            <input
              type="url"
              value={release.url}
              onChange={(e) => updateRelease(release.id, 'url', e.target.value)}
              placeholder="Release URL (optional)"
              className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}