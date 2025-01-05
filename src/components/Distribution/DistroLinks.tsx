import { platforms } from './platforms';
import { Music, Play } from 'lucide-react';

interface DistroLinksProps {
  links?: Array<{ name: string; url: string }>;
}

export default function DistroLinks({ links = [] }: DistroLinksProps) {
  // If no links provided, use default platforms
  const displayLinks = links.length > 0 ? links : platforms;

  return (
    <section className="py-12 bg-black/50">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl text-gray-400 mb-12 tracking-[0.15em]">DISTRO LINKS:</h3>
        <div className="space-y-4">
          {displayLinks.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-zinc-900/80 hover:bg-zinc-800/80 p-6 rounded-lg flex items-center justify-between group transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {platform.name.toLowerCase().includes('youtube') ? (
                  <Play className="w-8 h-8 text-gray-400" />
                ) : (
                  <Music className="w-8 h-8 text-gray-400" />
                )}
                <span className="text-xl text-gray-300 tracking-wider">{platform.name}</span>
              </div>
              <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                play
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}