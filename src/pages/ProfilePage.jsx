import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Edit2, Check, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useApp } from '@/contexts/AppContext';
import { CAIRO_AREAS } from '@/data/cairoLocations';
import { toast } from 'sonner';
const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    color: 'bg-muted text-muted-foreground'
  },
  accepted: {
    label: 'Accepted',
    color: 'bg-primary/10 text-primary'
  },
  preparing: {
    label: 'Preparing',
    color: 'bg-primary/10 text-primary'
  },
  ready: {
    label: 'Ready',
    color: 'bg-secondary/10 text-secondary'
  },
  out_for_delivery: {
    label: 'On the Way',
    color: 'bg-accent/10 text-accent'
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-secondary/10 text-secondary'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-destructive/10 text-destructive'
  }
};
const ProfilePage = () => {
  const {
    currentUser,
    updateProfile,
    getCustomerOrders
  } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name ?? '');
  const [phone, setPhone] = useState(currentUser?.phone ?? '');
  const [area, setArea] = useState(currentUser?.area ?? '');
  const [address, setAddress] = useState(currentUser?.address ?? '');
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  if (!currentUser) {
    return <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-4xl mb-4">🔒</p>
          <h1 className="font-display text-2xl font-bold mb-2">Please sign in</h1>
          <Link to="/login" className="text-accent hover:underline">Sign In</Link>
        </div>
      </div>;
  }
  const orders = currentUser.role === 'customer' ? getCustomerOrders(currentUser.id) : [];
  const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const areaName = CAIRO_AREAS.find(a => a.id === currentUser.area)?.name ?? currentUser.area;
  const handleSave = () => {
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    updateProfile(currentUser.id, {
      name: name.trim(),
      phone: phone.trim(),
      area,
      address: address.trim()
    });
    toast.success('Profile updated!');
    setEditing(false);
  };
  const handleCancel = () => {
    setName(currentUser.name);
    setPhone(currentUser.phone ?? '');
    setArea(currentUser.area ?? '');
    setAddress(currentUser.address ?? '');
    setEditing(false);
  };
  const handlePasswordChange = () => {
    if (!currentPwd || !newPwd) {
      toast.error('Fill in both fields');
      return;
    }
    if (currentPwd !== currentUser.password) {
      toast.error('Current password is incorrect');
      return;
    }
    if (newPwd.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    updateProfile(currentUser.id, {
      password: newPwd
    });
    setCurrentPwd('');
    setNewPwd('');
    toast.success('Password changed!');
  };
  const tabs = [{
    id: 'profile',
    label: 'Profile'
  }, ...(currentUser.role === 'customer' ? [{
    id: 'orders',
    label: 'Order History'
  }] : []), {
    id: 'addresses',
    label: 'Saved Addresses'
  }, {
    id: 'settings',
    label: 'Settings'
  }];
  return <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Header — Two Column */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: avatar */}
            <div className="flex flex-col items-center gap-3 md:w-48">
              {currentUser.avatar ? <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-border" /> : <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary ring-4 ring-border">
                  {initials}
                </div>}
              <div className="text-center">
                <p className="font-display font-bold text-lg">{currentUser.name}</p>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent capitalize">
                  {currentUser.role}
                </span>
              </div>
              <label className="text-xs text-accent hover:underline cursor-pointer">
                Upload Photo
                <input type="file" accept="image/*" className="hidden" onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = ev => updateProfile(currentUser.id, {
                    avatar: ev.target?.result
                  });
                  reader.readAsDataURL(file);
                }
              }} />
              </label>
            </div>

            {/* Right: details */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{currentUser.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{currentUser.phone || '—'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Area</p>
                  <p className="text-sm font-medium">{areaName || '—'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-sm font-medium">{new Date(currentUser.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
          {tabs.map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === t.id ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-card text-foreground/70 hover:bg-muted/60'}`}>
              {t.label}
            </button>)}
        </div>

        {/* Tab Content */}
        {/* Profile */}
        {activeTab === 'profile' && <div className="bg-card rounded-2xl shadow-soft p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-lg">Personal Info</h2>
              {!editing ? <button onClick={() => setEditing(true)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm font-medium hover:bg-muted/80 transition-colors">
                  <Edit2 className="h-3.5 w-3.5" /> Edit
                </button> : <div className="flex gap-2">
                  <button onClick={handleSave} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90">
                    <Check className="h-3.5 w-3.5" /> Save
                  </button>
                  <button onClick={handleCancel} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-sm font-medium hover:bg-muted/80">
                    <X className="h-3.5 w-3.5" /> Cancel
                  </button>
                </div>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} disabled={!editing} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-60" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Phone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} disabled={!editing} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-60" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Area</label>
                {editing ? <select value={area} onChange={e => setArea(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring appearance-none">
                    <option value="">Select area</option>
                    {CAIRO_AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select> : <input type="text" value={areaName || '—'} disabled className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm opacity-60" />}
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Address</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} disabled={!editing} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-60" />
              </div>
            </div>
          </div>}

        {/* Order History */}
        {activeTab === 'orders' && <div className="animate-fade-in space-y-3">
            {orders.length === 0 ? <div className="text-center py-12 bg-card rounded-2xl shadow-soft">
                <p className="text-3xl mb-2">📦</p>
                <p className="font-medium text-muted-foreground">No orders yet</p>
                <Link to="/trucks" className="text-accent text-sm hover:underline mt-2 inline-block">Browse trucks</Link>
              </div> : orders.map(order => {
          const config = STATUS_CONFIG[order.status];
          return <Link key={order.id} to={`/order/${order.id}`} className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-soft hover:shadow-card transition-shadow">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{order.truckName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${config.color}`}>{config.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''} · ${order.total.toFixed(2)} · {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>;
        })}
          </div>}

        {/* Addresses */}
        {activeTab === 'addresses' && <div className="bg-card rounded-2xl shadow-soft p-6 animate-fade-in">
            <h2 className="font-display font-bold text-lg mb-4">Saved Addresses</h2>
            {currentUser.address ? <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 mb-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Home</p>
                  <p className="text-xs text-muted-foreground">{currentUser.address}</p>
                  {areaName && <p className="text-xs text-muted-foreground">{areaName}, Cairo</p>}
                </div>
              </div> : <p className="text-sm text-muted-foreground">No saved addresses. Update your profile to add one.</p>}
          </div>}

        {/* Settings */}
        {activeTab === 'settings' && <div className="bg-card rounded-2xl shadow-soft p-6 animate-fade-in">
            <h2 className="font-display font-bold text-lg mb-6">Change Password</h2>
            <div className="space-y-4 max-w-sm">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Current Password</label>
                <input type="password" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">New Password</label>
                <input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button onClick={handlePasswordChange} className="px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors">
                Update Password
              </button>
            </div>
          </div>}
      </div>
      <Footer />
    </div>;
};
export default ProfilePage;