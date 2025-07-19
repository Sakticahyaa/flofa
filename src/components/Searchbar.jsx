/**
 * Search Bar Component
 * 
 * Purpose:
 * - Provides real-time search functionality for books
 * - Handles user input with immediate feedback
 * - Integrates with book filtering system
 * 
 * Features:
 * - Real-time search as user types
 * - Search icon for visual clarity
 * - Responsive design with backdrop blur effect
 * - Placeholder text for user guidance
 * 
 * Access: Used in BookListPage and BookDetailPage
 * Integration: Works with useBooks hook for live filtering
 */

import React from 'react';
import { Search } from 'lucide-react';

/**
 * Searchbar Component Props
 * @param {string} searchTerm - Current search input value
 * @param {function} onSearchChange - Callback for search input changes
 */
export default function Searchbar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-emerald-200/50">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-emerald-500" />
      </div>
      <input
        type="text"
        placeholder="Cari"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 bg-transparent border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-500 text-gray-900"
      />
    </div>
  );
}