interface ReleaseCardProps {
  title: string;
  image: string;
  url?: string;
}

export default function ReleaseCard({ title, image, url }: ReleaseCardProps) {
  const Content = () => (
    <div className="group overflow-hidden rounded-lg">
      <img
        src={image}
        alt={title}
        className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
    </div>
  );

  if (url) {
    return (
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative cursor-pointer"
      >
        <Content />
      </a>
    );
  }

  return (
    <div className="relative cursor-pointer">
      <Content />
    </div>
  );
}