import { supabase } from '../lib/supabase'

export const animalService = {
  async getAllAnimals() {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using fallback data')
        return []
      }

      const { data, error } = await supabase
        .from('hewan')
        .select('*')
        .order('terakhir_diperbarui', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching animals:', error)
      return []
    }
  },

  async getAnimalsByLocation(location) {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using fallback data')
        return []
      }

      const { data, error } = await supabase
        .from('hewan')
        .select('*')
        .eq('lokasi', location)
        .order('terakhir_diperbarui', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching animals by location:', error)
      return []
    }
  },

  async searchAnimals(searchTerm, filters = {}) {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using fallback data')
        return []
      }

      let query = supabase
        .from('hewan')
        .select('*')

      if (searchTerm) {
        query = query.or(`nama_pemilik.ilike.%${searchTerm}%,jenis_hewan.ilike.%${searchTerm}%,lokasi.ilike.%${searchTerm}%`)
      }

      if (filters.jenis_kelamin) {
        query = query.eq('jenis_kelamin', filters.jenis_kelamin)
      }
      if (filters.rentang_usia) {
        query = query.eq('rentang_usia', filters.rentang_usia)
      }
      if (filters.lokasi) {
        query = query.eq('lokasi', filters.lokasi)
      }

      query = query.order('terakhir_diperbarui', { ascending: false })

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error searching animals:', error)
      return []
    }
  },

  async getAnimalById(id) {
    try {
      const { data, error } = await supabase
        .from('hewan')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching animal by ID:', error)
      return null
    }
  }
}