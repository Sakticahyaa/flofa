import React from 'react';
import { Search } from 'lucide-react';

interface SearchbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function Searchbar({ searchTerm, onSearchChange }: SearchbarProps) {
  return (
    <div className="relative bg-white rounded-lg shadow-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Cari"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}