import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import Toggle from '../../ui/Toggle';
import ImageUpload from '../ImageUpload';
import type { GalleryImage } from '../../../lib/types/artist';

interface GalleryProps {
  visible: boolean;
  images: GalleryImage[];
  onVisibilityChange: () => void;
  onChange: (images: GalleryImage[]) => void;
}

export default function Gallery({
  visible,
  images,
  onVisibilityChange,
  onChange
}: GalleryProps) {
  const addImage = () => {
    onChange([...images, {
      id: crypto.randomUUID(),
      url: '',
      caption: ''
    }]);
  };

  const removeImage = (id: string) => {
    onChange(images.filter(img => img.id !== id));
  };

  const updateImage = (id: string, field: keyof GalleryImage, value: string) => {
    onChange(images.map(img =>
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-wider text-gray-400">Photo Gallery</h3>
        <Toggle
          checked={visible}
          onChange={onVisibilityChange}
          label={visible ? 'Visible' : 'Hidden'}
        />
      </div>

      <div className={visible ? 'space-y-6' : 'hidden'}>
        {images.length === 0 ? (
          <Button 
            variant="outline" 
            size="sm"
            onClick={addImage}
            className="flex items-center gap-1.5 text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Photo
          </Button>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((image) => (
                <div 
                  key={image.id}
                  className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800"
                >
                  <ImageUpload
                    label="Photo URL"
                    initialValue={image.url}
                    onChange={(url) => updateImage(image.id, 'url', url)}
                  />
                  
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={image.caption || ''}
                      onChange={(e) => updateImage(image.id, 'caption', e.target.value)}
                      placeholder="Photo Caption (optional)"
                      className="flex-1 p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeImage(image.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={addImage}
              className="flex items-center gap-1.5 text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Photo
            </Button>
          </>
        )}
      </div>
    </section>
  );
}