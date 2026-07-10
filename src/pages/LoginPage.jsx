import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import logo from '@/assets/logo-new.png';
const LoginPage = () => {
  const {
    login,
    currentUser
  } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? null;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in, redirect
  useEffect(() => {
    if (currentUser) {
      const dest = currentUser.role === 'admin' ? '/platform-admin' : currentUser.role === 'vendor' ? currentUser.status === 'pending_approval' ? '/pending-approval' : '/vendor' : from ?? '/';
      navigate(dest, {
        replace: true
      });
    }
  }, [currentUser, navigate, from]);
  if (currentUser) {
    return null;
  }
  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    const result = login(email.trim(), password);
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? 'Login failed.');
      return;
    }
    toast.success('Welcome back!');
    // Redirect by role handled via re-render
  };
  const demoAccounts = [{
    label: 'Customer',
    email: 'john@example.com',
    password: 'customer123'
  }, {
    label: 'Vendor',
    email: 'vendor1@truckspot.com',
    password: 'vendor123'
  }, {
    label: 'Admin',
    email: 'admin@truckspot.com',
    password: 'admin123'
  }];
  return <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={logo} alt="TruckSpot" className="h-14 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your TruckSpot account</p>
          </div>

          {/* Demo accounts */}
          <div className="mb-4 p-3 rounded-xl bg-accent/5 border border-accent/20">
            <p className="text-xs font-semibold text-accent mb-2">🔑 Demo Accounts</p>
            <div className="grid grid-cols-3 gap-2">
              {demoAccounts.map(acc => <button key={acc.label} onClick={() => {
              setEmail(acc.email);
              setPassword(acc.password);
            }} className="text-[11px] py-1.5 px-2 rounded-lg bg-card border border-border hover:border-accent/50 hover:bg-accent/5 transition-colors text-left">
                  <span className="font-semibold block">{acc.label}</span>
                  <span className="text-muted-foreground">{acc.email.split('@')[0]}</span>
                </button>)}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-card p-6 space-y-4">
            {error && <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm animate-fade-in">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>}

            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" autoComplete="email" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-60">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-accent font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>;
};
export default LoginPage;