import './App.css';
import HeroSection from "./components/sections/hero/HeroSection";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/AuthPages/login";
import Register from "./pages/AuthPages/register";
import AppSection from "./components/AppSection";
import ProfilePage from './pages/AuthPages/ProfilePage';
import TruckGrid from './components/TruckGrid';
import trucks from './components/trucks';

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Layout للتحكم في الهيدر والفوتر
function Layout({ children }) {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Header />}

      <main style={{ flex: 1, background: '#EBEAE0', padding: '2rem' }}>
        {children}
        {!hideLayout && <AppSection />}
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}

// App الرئيسي
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />

                <TruckGrid
                  trucks={trucks}
                  isLoading={false}
                  title="Featured Food Trucks"
                  onSeeAll={() => console.log('See all clicked')}
                  onCardClick={(truck) =>
                    console.log('Clicked:', truck.name)
                  }
                />
              </>
            }
          />

          {/* AUTH PAGES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROFILE */}
          <Route path="/ProfilePage" element={<ProfilePage />} />

          {/* HERO PAGE (اختياري) */}
          <Route path="/hero" element={<HeroSection />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}