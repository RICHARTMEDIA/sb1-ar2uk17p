import { PlatformIcon } from '../ui/PlatformIcon';
import type { PlatformLink, ReleaseFormData, SocialLink } from '../../lib/types/promo';

interface PromoPreviewProps {
  artistName?: string;
  bannerImage?: string;
  latestRelease: ReleaseFormData;
  platformLinks?: PlatformLink[];
  otherReleases?: Array<{ title: string; image: string; url?: string }>;
  socialLinks?: SocialLink[];
}

export default function PromoPreview({
  artistName = '',
  bannerImage = '',
  latestRelease,
  platformLinks = [],
  otherReleases = [],
  socialLinks = []
}: PromoPreviewProps) {
  // Filter enabled platform links
  const enabledPlatformLinks = platformLinks.filter(link => link.enabled !== false);

  return (
    <div className="bg-black min-h-screen text-sm">
      {/* Hero Section */}
      <section className="relative h-[35vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {bannerImage && (
          <img
            src={bannerImage}
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-6 right-6 z-20">
          <h2 className="text-3xl font-bold tracking-[0.2em] text-white opacity-90">
            {artistName || 'ARTIST NAME'}
          </h2>
        </div>
      </section>

      {/* Latest Release */}
      {latestRelease.title && (
        <section className="py-8 px-4">
          <div className="max-w-[85%] mx-auto">
            <h2 className="text-xs text-gray-400 tracking-[0.15em] mb-4">LAST RELEASE:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <img
                  src={latestRelease.image}
                  alt={latestRelease.title}
                  className="w-full aspect-square object-cover rounded-lg transform group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold tracking-[0.2em] text-white mb-3">
                  {latestRelease.title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                  {latestRelease.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Platform Links */}
      {enabledPlatformLinks.length > 0 && (
        <section className="py-8 px-4 bg-black/50">
          <div className="max-w-[85%] mx-auto">
            <h2 className="text-xs text-gray-400 tracking-[0.15em] mb-4">LISTEN NOW:</h2>
            <div className="space-y-2">
              {enabledPlatformLinks.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-zinc-900/80 hover:bg-zinc-800/80 p-4 rounded-lg flex items-center justify-between group transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <PlatformIcon platform={platform.name} className="w-5 h-5 text-white" />
                    <span className="text-sm text-white tracking-wider">{platform.name}</span>
                  </div>
                  <span className="text-xs text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    play
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Releases */}
      {otherReleases.length > 0 && (
        <section className="py-8 px-4">
          <div className="max-w-[85%] mx-auto">
            <h2 className="text-xs text-gray-400 tracking-[0.15em] mb-4">OTHER RELEASES:</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {otherReleases.map((release, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={release.image}
                      alt={release.title}
                      className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="mt-2 text-xs font-medium text-white">{release.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}