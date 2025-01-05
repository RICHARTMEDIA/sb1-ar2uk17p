import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import VideoInput from '../VideoInput';

interface Video {
  id: string;
  title: string;
  url: string;
}

interface VideoSectionProps {
  videos: Video[];
  onAdd: (video: { title: string; url: string }) => void;
  onRemove: (id: string) => void;
}

export default function VideoSection({ videos, onAdd, onRemove }: VideoSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-wider text-gray-400">Videos</h3>
      </div>

      <VideoInput onAdd={onAdd} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-zinc-900/30 rounded-lg overflow-hidden">
            <div className="aspect-video">
              <iframe
                src={video.url}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex items-center justify-between p-2">
              <span className="text-gray-300">{video.title}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemove(video.id)}
                className="text-red-500 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}