import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { getValidationError } from '../../lib/auth/validation';
import { Button } from '../ui/Button';
import { validateEmail, validatePassword } from '../../lib/auth/validation';

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const { signIn, error: authError, clearError, user, loading } = useAuthStore();

  const returnUrl = location.state?.returnUrl || '/admin';

  useEffect(() => {
    if (user) {
      navigate(returnUrl, { replace: true });
    }
  }, [user, navigate, returnUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setValidationError(null);
    clearError();

    const error = getValidationError(email, password);
    if (error) {
      setValidationError(error);
      return;
    }

    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const error = validationError || authError;
  const isValidEmail = email ? validateEmail(email) : null;
  const isValidPassword = password ? validatePassword(password) : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-zinc-900/80 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center tracking-[0.15em] text-red-500">
          LOGIN TO RICHART
        </h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidationError(null);
                }}
                className={`w-full p-3 bg-black/50 border rounded focus:outline-none focus:border-blue-500 pr-10 ${
                  isValidEmail === true ? 'border-green-500 text-green-500' : 
                  isValidEmail === false ? 'border-red-500 text-red-500' : 
                  'border-gray-800 text-gray-300'
                }`}
                placeholder="admin@example.com"
                required
                disabled={loading}
              />
              {isValidEmail !== null && (
                <div className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${
                  isValidEmail ? 'text-green-500' : 'text-red-500'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setValidationError(null);
                }}
                className={`w-full p-3 bg-black/50 border rounded focus:outline-none focus:border-blue-500 pr-10 ${
                  isValidPassword === true ? 'border-green-500 text-green-500' : 
                  isValidPassword === false ? 'border-red-500 text-red-500' : 
                  'border-gray-800 text-gray-300'
                }`}
                placeholder="••••••••"
                required
                disabled={loading}
              />
              {isValidPassword !== null && (
                <div className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${
                  isValidPassword ? 'text-green-500' : 'text-red-500'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </div>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            variant="gradient" 
            size="lg" 
            className="w-full"
            disabled={loading || !email || !password}
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Default credentials:<br />
          Email: admin@example.com<br />
          Password: admin123
        </p>
      </div>
    </div>
  );
}