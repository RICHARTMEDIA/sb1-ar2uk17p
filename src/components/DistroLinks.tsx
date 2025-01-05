import { Music, Play } from 'lucide-react';

const platforms = [
  { name: 'Spotify', icon: Music },
  { name: 'Apple Music', icon: Music },
  { name: 'TikTok', icon: Music },
  { name: 'YouTube', icon: Play }
];

export default function DistroLinks() {
  return (
    <section className="py-20 px-4 bg-black/50">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl text-gray-400 mb-12">DISTRO LINKS:</h3>
        <div className="space-y-4">
          {platforms.map((platform) => (
            <button
              key={platform.name}
              className="w-full bg-zinc-900 hover:bg-zinc-800 p-6 rounded-lg flex items-center justify-between group transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <platform.icon className="w-8 h-8 text-gray-400" />
                <span className="text-xl text-gray-300">{platform.name}</span>
              </div>
              <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                play
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}