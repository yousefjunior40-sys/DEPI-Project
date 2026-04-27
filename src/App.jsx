import './App.css';
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
          <Route
            path="/"
            element={
              <TruckGrid
                trucks={trucks}
                isLoading={false}
                title="Featured Food Trucks"
                onSeeAll={() => console.log('See all clicked')}
                onCardClick={(truck) =>
                  console.log('Clicked:', truck.name)
                }
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
