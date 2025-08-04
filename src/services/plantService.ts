import { supabase } from '../lib/supabase'
import { Plant } from '../types/Plant'

export const plantService = {
  async getAllPlants(): Promise<Plant[]> {
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

      // Transform the data to ensure JSON fields are properly parsed
      const transformedData = (data || []).map(plant => ({
        ...plant,
        hama: Array.isArray(plant.hama) ? plant.hama : [],
        penyakit: Array.isArray(plant.penyakit) ? plant.penyakit : []
      }))

      return transformedData
    } catch (error) {
      console.error('Error fetching plants:', error)
      return []
    }
  },

  async searchPlants(searchTerm: string, filters: { jenis_tanaman?: string } = {}): Promise<Plant[]> {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using fallback data')
        return []
      }

      let query = supabase
        .from('tanaman')
        .select('*')

      // Apply search term if provided
      if (searchTerm) {
        query = query.or(`nama_tanaman.ilike.%${searchTerm}%,nama_latin.ilike.%${searchTerm}%`)
      }

      // Apply filters
      if (filters.jenis_tanaman) {
        query = query.eq('jenis_tanaman', filters.jenis_tanaman)
      }

      query = query.order('terakhir_diperbarui', { ascending: false })

      const { data, error } = await query

      if (error) throw error

      // Transform the data to ensure JSON fields are properly parsed
      const transformedData = (data || []).map(plant => ({
        ...plant,
        hama: Array.isArray(plant.hama) ? plant.hama : [],
        penyakit: Array.isArray(plant.penyakit) ? plant.penyakit : []
      }))

      return transformedData
    } catch (error) {
      console.error('Error searching plants:', error)
      return []
    }
  },

  async getPlantById(id: string): Promise<Plant | null> {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using fallback data')
        return null
      }

      const { data, error } = await supabase
        .from('tanaman')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      if (!data) return null

      // Transform the data to ensure JSON fields are properly parsed
      const transformedData = {
        ...data,
        hama: Array.isArray(data.hama) ? data.hama : [],
        penyakit: Array.isArray(data.penyakit) ? data.penyakit : []
      }

      return transformedData
    } catch (error) {
      console.error('Error fetching plant by ID:', error)
      return null
    }
  },

  // Helper function to get total count of pests for a plant
  getPestCount(plant: Plant): number {
    return plant.hama?.length || 0
  },

  // Helper function to get total count of diseases for a plant
  getDiseaseCount(plant: Plant): number {
    return plant.penyakit?.length || 0
  },

  // Helper function to get all pest names as a string
  getPestNames(plant: Plant): string {
    return plant.hama?.map(h => h.nama).join(', ') || ''
  },

  // Helper function to get all disease names as a string
  getDiseaseNames(plant: Plant): string {
    return plant.penyakit?.map(p => p.nama).join(', ') || ''
  }
}