import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Toggle } from '../../ui/Toggle';
import ImageUpload from '../ImageUpload';
import type { Release } from '../../../lib/types/promo';

interface OtherReleasesProps {
  visible: boolean;
  initialReleases?: Release[];
  onVisibilityChange: () => void;
  onChange: (releases: Release[]) => void;
}

export default function OtherReleases({
  visible,
  initialReleases = [],
  onVisibilityChange,
  onChange
}: OtherReleasesProps) {
  const addRelease = () => {
    onChange([...initialReleases, {
      id: crypto.randomUUID(),
      title: '',
      image: '',
      url: ''
    }]);
  };

  const removeRelease = (id: string) => {
    onChange(initialReleases.filter(release => release.id !== id));
  };

  const updateRelease = (id: string, field: keyof Release, value: string) => {
    onChange(initialReleases.map(release =>
      release.id === id ? { ...release, [field]: value } : release
    ));
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-wider text-gray-400">Other Releases</h3>
        <Toggle
          checked={visible}
          onChange={onVisibilityChange}
          label={visible ? 'Visible' : 'Hidden'}
        />
      </div>

      <div className={visible ? 'space-y-6' : 'hidden'}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialReleases.map((release) => (
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
                value={release.url || ''}
                onChange={(e) => updateRelease(release.id, 'url', e.target.value)}
                placeholder="Release URL (optional)"
                className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
              />
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          size="sm"
          onClick={addRelease}
          className="flex items-center gap-1.5 text-xs whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Release
        </Button>
      </div>
    </section>
  );
}