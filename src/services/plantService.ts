import { supabase } from '../lib/supabase'

export const plantService = {
  async getAllPlants() {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using fallback data')
        return []
      }

      const { data, error } = await supabase
        .from('tanaman')
        .select('*')
        .order('terakhir_diperbarui', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching plants:', error)
      return []
    }
  },

  async searchPlants(searchTerm, filters = {}) {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using fallback data')
        return []
      }

      let query = supabase
        .from('tanaman')
        .select('*')

      if (searchTerm) {
        query = query.or(`nama_tanaman.ilike.%${searchTerm}%,jenis_tanaman.ilike.%${searchTerm}%,potensi_hama.ilike.%${searchTerm}%,potensi_penyakit.ilike.%${searchTerm}%`)
      }

      if (filters.jenis_tanaman) {
        query = query.eq('jenis_tanaman', filters.jenis_tanaman)
      }

      query = query.order('terakhir_diperbarui', { ascending: false })

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error searching plants:', error)
      return []
    }
  },

  async getPlantById(id) {
    try {
      const { data, error } = await supabase
        .from('tanaman')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching plant by ID:', error)
      return null
    }
  }
}