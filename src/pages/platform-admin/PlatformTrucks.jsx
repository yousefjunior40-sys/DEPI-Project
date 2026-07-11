import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Star, Check, X, ShieldAlert, Trash2, Edit2, Save } from "lucide-react";
import { toast } from "sonner";
const statusStyles = {
  active: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800 font-medium animate-pulse",
  suspended: "bg-amber-100 text-amber-800",
  rejected: "bg-destructive/10 text-destructive"
};
const PlatformTrucks = () => {
  const {
    data,
    approveTruck,
    rejectTruck,
    suspendTruck,
    deleteTruck,
    updateTruck
  } = useApp();
  const [editingId, setEditingId] = useState(null);

  // Fields for inline editing
  const [editName, setEditName] = useState("");
  const [editCuisine, setEditCuisine] = useState("");
  const [editPrepTime, setEditPrepTime] = useState("");
  const handleEditClick = truck => {
    setEditingId(truck.id);
    setEditName(truck.name);
    setEditCuisine(truck.cuisine);
    setEditPrepTime(truck.prepTime.toString());
  };
  const handleSaveClick = truckId => {
    if (!editName.trim() || !editCuisine.trim()) {
      toast.error("Name and Cuisine are required.");
      return;
    }
    updateTruck(truckId, {
      name: editName.trim(),
      cuisine: editCuisine.trim(),
      prepTime: parseInt(editPrepTime) || 20
    });
    setEditingId(null);
    toast.success("Truck updated successfully");
  };
  const handleApprove = id => {
    approveTruck(id);
    toast.success("Vendor approved successfully!");
  };
  const handleReject = id => {
    if (confirm("Are you sure you want to REJECT this vendor application?")) {
      rejectTruck(id);
      toast.warning("Vendor registration rejected.");
    }
  };
  const handleSuspend = id => {
    if (confirm("Are you sure you want to SUSPEND this food truck listing? It will close the truck and hide it from listings.")) {
      suspendTruck(id);
      toast.warning("Food truck suspended.");
    }
  };
  const handleDelete = id => {
    if (confirm("Are you sure you want to DELETE this food truck listing permanently? This cannot be undone.")) {
      deleteTruck(id);
      toast.error("Food truck deleted permanently.");
    }
  };
  return <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Food Truck Directory</h1>
        <p className="text-sm text-muted-foreground mt-1">Review registrations, approve new vendor listings, or manage active profiles.</p>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="p-4">Food Truck</th>
                <th className="p-4">Cuisine</th>
                <th className="p-4">Location</th>
                <th className="p-4">Prep Time</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {data.trucks.map(truck => {
              const isEditing = editingId === truck.id;
              return <tr key={truck.id} className="hover:bg-background/40 transition-colors">
                    <td className="p-4">
                      {isEditing ? <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="px-2 py-1.5 border border-input rounded text-sm bg-background w-full max-w-[180px] outline-none focus:ring-1 focus:ring-ring font-semibold" /> : <div className="flex items-center gap-3">
                          <img src={truck.image} alt={truck.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground">{truck.name}</p>
                            <p className="text-[10px] text-muted-foreground">ID: {truck.id}</p>
                          </div>
                        </div>}
                    </td>
                    <td className="p-4">
                      {isEditing ? <input type="text" value={editCuisine} onChange={e => setEditCuisine(e.target.value)} className="px-2 py-1.5 border border-input rounded text-sm bg-background w-full max-w-[120px] outline-none focus:ring-1 focus:ring-ring" /> : <span className="text-muted-foreground">{truck.cuisine}</span>}
                    </td>
                    <td className="p-4">
                      <span className="text-muted-foreground">{truck.location}</span>
                    </td>
                    <td className="p-4">
                      {isEditing ? <input type="number" value={editPrepTime} onChange={e => setEditPrepTime(e.target.value)} className="px-2 py-1.5 border border-input rounded text-sm bg-background w-20 outline-none focus:ring-1 focus:ring-ring" /> : <span className="text-muted-foreground">{truck.prepTime} min</span>}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-accent font-semibold">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span>{truck.rating > 0 ? truck.rating.toFixed(1) : "—"}</span>
                        <span className="text-[10px] text-muted-foreground">({truck.reviewCount})</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold capitalize ${statusStyles[truck.status]}`}>
                        {truck.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isEditing ? <>
                            <button onClick={() => handleSaveClick(truck.id)} className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors" title="Save">
                              <Save className="h-3.5 w-3.5" />
                            </button>
                            <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted-foreground/10 transition-colors" title="Cancel">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </> : <>
                            {/* Pending Application controls */}
                            {truck.status === "pending" && <>
                                <button onClick={() => handleApprove(truck.id)} className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors" title="Approve Listing">
                                  <Check className="h-3.5 w-3.5" />
                                </button>
                                <button onClick={() => handleReject(truck.id)} className="p-1.5 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors" title="Reject Listing">
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </>}

                            {/* Active listing controls */}
                            {truck.status === "active" && <button onClick={() => handleSuspend(truck.id)} className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors" title="Suspend Listing">
                                <ShieldAlert className="h-3.5 w-3.5" />
                              </button>}

                            {/* Restore suspended or rejected vendor */}
                            {["suspended", "rejected"].includes(truck.status) && <button onClick={() => handleApprove(truck.id)} className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors" title="Activate Listing">
                                <Check className="h-3.5 w-3.5" />
                              </button>}

                            {/* Edit Info */}
                            <button onClick={() => handleEditClick(truck)} className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:text-primary transition-colors" title="Edit Basic Details">
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>

                            {/* Delete permanently */}
                            <button onClick={() => handleDelete(truck.id)} className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Delete Permanently">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </>}
                      </div>
                    </td>
                  </tr>;
            })}
              {data.trucks.length === 0 && <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground font-medium">
                    No food trucks listed in the directory.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default PlatformTrucks;