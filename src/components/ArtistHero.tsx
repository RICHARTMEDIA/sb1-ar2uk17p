export default function ArtistHero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1920&q=80"
        alt="LUXTALE"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75"
      />
      <div className="relative z-20 h-full flex items-center justify-center">
        <h2 className="text-8xl font-bold tracking-widest text-white opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-default">
          LUXTALE
        </h2>
      </div>
    </section>
  );
}