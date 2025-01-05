import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/Button';

export default function AdminHeader() {
  const navigate = useNavigate();
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <header className="bg-zinc-900/80 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold tracking-[0.15em] text-red-500">
            RICHART DASHBOARD
          </h1>
          <nav className="flex gap-6">
            <button 
              onClick={() => navigate('/admin')}
              className="text-gray-400 hover:text-white transition-colors tracking-wider"
            >
              Artist Profile
            </button>
            <button 
              onClick={() => navigate('/admin/pages')}
              className="text-gray-400 hover:text-white transition-colors tracking-wider"
            >
              Promo Pages
            </button>
          </nav>
        </div>
        <Button onClick={signOut} variant="outline" size="sm">
          LOGOUT
        </Button>
      </div>
    </header>
  );
}