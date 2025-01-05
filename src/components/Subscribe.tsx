import { Send, Instagram } from 'lucide-react';

export default function Subscribe() {
  return (
    <section className="py-20 px-4 bg-black/50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Subscribe to news</h2>
        <h3 className="text-6xl font-bold tracking-wider mb-12">LUXTALE</h3>
        <button className="px-12 py-4 rounded-full bg-gradient-to-r from-blue-600 to-red-600 text-xl font-bold relative group overflow-hidden mb-16">
          <span className="relative z-10">SUBSCRIBE</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        <div className="flex justify-center gap-8">
          <h4 className="text-xl text-gray-400">SOCIAL PAGE</h4>
          <div className="flex gap-4">
            <Send className="w-6 h-6 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer" />
            <Instagram className="w-6 h-6 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer" />
          </div>
        </div>
      </div>
    </section>
  );
}