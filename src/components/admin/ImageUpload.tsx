import { useState, useEffect } from 'react';

interface ImageUploadProps {
  label: string;
  description?: string;
  initialValue?: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ label, description, initialValue = '', onChange }: ImageUploadProps) {
  const [url, setUrl] = useState(initialValue);
  const [error, setError] = useState('');

  useEffect(() => {
    setUrl(initialValue);
  }, [initialValue]);

  const handleChange = (value: string) => {
    setUrl(value);
    setError('');
    
    if (value) {
      const img = new Image();
      img.onload = () => {
        setError('');
        onChange(value);
      };
      img.onerror = () => {
        setError('Invalid image URL');
      };
      img.src = value;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
        {description && (
          <p className="text-sm text-gray-500 mb-2">{description}</p>
        )}
        <input
          type="text"
          value={url}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
          placeholder="https://..."
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
      {url && !error && (
        <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900/50">
          <img
            src={url}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}