import { useApp } from "@/contexts/AppContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from "recharts";
import { DollarSign, ShoppingBag, Percent, Award } from "lucide-react";
const COLORS = ["#FF6B6B", "#4ECDC4", "#45B6FE", "#FAC863", "#C77CFF"];
const VendorAnalytics = () => {
  const {
    currentUser,
    getVendorTruck,
    getTruckOrders
  } = useApp();
  if (!currentUser) return null;
  const truck = getVendorTruck(currentUser.id);
  if (!truck) {
    return <div className="text-center py-12">
        <p className="text-muted-foreground font-medium">Truck profile not configured.</p>
      </div>;
  }
  const orders = getTruckOrders(truck.id);
  const deliveredOrders = orders.filter(o => o.status === "delivered");

  // Revenue & sales calculations
  const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const conversionRate = totalOrdersCount > 0 ? (deliveredOrders.length / totalOrdersCount * 100).toFixed(0) : "0";

  // Build daily sales & revenue chart data (last 7 days simulated or actual)
  const dailySalesData = [{
    day: "Mon",
    Sales: 0,
    Revenue: 0
  }, {
    day: "Tue",
    Sales: 0,
    Revenue: 0
  }, {
    day: "Wed",
    Sales: 0,
    Revenue: 0
  }, {
    day: "Thu",
    Sales: 0,
    Revenue: 0
  }, {
    day: "Fri",
    Sales: 0,
    Revenue: 0
  }, {
    day: "Sat",
    Sales: 0,
    Revenue: 0
  }, {
    day: "Sun",
    Sales: 0,
    Revenue: 0
  }];
  deliveredOrders.forEach(o => {
    const dateObj = new Date(o.createdAt);
    const dayIndex = (dateObj.getDay() + 6) % 7; // Align Monday first
    dailySalesData[dayIndex].Sales++;
    dailySalesData[dayIndex].Revenue = parseFloat((dailySalesData[dayIndex].Revenue + o.total).toFixed(2));
  });

  // If no actual data yet, populate mock trend to look beautiful
  const hasOrders = deliveredOrders.length > 0;
  const displaySalesData = hasOrders ? dailySalesData : [{
    day: "Mon",
    Sales: 12,
    Revenue: 180
  }, {
    day: "Tue",
    Sales: 19,
    Revenue: 285
  }, {
    day: "Wed",
    Sales: 15,
    Revenue: 220
  }, {
    day: "Thu",
    Sales: 22,
    Revenue: 340
  }, {
    day: "Fri",
    Sales: 34,
    Revenue: 510
  }, {
    day: "Sat",
    Sales: 45,
    Revenue: 720
  }, {
    day: "Sun",
    Sales: 38,
    Revenue: 590
  }];

  // Best Selling Items (Aggregate from orders menu items)
  const itemCounts = {};
  deliveredOrders.forEach(o => {
    o.items.forEach(item => {
      if (!itemCounts[item.id]) {
        itemCounts[item.id] = {
          name: item.name,
          count: 0,
          value: 0
        };
      }
      itemCounts[item.id].count += item.quantity;
      itemCounts[item.id].value = parseFloat((itemCounts[item.id].value + item.price * item.quantity).toFixed(2));
    });
  });
  const bestSellers = Object.values(itemCounts).sort((a, b) => b.count - a.count).slice(0, 5);
  const displayBestSellers = bestSellers.length > 0 ? bestSellers : [{
    name: "Brisket Plate",
    count: 42,
    value: 629
  }, {
    name: "Loaded Fries",
    count: 35,
    value: 279
  }, {
    name: "Pork Sandwich",
    count: 28,
    value: 335
  }, {
    name: "Sweet Tea",
    count: 20,
    value: 59
  }, {
    name: "Cornbread",
    count: 12,
    value: 47
  }];

  // Peak Hours (simulated or parsed from timestamps)
  const hourCounts = {
    "11:00 AM": 0,
    "1:00 PM": 0,
    "3:00 PM": 0,
    "5:00 PM": 0,
    "7:00 PM": 0,
    "9:00 PM": 0
  };
  deliveredOrders.forEach(o => {
    const hr = new Date(o.createdAt).getHours();
    if (hr >= 11 && hr < 13) hourCounts["11:00 AM"]++;else if (hr >= 13 && hr < 15) hourCounts["1:00 PM"]++;else if (hr >= 15 && hr < 17) hourCounts["3:00 PM"]++;else if (hr >= 17 && hr < 19) hourCounts["5:00 PM"]++;else if (hr >= 19 && hr < 21) hourCounts["7:00 PM"]++;else hourCounts["9:00 PM"]++;
  });
  const peakHoursData = Object.entries(hourCounts).map(([hour, count]) => ({
    hour,
    Orders: count
  }));
  const displayPeakHours = hasOrders ? peakHoursData : [{
    hour: "11:00 AM",
    Orders: 15
  }, {
    hour: "1:00 PM",
    Orders: 32
  }, {
    hour: "3:00 PM",
    Orders: 18
  }, {
    hour: "5:00 PM",
    Orders: 28
  }, {
    hour: "7:00 PM",
    Orders: 45
  }, {
    hour: "9:00 PM",
    Orders: 22
  }];
  const topSoldItem = bestSellers[0]?.name ?? "Brisket Plate";
  const kpis = [{
    label: "Revenue",
    value: hasOrders ? `$${totalRevenue.toFixed(2)}` : "$2,844.00",
    desc: hasOrders ? "Actual delivered sales" : "Demo stats · Outperforming 2025",
    icon: DollarSign,
    color: "bg-accent/10 text-accent"
  }, {
    label: "Orders Count",
    value: hasOrders ? totalOrdersCount.toString() : "195",
    desc: hasOrders ? "Total requests" : "Demo stats · Steady demand",
    icon: ShoppingBag,
    color: "bg-primary/10 text-primary"
  }, {
    label: "Fulfillment Rate",
    value: hasOrders ? `${conversionRate}%` : "94%",
    desc: hasOrders ? "Accepted vs Delivered" : "Demo stats · High efficiency",
    icon: Percent,
    color: "bg-secondary/10 text-secondary"
  }, {
    label: "Top Performer",
    value: topSoldItem,
    desc: "Most volume sold",
    icon: Award,
    color: "bg-amber-100 text-amber-800"
  }];
  return <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review business trends, revenue spikes, and top-selling dishes. {!hasOrders && <span className="text-accent font-semibold">(Displaying demo trend analytics)</span>}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => <div key={idx} className="bg-card rounded-xl border border-border shadow-soft p-5">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-muted-foreground font-semibold uppercase">{kpi.label}</span>
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <p className="text-2xl font-bold font-display">{kpi.value}</p>
            <p className="text-[10px] text-muted-foreground mt-1 leading-normal">{kpi.desc}</p>
          </div>)}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Area Chart */}
        <div className="bg-card rounded-xl border border-border shadow-soft p-5 lg:col-span-2">
          <h3 className="font-display font-semibold text-base mb-4 text-foreground">Revenue Trend ($)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displaySalesData} margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0
            }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Area type="monotone" dataKey="Revenue" stroke="hsl(var(--accent))" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best Selling Items - Pie Chart */}
        <div className="bg-card rounded-xl border border-border shadow-soft p-5">
          <h3 className="font-display font-semibold text-base mb-4 text-foreground">Best Selling Items</h3>
          <div className="h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={displayBestSellers} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="count">
                  {displayBestSellers.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {displayBestSellers.map((item, idx) => <div key={idx} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{
                backgroundColor: COLORS[idx % COLORS.length]
              }} />
                  <span className="truncate text-muted-foreground font-medium">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">{item.count} items</span>
              </div>)}
          </div>
        </div>

        {/* Peak Hours - Bar Chart */}
        <div className="bg-card rounded-xl border border-border shadow-soft p-5 lg:col-span-3">
          <h3 className="font-display font-semibold text-base mb-4 text-foreground">Peak Ordering Hours</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={displayPeakHours} margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0
            }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="hour" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="Orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                  {displayPeakHours.map((entry, index) => <Cell key={`cell-${index}`} fill={index === 4 ? "hsl(var(--accent))" : "hsl(var(--primary))"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>;
};
export default VendorAnalytics;