import { Send } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-wider bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            RED HOUSE
          </h1>
          <p className="text-gray-400 tracking-[0.3em] text-sm mt-1">RICHART MEDIA</p>
        </div>
        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-medium relative group overflow-hidden">
          <span className="relative z-10">FREE SUBSCRIBE</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </header>
  );
}