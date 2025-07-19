import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MoreVertical, Leaf } from 'lucide-react';
import { Plant } from '../types/Plant';

interface PlantTableProps {
  plants: Plant[];
  loading: boolean;
  error: string | null;
  onPlantClick: (plant: Plant) => void;
}

export default function PlantTable({ plants, loading, error, onPlantClick }: PlantTableProps) {
  const [sortOrder, setSortOrder] = useState({ field: '', direction: 'asc' });

  const sortedPlants = React.useMemo(() => {
    if (!sortOrder.field || !plants) return plants;
    
    return [...plants].sort((a, b) => {
      const aValue = a[sortOrder.field as keyof Plant];
      const bValue = b[sortOrder.field as keyof Plant];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortOrder.direction === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }
      return 0;
    });
  }, [plants, sortOrder]);

  const handleSort = (field: string) => {
    const newDirection = sortOrder.field === field && sortOrder.direction === 'asc' ? 'desc' : 'asc';
    setSortOrder({ field, direction: newDirection });
  };

  const SortButton = ({ field }: { field: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="ml-2 inline-flex flex-col items-center justify-center h-4 w-4 text-gray-400 hover:text-gray-600"
    >
      <ChevronUp
        className={`w-3 h-3 ${sortOrder.field === field && sortOrder.direction === 'asc' ? 'text-gray-700' : 'text-gray-400'}`}
      />
      <ChevronDown
        className={`w-3 h-3 ${sortOrder.field === field && sortOrder.direction === 'desc' ? 'text-gray-700' : 'text-gray-400'}`}
      />
    </button>
  );

  const countItems = (items: string) => {
    return items.split(',').filter(item => item.trim()).length;
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-green-200/50 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="overflow-x-auto">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-3 text-green-600">Loading plants...</span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-red-600 text-center">
              <p className="font-medium">Error loading plants</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
        
        {!loading && !error && (
        <table className="w-full min-w-[600px]">
          <thead className="bg-green-50/80 backdrop-blur-sm border-b border-green-200">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-green-700 whitespace-nowrap">
                <div className="flex items-center">
                  Terakhir Diperbarui
                  <SortButton field="terakhir_diperbarui" />
                </div>
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-green-700 whitespace-nowrap">
                <div className="flex items-center">
                  Nama Tanaman
                  <SortButton field="nama_tanaman" />
                </div>
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-green-700 whitespace-nowrap">
                Komoditas
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-green-700 whitespace-nowrap">
                Jumlah Potensi Hama
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-green-700 whitespace-nowrap">
                Jumlah Potensi Penyakit
              </th>
              <th className="px-3 sm:px-6 py-3 text-right font-medium text-green-700 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-green-100">
            {(!sortedPlants || sortedPlants.length === 0) ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-600">
                  <div className="flex flex-col items-center space-y-3">
                    <Leaf className="w-12 h-12 text-gray-400" />
                    Tidak ada data tanaman
                  </div>
                </td>
              </tr>
            ) : (
              sortedPlants.map((plant) => (
                <tr 
                  key={plant.id} 
                  className="hover:bg-green-50/50 cursor-pointer transition-colors duration-200 group"
                  onClick={() => onPlantClick(plant)}
                >
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-green-800 transition-colors duration-200">
                      {new Date(plant.terakhir_diperbarui).toLocaleDateString('id-ID')}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{plant.nama_tanaman}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      plant.jenis_tanaman === 'Pangan' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {plant.jenis_tanaman}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {countItems(plant.potensi_hama)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {countItems(plant.potensi_penyakit)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-green-600 transition-colors duration-200">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
}