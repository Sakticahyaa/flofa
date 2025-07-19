import { useState, useEffect } from 'react'
import { plantService } from '../services/plantService'

export const usePlants = (filters = {}, searchTerm = '') => {
  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPlants = async () => {
    try {
      setLoading(true)
      setError(null)

      let data = []

      if (searchTerm || filters.jenis_tanaman) {
        data = await plantService.searchPlants(searchTerm, filters)
      } else {
        data = await plantService.getAllPlants()
      }

      setPlants(data)
    } catch (err) {
      setError(err.message)
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