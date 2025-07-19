import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AnimalListPage from './pages/AnimalListPage';
import PlantListPage from './pages/PlantListPage';
import AnimalDetailPage from './pages/AnimalDetailPage';
import PlantDetailPage from './pages/PlantDetailPage';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Animal Routes */}
        <Route path="/hewan" element={<AnimalListPage />} />
        <Route path="/hewan/detail/:animalId" element={<AnimalDetailPage />} />
        
        {/* Plant Routes */}
        <Route path="/tanaman" element={<PlantListPage />} />
        <Route path="/tanaman/detail/:plantId" element={<PlantDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;