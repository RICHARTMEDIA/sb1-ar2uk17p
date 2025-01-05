import { type ChangeEvent } from 'react';
import ImageUpload from '../ImageUpload';
import Toggle from '../../ui/Toggle';
import type { Release } from '../../../lib/types/artist';

interface LatestReleaseProps {
  visible: boolean;
  release: Release;
  onVisibilityChange: () => void;
  onChange: (field: keyof Release, value: string) => void;
}

export default function LatestRelease({
  visible,
  release,
  onVisibilityChange,
  onChange
}: LatestReleaseProps) {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-wider text-gray-400">Latest Release</h3>
        <Toggle
          checked={visible}
          onChange={onVisibilityChange}
          label={visible ? 'Visible' : 'Hidden'}
        />
      </div>

      {visible && (
        <div className="space-y-4">
          <input
            type="text"
            value={release.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Release Title"
            className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
          />

          <textarea
            value={release.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Release Description"
            rows={3}
            className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 resize-none"
          />

          <ImageUpload
            label="Release Image"
            initialValue={release.image}
            onChange={(url) => onChange('image', url)}
          />

          <input
            type="url"
            value={release.url}
            onChange={(e) => onChange('url', e.target.value)}
            placeholder="Release URL"
            className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
          />
        </div>
      )}
    </section>
  );
}