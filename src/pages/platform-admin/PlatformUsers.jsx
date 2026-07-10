import { useApp } from "@/contexts/AppContext";
import { ShieldAlert, ShieldCheck, Trash2, Mail, Phone, Calendar } from "lucide-react";
import { toast } from "sonner";
const statusStyles = {
  active: "bg-emerald-100 text-emerald-800",
  banned: "bg-destructive/10 text-destructive",
  pending_approval: "bg-amber-100 text-amber-800 font-medium animate-pulse"
};
const PlatformUsers = () => {
  const {
    data,
    banUser,
    unbanUser,
    deleteUser
  } = useApp();
  const handleBan = userId => {
    if (confirm("Are you sure you want to suspend/ban this user account?")) {
      banUser(userId);
      toast.warning("User suspended successfully");
    }
  };
  const handleUnban = userId => {
    unbanUser(userId);
    toast.success("User restored successfully");
  };
  const handleDelete = userId => {
    if (confirm("Are you sure you want to permanently delete this user account? This action cannot be undone.")) {
      deleteUser(userId);
      toast.error("User deleted permanently");
    }
  };
  return <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold font-display">User Directory</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor all customer accounts, vendors, staff accounts, and security access states.</p>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Role</th>
                <th className="p-4">Join Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {data.users.map(user => {
              return <tr key={user.id} className="hover:bg-background/40 transition-colors">
                    <td className="p-4 font-semibold text-foreground">{user.name}</td>
                    <td className="p-4">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground/60" />
                        {user.email}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground/60" />
                        {user.phone || "—"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                        {new Date(user.createdAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold capitalize ${statusStyles[user.status]}`}>
                        {user.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {user.role !== "admin" && <div className="flex items-center justify-end gap-1.5">
                          {user.status === "banned" ? <button onClick={() => handleUnban(user.id)} className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors" title="Unban/Restore Account">
                              <ShieldCheck className="h-3.5 w-3.5" />
                            </button> : <button onClick={() => handleBan(user.id)} className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors" title="Ban/Suspend Account">
                              <ShieldAlert className="h-3.5 w-3.5" />
                            </button>}
                          <button onClick={() => handleDelete(user.id)} className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Delete Permanently">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>}
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default PlatformUsers;