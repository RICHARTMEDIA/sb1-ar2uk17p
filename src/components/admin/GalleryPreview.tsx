import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '../../lib/types/artist';

interface GalleryPreviewProps {
  images: GalleryImage[];
}

export default function GalleryPreview({ images }: GalleryPreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  };

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div 
          key={image.id}
          onClick={() => setSelectedIndex(index)}
          className="group cursor-pointer relative aspect-square overflow-hidden rounded-lg"
        >
          <img
            src={image.url}
            alt={image.caption || ''}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            {image.caption && (
              <p className="text-white p-4 text-sm font-medium tracking-wide">
                {image.caption}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            onClick={handlePrevious}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            onClick={handleNext}
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="max-w-6xl w-full max-h-[90vh] relative">
            <img
              src={selectedImage.url}
              alt={selectedImage.caption || ''}
              className="w-full h-full object-contain rounded-lg"
            />
            {selectedImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-white text-center text-lg font-medium tracking-wide">
                  {selectedImage.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}