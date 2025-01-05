import { Send, Instagram } from 'lucide-react';

export default function Subscribe() {
  return (
    <section className="py-20 px-4 bg-black/50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold tracking-[0.15em] mb-8">Subscribe to news</h2>
        <h3 className="outline-text text-6xl font-bold tracking-[0.2em] mb-12">
          LUXTALE
        </h3>
        <button className="px-12 py-4 rounded-full gradient-button text-xl font-bold mb-16 group">
          <span className="relative z-10 tracking-[0.15em] group-hover:text-red-500 transition-colors duration-300">
            SUBSCRIBE
          </span>
        </button>
        <div className="flex justify-center gap-8">
          <h4 className="text-xl text-gray-400 tracking-[0.15em]">SOCIAL PAGE</h4>
          <div className="flex gap-4">
            <Send className="w-6 h-6 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer" />
            <Instagram className="w-6 h-6 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer" />
          </div>
        </div>
      </div>
    </section>
  );
}