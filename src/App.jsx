import './App.css';
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/AuthPages/login";
import Register from "./pages/AuthPages/register";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// بتحكم هنا في ظهور الهيدر والفوتر علشان لو موجود في اللوجين و الرجيستر يختفي
function Layout({ children }) {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/register"; 
  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;