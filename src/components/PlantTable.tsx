import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MoreVertical, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import { Plant } from '../types/Plant';
import { plantService } from '../services/plantService';

interface PlantTableProps {
  plants: Plant[];
  loading: boolean;
  error: string | null;
  onPlantClick: (plant: Plant) => void;
}

export default function PlantTable({ plants, loading, error, onPlantClick }: PlantTableProps) {
  const [sortOrder, setSortOrder] = useState({ field: '', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

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

  // Pagination logic
  const totalItems = sortedPlants?.length || 0;
  const totalPages = pageSize === -1 ? 1 : Math.ceil(totalItems / pageSize);
  
  const paginatedPlants = React.useMemo(() => {
    if (!sortedPlants) return [];
    if (pageSize === -1) return sortedPlants; // Show all
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedPlants.slice(startIndex, endIndex);
  }, [sortedPlants, currentPage, pageSize]);

  // Reset to first page when page size changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  const handleSort = (field: string) => {
    const newDirection = sortOrder.field === field && sortOrder.direction === 'asc' ? 'desc' : 'asc';
    setSortOrder({ field, direction: newDirection });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
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

  return (
    <div className="relative z-10 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-green-200/50 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Page Size Selector */}
      <div className="p-4 bg-green-50/80 backdrop-blur-sm border-b border-green-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-green-700">Tampilkan:</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="px-3 py-1 text-sm border border-green-300 rounded-md bg-white/90 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={-1}>Semua</option>
          </select>
          <span className="text-sm text-green-600">data per halaman</span>
        </div>
        
        {totalItems > 0 && (
          <div className="text-sm text-green-600">
            {pageSize === -1 ? (
              `Menampilkan semua ${totalItems} data`
            ) : (
              `Menampilkan ${Math.min((currentPage - 1) * pageSize + 1, totalItems)}-${Math.min(currentPage * pageSize, totalItems)} dari ${totalItems} data`
            )}
          </div>
        )}
      </div>

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
        <table className="w-full min-w-[800px] z-10">
          <thead className="bg-green-50/80 backdrop-blur-sm border-b border-green-200 z-10">
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
                Nama Latin
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-green-700 whitespace-nowrap">
                Komoditas
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-green-700 whitespace-nowrap">
                Jumlah Hama
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-green-700 whitespace-nowrap">
                Jumlah Penyakit
              </th>
              <th className="px-3 sm:px-6 py-3 text-right font-medium text-green-700 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-green-100">
            {(!paginatedPlants || paginatedPlants.length === 0) ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-600">
                  <div className="flex flex-col items-center space-y-3">
                    <Leaf className="w-12 h-12 text-gray-400" />
                    Tidak ada data tanaman
                  </div>
                </td>
              </tr>
            ) : (
              paginatedPlants.map((plant) => (
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
                    <div className="text-sm text-gray-900 font-medium">{plant.nama_tanaman}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 italic">
                      {plant.nama_latin || '-'}
                    </div>
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
                        {plantService.getPestCount(plant)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {plantService.getDiseaseCount(plant)}
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

      {/* Pagination Controls */}
      {!loading && !error && totalItems > 0 && pageSize !== -1 && totalPages > 1 && (
        <div className="px-4 py-3 bg-green-50/80 backdrop-blur-sm border-t border-green-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-green-300 rounded-md bg-white/90 text-green-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>
            
            <div className="flex items-center space-x-1">
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-sm border rounded-md transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white/90 text-green-700 border-green-300 hover:bg-green-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-green-300 rounded-md bg-white/90 text-green-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-1"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}