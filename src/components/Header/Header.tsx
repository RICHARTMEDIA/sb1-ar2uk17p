import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import Logo from './Logo';
import { Button } from '../ui/Button';

export default function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <header className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Logo />
        <div className="flex gap-4">
          {user ? (
            <Button 
              variant="gradient" 
              size="md" 
              onClick={() => navigate('/admin')}
            >
              RICHART DASHBOARD
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="md" 
                onClick={() => navigate('/admin/login')}
              >
                LOGIN
              </Button>
              <Button variant="gradient" size="md">
                FREE SUBSCRIBE
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}