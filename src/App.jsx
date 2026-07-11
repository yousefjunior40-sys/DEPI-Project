import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AppProvider } from "@/contexts/AppContext";

// ── Public Pages ────────────────────────────────────────────────────────────
import Index from "./pages/Index";
import TrucksListing from "./pages/TrucksListing";
import TruckDetails from "./pages/TruckDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderTracking from "./pages/OrderTracking";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PendingApprovalPage from "./pages/PendingApprovalPage";
import ProfilePage from "./pages/ProfilePage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

// ── Vendor Dashboard ────────────────────────────────────────────────────────
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminOrders from "./pages/admin/AdminOrders";
import MyTruck from "./pages/vendor/MyTruck";
import VendorReviews from "./pages/vendor/VendorReviews";
import VendorAnalytics from "./pages/vendor/VendorAnalytics";
import VendorSettings from "./pages/vendor/VendorSettings";

// ── Platform Admin Dashboard ────────────────────────────────────────────────
import PlatformAdminLayout from "./components/PlatformAdminLayout";
import PlatformDashboard from "./pages/platform-admin/PlatformDashboard";
import PlatformOrders from "./pages/platform-admin/PlatformOrders";
import PlatformTrucks from "./pages/platform-admin/PlatformTrucks";
import PlatformUsers from "./pages/platform-admin/PlatformUsers";
import PlatformDelivery from "./pages/platform-admin/PlatformDelivery";
import PlatformReports from "./pages/platform-admin/PlatformReports";
const queryClient = new QueryClient();
const App = () => <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* ── Public Routes ─────────────────────────────────────────── */}
              <Route path="/" element={<Index />} />
              <Route path="/trucks" element={<TrucksListing />} />
              <Route path="/trucks/:id" element={<TruckDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order/:id" element={<OrderTracking />} />
              <Route path="/orders" element={<MyOrdersPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/pending-approval" element={<PendingApprovalPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about" element={<AboutPage />} />

              {/* ── Vendor Dashboard (role-guarded inside AdminLayout) ──── */}
              <Route path="/vendor" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="my-truck" element={<MyTruck />} />
                <Route path="menu" element={<AdminMenu />} />
                <Route path="reviews" element={<VendorReviews />} />
                <Route path="analytics" element={<VendorAnalytics />} />
                <Route path="settings" element={<VendorSettings />} />
              </Route>

              {/* ── Keep legacy /admin path working for vendor ──────────── */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="menu" element={<AdminMenu />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>

              {/* ── Platform Admin (role-guarded inside PlatformAdminLayout) */}
              <Route path="/platform-admin" element={<PlatformAdminLayout />}>
                <Route index element={<PlatformDashboard />} />
                <Route path="orders" element={<PlatformOrders />} />
                <Route path="trucks" element={<PlatformTrucks />} />
                <Route path="users" element={<PlatformUsers />} />
                <Route path="delivery" element={<PlatformDelivery />} />
                <Route path="reports" element={<PlatformReports />} />
              </Route>

              {/* ── 404 ───────────────────────────────────────────────────── */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>;
export default App;