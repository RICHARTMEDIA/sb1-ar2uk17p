import { SocialIcon } from '../ui/SocialIcon';
import ProductCard from './ProductCard';
import GalleryPreview from './GalleryPreview';
import { getYouTubeEmbedUrl } from '../../lib/utils/video';
import type { ArtistProfile } from '../../lib/types/artist';

interface ArtistPreviewProps extends Partial<ArtistProfile> {}

export default function ArtistPreview(props: ArtistPreviewProps) {
  // Filter out hidden products
  const visibleProducts = props.products?.filter(p => p.status !== 'hidden') || [];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[35vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {props.image && (
          <img
            src={props.image}
            alt={props.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-8 right-8 z-20">
          <h2 className="text-3xl font-bold tracking-[0.2em] text-white opacity-90">
            {props.name || 'ARTIST NAME'}
          </h2>
        </div>
      </section>

      {/* Bio Section */}
      {props.bio && (
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg text-gray-400 tracking-[0.15em] mb-4">ABOUT:</h2>
            <p className="text-xl text-gray-300 whitespace-pre-line leading-relaxed">
              {props.bio}
            </p>
          </div>
        </section>
      )}

      {/* Latest Release */}
      {props.sections_visible?.latestRelease && props.latest_release && (
        <section className="py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg text-gray-400 tracking-[0.15em] mb-6">LAST RELEASE:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group">
                <img
                  src={props.latest_release.image}
                  alt={props.latest_release.title}
                  className="w-full aspect-square object-cover rounded-lg transform group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold tracking-[0.2em] text-white mb-6">
                  {props.latest_release.title}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                  {props.latest_release.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other Releases */}
      {props.sections_visible?.otherReleases && props.other_releases && props.other_releases.length > 0 && (
        <section className="py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg text-gray-400 tracking-[0.15em] mb-6">OTHER RELEASES:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {props.other_releases.map((release) => (
                <div key={release.id} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={release.image}
                      alt={release.title}
                      className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-white">{release.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      {props.sections_visible?.products && visibleProducts.length > 0 && (
        <section className="py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg text-gray-400 tracking-[0.15em] mb-6">PRODUCTS:</h2>
            <div className="space-y-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos Section */}
      {props.sections_visible?.videos && props.videos && props.videos.length > 0 && (
        <section className="py-10 px-4 bg-zinc-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg text-gray-400 tracking-[0.15em] mb-6">VIDEOS:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {props.videos.map((video) => (
                <div key={video.id} className="aspect-video">
                  <iframe
                    src={getYouTubeEmbedUrl(video.url)}
                    title={video.title}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {props.sections_visible?.gallery && props.gallery && props.gallery.length > 0 && (
        <section className="py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg text-gray-400 tracking-[0.15em] mb-6">GALLERY:</h2>
            <GalleryPreview images={props.gallery} />
          </div>
        </section>
      )}

      {/* Social Links */}
      {props.sections_visible?.socialLinks && props.social_links && props.social_links.length > 0 && (
        <section className="py-10 px-4 bg-zinc-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg text-gray-400 tracking-[0.15em] mb-6">CONNECT:</h2>
            <div className="flex flex-wrap gap-8">
              {props.social_links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <SocialIcon platform={link.platform} className="w-6 h-6" />
                  <span className="text-lg group-hover:text-white transition-colors">
                    {link.platform}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}