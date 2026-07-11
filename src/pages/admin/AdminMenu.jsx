import { useState } from "react";
import { Plus, Edit, Trash2, Star, X, Check, Eye, EyeOff } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
const menuCategories = ["All", "Mains", "Sides", "Drinks", "Desserts"];
const AdminMenu = () => {
  const {
    currentUser,
    getVendorTruck,
    addTruckMenuItem,
    updateTruckMenuItem,
    deleteTruckMenuItem
  } = useApp();
  if (!currentUser) return null;
  const truck = getVendorTruck(currentUser.id);
  if (!truck) {
    return <div className="text-center py-12">
        <p className="text-muted-foreground">Truck profile not configured. Please complete your profile configuration first.</p>
      </div>;
  }
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "Mains"
  });
  const filteredItems = activeCategory === "All" ? truck.menu : truck.menu.filter(item => item.category === activeCategory);
  const handleTogglePopular = (itemId, currentVal) => {
    updateTruckMenuItem(truck.id, itemId, {
      popular: !currentVal
    });
    toast.success("Popular status updated");
  };
  const handleToggleAvailable = (itemId, currentVal) => {
    updateTruckMenuItem(truck.id, itemId, {
      available: currentVal === undefined ? false : !currentVal
    });
    toast.success("Availability updated");
  };
  const handleDeleteItem = itemId => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      deleteTruckMenuItem(truck.id, itemId);
      toast.success("Menu item deleted");
    }
  };
  const handleAddItem = e => {
    e.preventDefault();
    if (!newItem.name.trim() || !newItem.price) {
      toast.error("Please fill in Name and Price");
      return;
    }
    addTruckMenuItem(truck.id, {
      name: newItem.name.trim(),
      description: newItem.description.trim(),
      price: parseFloat(newItem.price),
      image: newItem.image.trim() || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop",
      category: newItem.category,
      popular: false,
      available: true
    });
    setNewItem({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "Mains"
    });
    setShowAddForm(false);
    toast.success("Menu item added successfully!");
  };
  const handleEditSave = e => {
    e.preventDefault();
    if (!editingItem) return;
    if (!editingItem.name.trim() || editingItem.price <= 0) {
      toast.error("Name and Price must be valid");
      return;
    }
    updateTruckMenuItem(truck.id, editingItem.id, {
      name: editingItem.name.trim(),
      description: editingItem.description.trim(),
      price: editingItem.price,
      image: editingItem.image.trim(),
      category: editingItem.category
    });
    setEditingItem(null);
    toast.success("Menu item updated successfully!");
  };
  return <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Menu Manager</h1>
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            {truck.menu.length} items total · {truck.menu.filter(i => i.popular).length} marked popular
          </p>
        </div>
        <button onClick={() => {
        setEditingItem(null);
        setShowAddForm(!showAddForm);
      }} className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors shadow-sm">
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      {/* Add Item Form */}
      {showAddForm && <form onSubmit={handleAddItem} className="bg-card rounded-xl shadow-card p-5 animate-scale-in space-y-4">
          <h3 className="font-semibold font-display text-base">Add New Menu Item</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name *</label>
              <input type="text" required value={newItem.name} onChange={e => setNewItem({
            ...newItem,
            name: e.target.value
          })} placeholder="e.g. Double Smashed Burger" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Price ($) *</label>
              <input type="number" step="0.01" required value={newItem.price} onChange={e => setNewItem({
            ...newItem,
            price: e.target.value
          })} placeholder="0.00" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium mb-1.5 block">Description</label>
              <input type="text" value={newItem.description} onChange={e => setNewItem({
            ...newItem,
            description: e.target.value
          })} placeholder="Description of ingredients, toppings, etc..." className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Image URL</label>
              <input type="url" value={newItem.image} onChange={e => setNewItem({
            ...newItem,
            image: e.target.value
          })} placeholder="Unsplash link or absolute URL..." className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Category</label>
              <select value={newItem.category} onChange={e => setNewItem({
            ...newItem,
            category: e.target.value
          })} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                <option value="Mains">Mains</option>
                <option value="Sides">Sides</option>
                <option value="Drinks">Drinks</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setShowAddForm(false)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">
              <X className="h-4 w-4" /> Cancel
            </button>
            <button type="submit" className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors">
              <Check className="h-4 w-4" /> Add Item
            </button>
          </div>
        </form>}

      {/* Edit Item Modal/Form overlay */}
      {editingItem && <form onSubmit={handleEditSave} className="bg-card rounded-xl border border-primary/20 shadow-card p-5 animate-scale-in space-y-4">
          <h3 className="font-semibold font-display text-base text-primary">Edit Menu Item: {editingItem.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name *</label>
              <input type="text" required value={editingItem.name} onChange={e => setEditingItem({
            ...editingItem,
            name: e.target.value
          })} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Price ($) *</label>
              <input type="number" step="0.01" required value={editingItem.price} onChange={e => setEditingItem({
            ...editingItem,
            price: parseFloat(e.target.value) || 0
          })} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium mb-1.5 block">Description</label>
              <input type="text" value={editingItem.description} onChange={e => setEditingItem({
            ...editingItem,
            description: e.target.value
          })} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Image URL</label>
              <input type="url" value={editingItem.image} onChange={e => setEditingItem({
            ...editingItem,
            image: e.target.value
          })} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Category</label>
              <select value={editingItem.category} onChange={e => setEditingItem({
            ...editingItem,
            category: e.target.value
          })} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring">
                <option value="Mains">Mains</option>
                <option value="Sides">Sides</option>
                <option value="Drinks">Drinks</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setEditingItem(null)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">
              <X className="h-4 w-4" /> Cancel
            </button>
            <button type="submit" className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <Check className="h-4 w-4" /> Save Changes
            </button>
          </div>
        </form>}

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {menuCategories.map(cat => <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-foreground/70 hover:bg-muted/60"}`}>
            {cat}
          </button>)}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item, i) => <div key={item.id} className={`flex gap-4 p-4 bg-card rounded-xl shadow-soft hover:shadow-card transition-all duration-300 animate-scale-in opacity-0 border ${item.available === false ? "border-muted-foreground/30 opacity-70" : "border-transparent"}`} style={{
        animationDelay: `${i * 60}ms`
      }}>
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-sm flex flex-wrap items-center gap-1.5">
                    {item.name}
                    {item.popular && <span className="px-1.5 py-0.5 bg-accent/10 text-accent text-[9px] font-bold rounded">
                        POPULAR
                      </span>}
                    {item.available === false && <span className="px-1.5 py-0.5 bg-muted text-muted-foreground text-[9px] font-bold rounded">
                        UNAVAILABLE
                      </span>}
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-sm text-foreground">${item.price.toFixed(2)}</span>
                <div className="flex items-center gap-1">
                  {/* Availability Toggle */}
                  <button onClick={() => handleToggleAvailable(item.id, item.available)} className={`p-1.5 rounded-lg transition-colors ${item.available !== false ? "bg-secondary/10 text-secondary hover:bg-secondary/20" : "bg-muted text-muted-foreground hover:bg-muted-foreground/20"}`} title={item.available !== false ? "Mark Unavailable" : "Mark Available"}>
                    {item.available !== false ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>

                  {/* Popularity Toggle */}
                  <button onClick={() => handleTogglePopular(item.id, item.popular)} className={`p-1.5 rounded-lg transition-colors ${item.popular ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground hover:text-accent"}`} title="Toggle popular">
                    <Star className={`h-3.5 w-3.5 ${item.popular ? "fill-current" : ""}`} />
                  </button>

                  {/* Edit */}
                  <button onClick={() => {
                setShowAddForm(false);
                setEditingItem(item);
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }} className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:text-primary transition-colors" title="Edit">
                    <Edit className="h-3.5 w-3.5" />
                  </button>

                  {/* Delete */}
                  <button onClick={() => handleDeleteItem(item.id)} className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:text-destructive transition-colors" title="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground/60 mt-1">{item.category}</p>
            </div>
          </div>)}
      </div>

      {filteredItems.length === 0 && <div className="text-center py-12">
          <p className="text-3xl mb-2">🍽️</p>
          <p className="text-muted-foreground font-medium">No items in this category</p>
        </div>}
    </div>;
};
export default AdminMenu;