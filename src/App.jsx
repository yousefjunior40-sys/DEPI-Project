import './App.css';
import Header from "./components/header";
import Footer from "./components/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes></Routes>
        <Footer />
      </>
    </BrowserRouter>
  )
}

export default App
