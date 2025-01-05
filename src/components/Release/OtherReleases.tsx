import ReleaseCard from './ReleaseCard';

interface Release {
  title: string;
  image: string;
  url?: string;
}

interface OtherReleasesProps {
  releases?: Release[];
}

export default function OtherReleases({ releases = [] }: OtherReleasesProps) {
  if (!releases || releases.length === 0) return null;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-6xl font-bold tracking-wider mb-12">
          OTHER <span className="text-red-500">RELEASES</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {releases.map((release, index) => (
            <ReleaseCard 
              key={`${release.title}-${index}`}
              {...release}
            />
          ))}
        </div>
      </div>
    </section>
  );
}