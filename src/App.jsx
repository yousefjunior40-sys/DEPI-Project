import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import TruckGrid from './components/TruckGrid';
import trucks from './components/trucks';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <main style={{ flex: 1, background: '#EBEAE0', padding: '2rem' }}>
          <Routes>
            <Route
              path="/"
              element={
                <TruckGrid
                  trucks={trucks}
                  isLoading={false}
                  title="Featured Food Trucks"
                  onSeeAll={() => console.log('See all clicked')}
                  onCardClick={(truck) => console.log('Clicked:', truck.name)}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}