import { useApp } from "@/contexts/AppContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { DollarSign, ShoppingBag, Store, Star, Clock } from "lucide-react";
const COLORS = ["#FF6B6B", "#4ECDC4", "#45B6FE", "#FAC863", "#C77CFF"];
const PlatformReports = () => {
  const {
    data
  } = useApp();
  const deliveredOrders = data.orders.filter(o => o.status === "delivered");
  const totalSales = deliveredOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = data.orders.length;

  // Best selling truck
  const truckSalesVolume = {};
  data.orders.forEach(o => {
    if (!truckSalesVolume[o.truckId]) {
      truckSalesVolume[o.truckId] = {
        name: o.truckName,
        count: 0
      };
    }
    truckSalesVolume[o.truckId].count++;
  });
  const sortedSales = Object.values(truckSalesVolume).sort((a, b) => b.count - a.count);
  const bestSellingTruck = sortedSales[0]?.name ?? "Smoky Joe's BBQ";

  // Highest rated truck
  const activeTrucks = data.trucks.filter(t => t.status === "active");
  const sortedRatings = [...activeTrucks].sort((a, b) => b.rating - a.rating);
  const highestRatedTruck = sortedRatings[0]?.name ?? "Rolling Sushi";

  // Average Preparation Time of active trucks
  const avgPrepTime = activeTrucks.length > 0 ? Math.round(activeTrucks.reduce((sum, t) => sum + t.prepTime, 0) / activeTrucks.length) : 0;

  // Monthly Sales trend mock/simulated (so it renders beautifully)
  const monthlyData = [{
    month: "Jan",
    Sales: 140,
    Revenue: 2100
  }, {
    month: "Feb",
    Sales: 220,
    Revenue: 3400
  }, {
    month: "Mar",
    Sales: 380,
    Revenue: 5900
  }, {
    month: "Apr",
    Sales: 420,
    Revenue: 6800
  }, {
    month: "May",
    Sales: 510,
    Revenue: 8100
  }, {
    month: "Jun",
    Sales: 620,
    Revenue: 9800
  }, {
    month: "Jul",
    Sales: totalOrdersCount > 0 ? totalOrdersCount * 5 : 750,
    Revenue: totalSales > 0 ? totalSales * 5 : 12400
  }];

  // Food Truck Market Share data for BarChart
  const shareData = activeTrucks.map((t, idx) => {
    const ordersCount = data.orders.filter(o => o.truckId === t.id).length;
    return {
      name: t.name,
      Orders: ordersCount > 0 ? ordersCount : Math.floor(Math.random() * 20) + 5
    };
  }).sort((a, b) => b.Orders - a.Orders);
  const kpis = [{
    label: "Gross Merchandise Value",
    value: `$${totalSales.toFixed(2)}`,
    desc: "All time delivered gross sales volume",
    icon: DollarSign,
    color: "bg-accent/10 text-accent"
  }, {
    label: "System Orders",
    value: totalOrdersCount.toString(),
    desc: "Gross order counts processed",
    icon: ShoppingBag,
    color: "bg-primary/10 text-primary"
  }, {
    label: "Top Merchant",
    value: bestSellingTruck,
    desc: "Highest transaction count listing",
    icon: Store,
    color: "bg-secondary/10 text-secondary"
  }, {
    label: "Customer Favorite",
    value: highestRatedTruck,
    desc: "Highest average customer rating",
    icon: Star,
    color: "bg-amber-100 text-amber-800"
  }, {
    label: "Avg Preparation Speed",
    value: `${avgPrepTime} min`,
    desc: "Average operational setup speed",
    icon: Clock,
    color: "bg-primary/10 text-primary"
  }];
  return <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold font-display">System Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Global performance metrics, monthly sales curves, and merchant leaderboards.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => <div key={idx} className="bg-card rounded-xl border border-border shadow-soft p-5">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-muted-foreground font-semibold uppercase">{kpi.label}</span>
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <p className="text-xl font-bold font-display leading-tight">{kpi.value}</p>
            <p className="text-[10px] text-muted-foreground mt-2 leading-normal">{kpi.desc}</p>
          </div>)}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-card rounded-xl border border-border shadow-soft p-5 lg:col-span-2">
          <h3 className="font-display font-semibold text-base mb-4 text-foreground">Monthly Revenue Growth ($)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0
            }}>
                <defs>
                  <linearGradient id="colorPlatform" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Area type="monotone" dataKey="Revenue" stroke="hsl(var(--accent))" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPlatform)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Merchant Performance */}
        <div className="bg-card rounded-xl border border-border shadow-soft p-5">
          <h3 className="font-display font-semibold text-base mb-4 text-foreground">Merchant Order Volumes</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shareData} layout="vertical" margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis type="number" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="name" type="category" width={90} fontSize={10} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="Orders" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                  {shareData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>;
};
export default PlatformReports;