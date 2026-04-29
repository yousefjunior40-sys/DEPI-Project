import "./App.css";
import HeroSection from "./components/sections/hero/HeroSection";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/AuthPages/login";
import Register from "./pages/AuthPages/register";
import AppSection from "./components/AppSection";
import ProfilePage from "./pages/AuthPages/ProfilePage";
import TruckGrid from "./components/TruckGrid";
import trucks from "./components/trucks";
import TruckDetail from "./components/TruckDetail";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import FoodTrucks from "./components/FoodTrucks";

function Layout({ children }) {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Header />}

      {/* ← شيلنا padding من هنا */}
      <main style={{ flex: 1, background: "#EBEAE0" }}>
        {children}
        {!hideLayout && (
          // ← الـ padding بقى هنا على AppSection بس
          <div style={{ padding: "2rem" }}>
            <AppSection />
          </div>
        )}
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              {/* Hero بدون padding — بيمتد full width */}
              <HeroSection />

              {/* TruckGrid فيها padding داخلي */}
              <div style={{ padding: "0 2rem" }}>
                <TruckGrid
                  trucks={trucks}
                  isLoading={false}
                  title="Featured Food Trucks"
                  onSeeAll={() => console.log("See all clicked")}
                  onCardClick={(truck) => navigate(`/truck/${truck.id}`)}
                />
              </div>
            </>
          }
        />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROFILE */}
        <Route path="/ProfilePage" element={<ProfilePage />} />

        {/* HERO PAGE */}
        <Route path="/hero" element={<HeroSection />} />

        <Route path="/food-trucks" element={<FoodTrucks />} />
        {/* TRUCK DETAIL */}
        <Route
          path="/truck/:id"
          element={<TruckDetail onBack={() => navigate(-1)} />}
        />
      </Routes>
    </Layout>
  );
}
