import { useState, useEffect } from 'react'
import { animalService } from '../services/animalService'

export const useAnimals = (filters = {}, searchTerm = '') => {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAnimals = async () => {
    try {
      setLoading(true)
      setError(null)

      let data = []

      if (searchTerm || filters.jenis_kelamin || filters.rentang_usia || filters.lokasi) {
        data = await animalService.searchAnimals(searchTerm, filters)
      } else {
        data = await animalService.getAllAnimals()
      }

      setAnimals(data)
    } catch (err) {
      setError(err.message)
      console.error('Error in useAnimals:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnimals()
  }, [filters.jenis_kelamin, filters.rentang_usia, filters.lokasi, searchTerm])

  return {
    animals,
    loading,
    error,
    refetch: fetchAnimals
  }
}