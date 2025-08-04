import { useState, useEffect } from 'react'
import { plantService } from '../services/plantService'
import { Plant } from '../types/Plant'

export const usePlants = (filters: { jenis_tanaman?: string } = {}, searchTerm = '') => {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlants = async () => {
    try {
      setLoading(true)
      setError(null)

      let data: Plant[] = []

      if (searchTerm || filters.jenis_tanaman) {
        data = await plantService.searchPlants(searchTerm, filters)
      } else {
        data = await plantService.getAllPlants()
      }

      setPlants(data)
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch plants')
      console.error('Error in usePlants:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlants()
  }, [filters.jenis_tanaman, searchTerm])

  return {
    plants,
    loading,
    error,
    refetch: fetchPlants
  }
}