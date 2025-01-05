import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface VideoInputProps {
  onAdd: (data: { title: string; url: string }) => void;
}

export default function VideoInput({ onAdd }: VideoInputProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && url) {
      onAdd({ title, url });
      setTitle('');
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end bg-zinc-900/30 p-4 rounded-lg">
      <div className="flex-1">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Video title"
          className="w-full p-2 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 mb-2"
          required
        />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="YouTube video URL"
          className="w-full p-2 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
          required
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className="h-10 whitespace-nowrap"
        disabled={!title || !url}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Video
      </Button>
    </form>
  );
}