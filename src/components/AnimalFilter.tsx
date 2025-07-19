import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AnimalFilterProps {
  filters: {
    jenis_kelamin: string;
    rentang_usia: string;
    lokasi: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
}

export default function AnimalFilter({ filters, onFilterChange }: AnimalFilterProps) {
  const [dropdownOpen, setDropdownOpen] = useState({
    jenis_kelamin: false,
    rentang_usia: false,
    lokasi: false
  });

  const jenisKelaminOptions = ['Jantan', 'Betina'];
  const rentangUsiaOptions = ['Anakan', 'Dewasa non laktasi', 'Dewasa laktasi'];
  const lokasiOptions = ['RW 1', 'RW 2', 'RW 3', 'RW 4', 'RW 5', 'RW 6', 'RW 7'];

  const handleFilterChange = (filterType: string, value: string) => {
    onFilterChange(filterType, value);
    setDropdownOpen(prev => ({
      ...prev,
      [filterType]: false
    }));
  };

  const toggleDropdown = (filterType: string) => {
    setDropdownOpen(prev => ({
      ...prev,
      [filterType]: !prev[filterType as keyof typeof prev]
    }));
  };

  const DropdownButton = ({ filterType, options, placeholder }: { filterType: string; options: string[]; placeholder: string }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(filterType)}
        className="flex items-center justify-between w-full px-3 py-2 bg-white/80 backdrop-blur-sm border border-green-300 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[120px] shadow-sm transition-all duration-200"
      >
        <span className="text-sm truncate">
          {filters[filterType as keyof typeof filters] || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 text-green-600 ${dropdownOpen[filterType as keyof typeof dropdownOpen] ? 'rotate-180' : ''}`}
        />
      </button>
      
      {dropdownOpen[filterType as keyof typeof dropdownOpen] && (
        <div className="absolute z-20 mt-1 w-full bg-white/95 backdrop-blur-md border border-green-300 rounded-lg shadow-xl">
          <div className="py-1">
            <button
              onClick={() => handleFilterChange(filterType, '')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-green-50 transition-colors duration-200"
            >
              All
            </button>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleFilterChange(filterType, option)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-green-50 transition-colors duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white/70 backdrop-blur-md p-4 rounded-xl border border-green-200/50 shadow-lg">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-green-700 whitespace-nowrap">Jenis Kelamin</label>
          <DropdownButton
            filterType="jenis_kelamin"
            options={jenisKelaminOptions}
            placeholder="All"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-green-700 whitespace-nowrap">Rentang Usia</label>
          <DropdownButton
            filterType="rentang_usia"
            options={rentangUsiaOptions}
            placeholder="All"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-green-700 whitespace-nowrap">Lokasi</label>
          <DropdownButton
            filterType="lokasi"
            options={lokasiOptions}
            placeholder="All"
          />
        </div>
      </div>
    </div>
  );
}