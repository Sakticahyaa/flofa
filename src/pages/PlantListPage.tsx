import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf } from 'lucide-react';
import Searchbar from '../components/Searchbar';
import PlantFilter from '../components/PlantFilter';
import PlantTable from '../components/PlantTable';
import { usePlants } from '../hooks/usePlants';
import { Plant } from '../types/Plant';

export default function PlantListPage() {
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    jenis_tanaman: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const { plants, loading, error } = usePlants(filters, searchTerm);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handlePlantClick = (plant: Plant) => {
    navigate(`/tanaman/detail/${plant.id}`);
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-300 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-green-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-28 h-28 bg-green-200 rounded-full animate-bounce delay-500"></div>
      </div>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-green-200 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-4 gap-4">
          <button
            onClick={handleBackToLanding}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Kembali ke Beranda</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center shadow-md">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-green-800 font-semibold">Data Tanaman</span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">Data Tanaman</h1>
          <p className="text-green-600">Pendataan penyakit tanaman di Kelurahan Bugel, Salatiga</p>
        </div>
        
        {/* Search and Filter Controls */}
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-10 justify-between items-stretch lg:items-center mb-6'>
          <div className='flex-1 order-2 lg:order-1 z-30'>
            <PlantFilter filters={filters} onFilterChange={handleFilterChange} />
          </div>
          
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <Searchbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </div>
        </div>
        
        {/* Plant Table */}
        <div className="space-y-4">
          <PlantTable 
            plants={plants}
            loading={loading}
            error={error}
            onPlantClick={handlePlantClick}
          />
        </div>
      </main>
    </div>
  );
}