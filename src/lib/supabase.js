/**
 * Supabase Client Configuration
 * 
 * Purpose:
 * - Initializes Supabase client for database operations
 * - Handles environment variable configuration
 * - Provides fallback behavior when not configured
 * - Creates singleton client instance for app-wide use
 * 
 * Features:
 * - Environment-aware configuration
 * - Graceful degradation when unconfigured
 * - Mock client for development without database
 * - Centralized database connection management
 * 
 * Access: Used by bookService for all database operations
 * Configuration: Requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables
 */

import { createClient } from '@supabase/supabase-js'

// Extract environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Initialize Supabase client variable
let supabase = null

/**
 * Supabase Client Initialization
 * 
 * Purpose: Creates appropriate client based on environment configuration
 * - Creates real Supabase client when properly configured
 * - Creates mock client when environment variables are missing
 * - Prevents application crashes due to missing configuration
 */
// Create a fallback client if environment variables are not set
if (supabaseUrl && supabaseAnonKey) {
  // Create real Supabase client with environment credentials
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Log warning and create mock client for development
  console.warn('Supabase environment variables not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
  
  /**
   * Mock Supabase Client
   * 
   * Purpose: Provides fallback functionality when database is not configured
   * - Prevents application crashes
   * - Returns empty data for read operations
   * - Returns errors for write operations
   * - Maintains consistent API interface
   */
  // Create a mock client to prevent errors
  supabase = {
    from: () => ({
      // Mock read operations - return empty data
      select: () => ({ data: [], error: null }),
      // Mock write operations - return configuration errors
      insert: () => ({ data: null, error: new Error('Supabase not configured') }),
      update: () => ({ data: null, error: new Error('Supabase not configured') }),
      delete: () => ({ error: new Error('Supabase not configured') }),
      // Mock query builders - return self for chaining
      eq: function() { return this },
      or: function() { return this },
      order: function() { return this },
      single: function() { return this }
    })
  }
}

// Export configured client
export { supabase }