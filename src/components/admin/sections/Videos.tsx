import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import Toggle from '../../ui/Toggle';
import type { Video } from '../../../lib/types/artist';

interface VideosProps {
  visible: boolean;
  videos: Video[];
  onVisibilityChange: () => void;
  onChange: (videos: Video[]) => void;
}

export default function Videos({
  visible,
  videos,
  onVisibilityChange,
  onChange
}: VideosProps) {
  const addVideo = () => {
    onChange([...videos, {
      id: crypto.randomUUID(),
      title: '',
      url: ''
    }]);
  };

  const removeVideo = (id: string) => {
    onChange(videos.filter(video => video.id !== id));
  };

  const updateVideo = (id: string, field: keyof Video, value: string) => {
    onChange(videos.map(video =>
      video.id === id ? { ...video, [field]: value } : video
    ));
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-wider text-gray-400">Videos</h3>
        <Toggle
          checked={visible}
          onChange={onVisibilityChange}
          label={visible ? 'Visible' : 'Hidden'}
        />
      </div>

      <div className={visible ? 'space-y-6' : 'hidden'}>
        <div className="space-y-4">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="flex gap-4 items-start bg-zinc-900/30 p-6 rounded-lg border border-zinc-800"
            >
              <div className="flex-1 space-y-4">
                <input
                  type="text"
                  value={video.title}
                  onChange={(e) => updateVideo(video.id, 'title', e.target.value)}
                  placeholder="Video Title"
                  className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
                />
                <input
                  type="url"
                  value={video.url}
                  onChange={(e) => updateVideo(video.id, 'url', e.target.value)}
                  placeholder="YouTube Video URL"
                  className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeVideo(video.id)}
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
          onClick={addVideo}
          className="flex items-center gap-1.5 text-xs whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Video
        </Button>
      </div>
    </section>
  );
}