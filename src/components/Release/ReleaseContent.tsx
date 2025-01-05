import { useEffect, useRef } from 'react';

interface ReleaseContentProps {
  title: string;
  description: string;
}

export default function ReleaseContent({ title, description }: ReleaseContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleScroll = () => {
      const rect = content.getBoundingClientRect();
      const scrollProgress = 1 - (rect.top / window.innerHeight);
      
      // Apply faster parallax effect for text with smoother transition
      // Reduced speed by 7% (from 45 to 41.85)
      if (scrollProgress > 0 && scrollProgress < 1.5) {
        const translateY = Math.max(0, (1 - scrollProgress) * 41.85);
        content.style.transform = `translateY(${translateY}vh)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={contentRef}
      className="flex flex-col justify-start transition-transform duration-300 ease-out"
      style={{ willChange: 'transform', transform: 'translateY(41.85vh)' }}
    >
      <h3 className="text-2xl text-gray-400 tracking-[0.15em] mb-4">LAST RELEASE:</h3>
      <h2 className="outline-text text-6xl font-bold tracking-[0.2em] mb-6">
        {title}
      </h2>
      <p className="text-gray-400 text-xl leading-relaxed tracking-wider whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}