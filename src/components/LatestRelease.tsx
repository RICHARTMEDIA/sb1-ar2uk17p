export default function LatestRelease() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl text-gray-400 mb-8">LAST RELEASE:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="group">
            <img
              src="https://images.unsplash.com/photo-1578589318433-39b5de440c3f?auto=format&fit=crop&w=800&q=80"
              alt="ROSES Album Cover"
              className="w-full aspect-square object-cover rounded-lg transform group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-6xl font-bold tracking-wider bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
              ROSES
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed">
              Dark trap maxi-single with 3 songs by LUXTALE:
              <br />
              Hellcats, Roses, Impreza
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}