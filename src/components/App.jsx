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
      <main style={{ flex: 1, background: "#EBEAE0" }}>
        {children}
        {!hideLayout && (
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
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <div style={{ padding: "0 2rem" }}>
                <TruckGrid
                  trucks={trucks}
                  isLoading={false}
                  title="Featured Food Trucks"
                  showSearch={false}
                  onSeeAll={() => console.log("See all clicked")}
                  onCardClick={(truck) => navigate(`/truck/${truck.id}`)}
                />
              </div>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/food-trucks" element={<FoodTrucks />} />
        <Route
          path="/truck/:id"
          element={<TruckDetail onBack={() => navigate(-1)} />}
        />
      </Routes>
    </Layout>
  );
}
