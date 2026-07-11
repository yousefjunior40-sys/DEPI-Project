import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Truck, Phone, MapPin, Eye, EyeOff, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';
import { CAIRO_AREAS } from '@/data/cairoLocations';
import { toast } from 'sonner';
import logo from '@/assets/logo-new.png';
const RegisterPage = () => {
  const {
    register,
    data
  } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1 fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');

  // Vendor step 2 fields
  const [truckName, setTruckName] = useState('');
  const [truckDesc, setTruckDesc] = useState('');
  const [truckCuisine, setTruckCuisine] = useState('');
  const [truckHours, setTruckHours] = useState('10:00 AM - 10:00 PM');
  const [truckPhone, setTruckPhone] = useState('');
  const [truckArea, setTruckArea] = useState('');
  const [truckAddress, setTruckAddress] = useState('');
  const validateStep1 = () => {
    if (!name.trim()) return 'Full name is required.';
    if (!email.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email address.';
    if (data.users.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) return 'An account with this email already exists.';
    if (!phone.trim()) return 'Phone number is required.';
    if (!/^\d{11}$/.test(phone.trim())) return 'Phone number must be exactly 11 digits (numbers only).';
    if (!password || password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };
  const handleStep1Continue = () => {
    setError('');
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    if (role === 'customer') {
      handleSubmit();
    } else {
      setStep(2);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const result = register({
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
      role,
      governorate: 'Cairo',
      area,
      address: address.trim(),
      truckName: truckName.trim() || undefined,
      truckDescription: truckDesc.trim() || undefined,
      truckCuisine: truckCuisine.trim() || undefined,
      truckHours: truckHours.trim() || undefined,
      truckPhone: truckPhone.trim() || phone.trim() || undefined,
      truckArea: truckArea || undefined,
      truckAddress: truckAddress.trim() || undefined
    });
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? 'Registration failed.');
      return;
    }
    if (role === 'vendor') {
      navigate('/pending-approval');
    } else {
      toast.success('Account created! Welcome to TruckSpot 🎉');
      navigate('/');
    }
  };
  const roleOptions = [{
    id: 'customer',
    label: 'Customer',
    icon: User,
    desc: 'Order from food trucks'
  }, {
    id: 'vendor',
    label: 'Truck Owner',
    icon: Truck,
    desc: 'List and manage your truck'
  }];
  return <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={logo} alt="TruckSpot" className="h-14 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {step === 1 ? 'Join TruckSpot today' : 'Tell us about your food truck'}
            </p>
          </div>

          {/* Progress dots */}
          {role === 'vendor' && <div className="flex items-center justify-center gap-2 mb-6">
              <div className={`h-2 w-8 rounded-full transition-colors ${step >= 1 ? 'bg-accent' : 'bg-muted'}`} />
              <div className={`h-2 w-8 rounded-full transition-colors ${step >= 2 ? 'bg-accent' : 'bg-muted'}`} />
            </div>}

          <div className="bg-card rounded-2xl shadow-card p-6 space-y-4">
            {error && <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm animate-fade-in">
                <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
              </div>}

            {/* ── Step 1 ──────────────────────────────────────────────────────── */}
            {step === 1 && <>
                {/* Role selector */}
                <div>
                  <label className="text-sm font-medium mb-2 block">I am a...</label>
                  <div className="grid grid-cols-2 gap-3">
                    {roleOptions.map(opt => <button key={opt.id} type="button" onClick={() => setRole(opt.id)} className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all text-center ${role === opt.id ? 'border-accent bg-accent/5' : 'border-border hover:border-muted-foreground/40'}`}>
                        <opt.icon className={`h-6 w-6 ${role === opt.id ? 'text-accent' : 'text-muted-foreground'}`} />
                        <span className="text-sm font-semibold">{opt.label}</span>
                        <span className="text-xs text-muted-foreground">{opt.desc}</span>
                      </button>)}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type="tel" placeholder="+20 100 000 0000" value={phone} onChange={e => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type={showPassword ? 'text' : 'password'} placeholder="Repeat your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full pl-10 pr-10 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  {password && confirmPassword && password !== confirmPassword && <p className="text-xs text-destructive mt-1 animate-fade-in">Passwords do not match.</p>}
                </div>

                {role === 'customer' && <>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Area (Cairo)</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <select value={area} onChange={e => setArea(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring appearance-none">
                          <option value="">Select your area</option>
                          {CAIRO_AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Delivery Address</label>
                      <input type="text" placeholder="Street, building..." value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                  </>}

                <button onClick={handleStep1Continue} disabled={loading} className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                  {role === 'vendor' ? <>Continue <ChevronRight className="h-4 w-4" /></> : loading ? 'Creating…' : 'Create Account'}
                </button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
                </p>
              </>}

            {/* ── Step 2 (Vendor only) ──────────────────────────────────────── */}
            {step === 2 && <>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Truck Name *</label>
                  <input type="text" placeholder="e.g. Smoky Joe's BBQ" value={truckName} onChange={e => setTruckName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Description</label>
                  <textarea rows={2} placeholder="What makes your truck special?" value={truckDesc} onChange={e => setTruckDesc(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Cuisine</label>
                    <input type="text" placeholder="e.g. BBQ, Mexican" value={truckCuisine} onChange={e => setTruckCuisine(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Phone</label>
                    <input type="tel" placeholder="+20 100..." value={truckPhone} onChange={e => setTruckPhone(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Business Hours</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type="text" placeholder="e.g. 10:00 AM - 10:00 PM" value={truckHours} onChange={e => setTruckHours(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Truck Area (Cairo)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <select value={truckArea} onChange={e => setTruckArea(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring appearance-none">
                      <option value="">Select area</option>
                      {CAIRO_AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Truck Address</label>
                  <input type="text" placeholder="Street or landmark..." value={truckAddress} onChange={e => setTruckAddress(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                    Back
                  </button>
                  <button onClick={handleSubmit} disabled={loading || !truckName.trim()} className="flex-1 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-60">
                    {loading ? 'Submitting…' : 'Submit for Approval'}
                  </button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Your truck will be reviewed and approved by our team within 24 hours.
                </p>
              </>}
          </div>
        </div>
      </div>
    </div>;
};
export default RegisterPage;