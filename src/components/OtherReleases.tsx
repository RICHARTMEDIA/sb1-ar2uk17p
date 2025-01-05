const releases = [
  {
    title: 'Roses',
    image: 'https://images.unsplash.com/photo-1578589318433-39b5de440c3f?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Inferno',
    image: 'https://images.unsplash.com/photo-1578589318433-39b5de440c3f?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Dawn',
    image: 'https://images.unsplash.com/photo-1578589318433-39b5de440c3f?auto=format&fit=crop&w=400&q=80'
  }
];

export default function OtherReleases() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-6xl font-bold tracking-wider mb-12">
          OTHER <span className="text-red-500">RELEASES</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {releases.map((release) => (
            <div key={release.title} className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={release.image}
                  alt={release.title}
                  className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}