import ScrollImage from './ScrollImage';
import ReleaseContent from './ReleaseContent';

interface LatestReleaseProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export default function LatestRelease({ 
  title = 'ROSES',
  description = 'Dark trap maxi-single with 3 songs by LUXTALE',
  imageUrl = 'https://i.scdn.co/image/ab67616d00001e02789b4f47b4d43aca073cdcc1'
}: LatestReleaseProps) {
  return (
    <section className="relative py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative min-h-[88vh]">
            <ScrollImage
              src={imageUrl}
              alt={title}
            />
          </div>
          <div className="relative min-h-[88vh]">
            <ReleaseContent
              title={title}
              description={description}
            />
          </div>
        </div>
      </div>
    </section>
  );
}