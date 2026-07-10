import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Lock, Bell, AlertTriangle, Check } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const VendorSettings = () => {
  const {
    currentUser,
    updateProfile,
    suspendTruck
  } = useApp();
  const navigate = useNavigate();
  if (!currentUser) return null;
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  // Notification states (mock)
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyReviews, setNotifyReviews] = useState(true);
  const handlePasswordChange = e => {
    e.preventDefault();
    if (!currentPwd || !newPwd) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (currentPwd !== currentUser.password) {
      toast.error("Current password is incorrect.");
      return;
    }
    if (newPwd.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    updateProfile(currentUser.id, {
      password: newPwd
    });
    setCurrentPwd("");
    setNewPwd("");
    toast.success("Password updated successfully!");
  };
  const handleSuspendTruck = () => {
    if (currentUser.truckId) {
      if (confirm("Are you sure you want to suspend your food truck listing? This will immediately close your truck and hide it from search results.")) {
        suspendTruck(currentUser.truckId);
        toast.warning("Food truck has been suspended.");
        navigate("/");
      }
    }
  };
  return <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure account access, credentials, and notification triggers.</p>
      </div>

      <div className="space-y-6">
        {/* Change Password Form */}
        <form onSubmit={handlePasswordChange} className="bg-card rounded-xl border border-border shadow-soft p-5 space-y-4">
          <h3 className="font-display font-semibold text-base flex items-center gap-1.5 text-foreground">
            <Lock className="h-4 w-4 text-accent" /> Change Password
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Current Password</label>
              <input type="password" required value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">New Password</label>
              <input type="password" required value={newPwd} onChange={e => setNewPwd(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors shadow-sm">
              <Check className="h-4 w-4" /> Update Password
            </button>
          </div>
        </form>

        {/* Notifications (Mock) */}
        <div className="bg-card rounded-xl border border-border shadow-soft p-5 space-y-4">
          <h3 className="font-display font-semibold text-base flex items-center gap-1.5 text-foreground">
            <Bell className="h-4 w-4 text-primary" /> Notifications
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Order Alerts</p>
                <p className="text-xs text-muted-foreground">Receive sound and push notifications for incoming orders.</p>
              </div>
              <button type="button" onClick={() => setNotifyOrders(!notifyOrders)} className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${notifyOrders ? "bg-secondary" : "bg-muted"}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${notifyOrders ? "translate-x-4" : "translate-x-0"}`} />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Review Alerts</p>
                <p className="text-xs text-muted-foreground">Receive notifications when customers submit feedback.</p>
              </div>
              <button type="button" onClick={() => setNotifyReviews(!notifyReviews)} className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${notifyReviews ? "bg-secondary" : "bg-muted"}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${notifyReviews ? "translate-x-4" : "translate-x-0"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card rounded-xl border border-destructive/20 shadow-soft p-5 space-y-4">
          <h3 className="font-display font-semibold text-base flex items-center gap-1.5 text-destructive">
            <AlertTriangle className="h-4.5 w-4.5" /> Danger Zone
          </h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Suspend Food Truck</p>
              <p className="text-xs text-muted-foreground">Temporarily remove your food truck listing from searches. You can restore it later.</p>
            </div>
            <button onClick={handleSuspendTruck} className="px-4 py-2 border border-destructive/40 hover:bg-destructive/5 text-destructive rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
              Suspend Truck
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default VendorSettings;