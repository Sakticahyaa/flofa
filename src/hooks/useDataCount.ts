import { useState, useEffect } from 'react'
import { animalService } from '../services/animalService'
import { plantService } from '../services/plantService'

export const useDataCount = () => {
  const [animalCount, setAnimalCount] = useState(62) // Default fallback
  const [plantCount, setPlantCount] = useState(78) // Default fallback
  const [loading, setLoading] = useState(true)

  const fetchCounts = async () => {
    try {
      setLoading(true)
      const [animals, plants] = await Promise.all([
        animalService.getAllAnimals(),
        plantService.getAllPlants()
      ])
      setAnimalCount(animals.length)
      setPlantCount(plants.length)
    } catch (error) {
      console.error('Error fetching data counts:', error)
      // Keep default values on error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return {
    animalCount,
    plantCount,
    loading,
    refetch: fetchCounts
  }
}