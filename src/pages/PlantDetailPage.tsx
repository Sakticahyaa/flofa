import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf, Calendar, Bug, AlertTriangle, Shield } from 'lucide-react';
import Searchbar from '../components/Searchbar';
import { plantService } from '../services/plantService';
import { Plant } from '../types/Plant';

export default function PlantDetailPage() {
  const { plantId } = useParams();
  const navigate = useNavigate();
  
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlant = async () => {
      if (!plantId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const data = await plantService.getPlantById(plantId);
        
        if (data) {
          setPlant(data);
        } else {
          setError('Plant not found');
        }
      } catch (err) {
        setError((err as Error).message || 'Failed to load plant details');
        console.error('Error fetching plant:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [plantId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  const parseItems = (items: string) => {
    return items.split(',').map(item => item.trim()).filter(item => item);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="text-green-600 font-medium">Loading plant details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <Leaf className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Error Loading Plant</h2>
            <p className="text-lg">{error}</p>
          </div>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Plant Not Found</h2>
          <p className="text-gray-600 mb-6">The requested plant could not be found.</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
            onClick={handleBack}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Kembali ke daftar tanaman</span>
          </button>
          
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="w-full sm:w-80">
              <Searchbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </div>
            <button 
              onClick={handleBackToLanding}
              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-200"
              title="Kembali ke Beranda"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-green-200/50 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">Detail Tanaman</h1>
          </div>

          {/* Plant Name */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {plant.nama_tanaman}
            </h2>
          </div>

          {/* Plant Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Last Updated */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Terakhir Diperbarui
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">
                  {new Date(plant.terakhir_diperbarui).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Plant Name */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Nama Tanaman
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{plant.nama_tanaman}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Plant Type */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Jenis Tanaman
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    plant.jenis_tanaman === 'Pangan' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {plant.jenis_tanaman}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Pest and Disease Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Pest Information */}
            <div className="bg-red-50/50 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-red-800 mb-4 flex items-center">
                <Bug className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600" />
                Informasi Hama
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Potensi Hama:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {parseItems(plant.potensi_hama).map((hama, index) => (
                      <li key={index}>{hama}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Gejala:</h4>
                  <p className="text-sm text-gray-700">{plant.gejala_hama}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Pengendalian:</h4>
                  <p className="text-sm text-gray-700">{plant.pengendalian_hama}</p>
                </div>
              </div>
            </div>

            {/* Disease Information */}
            <div className="bg-orange-50/50 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-orange-800 mb-4 flex items-center">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-600" />
                Informasi Penyakit
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-orange-700 mb-2">Potensi Penyakit:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {parseItems(plant.potensi_penyakit).map((penyakit, index) => (
                      <li key={index}>{penyakit}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-700 mb-2">Gejala:</h4>
                  <p className="text-sm text-gray-700">{plant.gejala_penyakit}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-700 mb-2">Pengendalian:</h4>
                  <p className="text-sm text-gray-700">{plant.pengendalian_penyakit}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}