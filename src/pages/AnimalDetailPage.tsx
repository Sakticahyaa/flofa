import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Heart, Calendar, Shield, Activity } from 'lucide-react';
import Searchbar from '../components/Searchbar';
import { animalService } from '../services/animalService';
import { Animal } from '../types/Animal';

export default function AnimalDetailPage() {
  const { animalId } = useParams();
  const navigate = useNavigate();
  
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAnimal = async () => {
      if (!animalId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const data = await animalService.getAnimalById(animalId);
        
        if (data) {
          setAnimal(data);
        } else {
          setError('Animal not found');
        }
      } catch (err) {
        setError((err as Error).message || 'Failed to load animal details');
        console.error('Error fetching animal:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [animalId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="text-green-600 font-medium">Loading animal details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <Heart className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Error Loading Animal</h2>
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

  if (!animal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Animal Not Found</h2>
          <p className="text-gray-600 mb-6">The requested animal could not be found.</p>
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
            <span className="font-medium">Kembali ke daftar hewan</span>
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
            <h1 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">Detail Hewan</h1>
          </div>

          {/* Animal Owner */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Hewan milik {animal.nama_pemilik}
            </h2>
          </div>

          {/* Animal Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Last Updated */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Terakhir Diperbarui
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">
                  {new Date(animal.terakhir_diperbarui).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Owner */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Nama Pemilik
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{animal.nama_pemilik}</p>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Lokasi
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{animal.lokasi}</p>
              </div>

              {/* Animal Type */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Jenis Hewan
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{animal.jenis_hewan}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Gender */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Jenis Kelamin
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{animal.jenis_kelamin}</p>
              </div>

              {/* Age Range */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Rentang Usia
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{animal.rentang_usia}</p>
              </div>

              {/* Disease History */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Riwayat Penyakit
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    animal.riwayat_penyakit === 'Pernah' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {animal.riwayat_penyakit}
                  </span>
                </p>
              </div>

              {/* Vaccination History */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Riwayat Vaksin
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    animal.riwayat_vaksin === 'Pernah' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {animal.riwayat_vaksin}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}