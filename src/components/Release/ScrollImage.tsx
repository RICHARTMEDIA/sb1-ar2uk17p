import { useEffect, useRef } from 'react';

interface ScrollImageProps {
  src: string;
  alt: string;
}

export default function ScrollImage({ src, alt }: ScrollImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const handleScroll = () => {
      const rect = image.getBoundingClientRect();
      const scrollProgress = 1 - (rect.top / window.innerHeight);
      
      // Apply faster parallax effect for image with reduced delay
      if (scrollProgress > 0 && scrollProgress < 1.5) {
        const translateY = scrollProgress * 35;
        image.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-24 h-fit">
      <div 
        ref={imageRef}
        className="w-full transition-transform duration-[42.5ms]" // Reduced from 50ms to 42.5ms (15% reduction)
        style={{ willChange: 'transform' }}
      >
        <img 
          src={src}
          alt={alt}
          className="w-full aspect-square object-cover rounded-lg"
        />
      </div>
    </div>
  );
}