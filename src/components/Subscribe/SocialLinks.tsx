import { Send, Instagram } from 'lucide-react';

export default function SocialLinks() {
  return (
    <div className="flex justify-center gap-8">
      <h4 className="text-xl text-gray-400">SOCIAL PAGE</h4>
      <div className="flex gap-4">
        <Send className="w-6 h-6 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer" />
        <Instagram className="w-6 h-6 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer" />
      </div>
    </div>
  );
}