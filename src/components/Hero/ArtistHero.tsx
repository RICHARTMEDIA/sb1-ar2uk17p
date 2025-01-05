import { useEffect, useRef } from 'react';

interface ArtistHeroProps {
  imageUrl?: string;
}

export default function ArtistHero({ imageUrl = 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1920&q=80' }: ArtistHeroProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const handleScroll = () => {
      lastScrollY.current = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const translateY = lastScrollY.current * 0.4;
          if (bg) {
            bg.style.transform = `translate3d(0, ${translateY}px, 0)`;
          }
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div 
        ref={bgRef}
        className="absolute inset-0 will-change-transform transition-transform duration-[50ms] ease-linear"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative h-full flex items-end justify-end p-12">
        <h2 className="outline-text text-8xl font-bold tracking-[0.2em] opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-default">
          LUXTALE
        </h2>
      </div>
    </section>
  );
}