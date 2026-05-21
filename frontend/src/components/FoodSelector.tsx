import { useState, useEffect, useRef, useCallback } from 'react'
import { searchFoods, getAllFoods } from '../api/carbonApi'
import type { FoodItem, FoodInput } from '../types/carbon'

interface Props {
  selected: FoodInput[]
  onChange: (items: FoodInput[]) => void
}

export default function FoodSelector({ selected, onChange }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<FoodItem[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      setShowDropdown(false)
      return
    }
    setLoading(true)
    try {
      const items = await searchFoods(q)
      setResults(items)
      setShowDropdown(true)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleInputChange = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => doSearch(value), 200)
  }

  const addFood = (food: FoodItem) => {
    if (selected.some((s) => s.foodId === food.id)) return
    onChange([...selected, { foodId: food.id, kgPerWeek: 0.5 }])
    setQuery('')
    setShowDropdown(false)
  }

  const updateAmount = (foodId: string, kgPerWeek: number) => {
    onChange(selected.map((s) => (s.foodId === foodId ? { ...s, kgPerWeek } : s)))
  }

  const removeFood = (foodId: string) => {
    onChange(selected.filter((s) => s.foodId !== foodId))
  }

  const totalCo2 = selected.reduce((sum, s) => {
    const found = results.find((r) => r.id === s.foodId) || allFoodsCache.find((f) => f.id === s.foodId)
    return sum + (found?.co2PerKg ?? 0) * s.kgPerWeek * 52
  }, 0)

  const [allFoodsCache, setAllFoodsCache] = useState<FoodItem[]>([])
  useEffect(() => {
    getAllFoods().then(setAllFoodsCache)
  }, [])

  const selectedFoods = selected.map((s) => ({
    input: s,
    food: allFoodsCache.find((f) => f.id === s.foodId),
  }))

  return (
    <div className="food-selector" ref={containerRef}>
      <div className="food-search-box">
        <input
          type="text"
          placeholder="Besin ara (örn. dana eti, süt, elma)..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => query.trim() && setShowDropdown(true)}
        />
        {loading && <span className="search-spinner">⌛</span>}
      </div>

      {showDropdown && results.length > 0 && (
        <ul className="food-dropdown">
          {results.map((food) => (
            <li key={food.id} onClick={() => addFood(food)}>
              <strong>{food.name}</strong>
              <span className="food-category">{food.category}</span>
              <span className="food-co2">{food.co2PerKg} kg CO₂/kg</span>
            </li>
          ))}
        </ul>
      )}

      {selected.length > 0 && (
        <div className="selected-foods">
          <h4>Seçilen Besinler</h4>
          {selectedFoods.map(({ input, food }) => (
            <div key={input.foodId} className="selected-food-item">
              <span className="food-name">{food?.name ?? input.foodId}</span>
              <div className="food-amount">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={input.kgPerWeek}
                  onChange={(e) => updateAmount(input.foodId, parseFloat(e.target.value) || 0)}
                />
                <span>kg/hafta</span>
              </div>
              <span className="food-annual-co2">
                ~{((food?.co2PerKg ?? 0) * input.kgPerWeek * 52).toFixed(0)} kg CO₂/yıl
              </span>
              <button className="remove-btn" onClick={() => removeFood(input.foodId)}>✕</button>
            </div>
          ))}
          <div className="food-total">
            Toplam: <strong>{(totalCo2 / 1000).toFixed(2)} ton CO₂/yıl</strong>
          </div>
        </div>
      )}
    </div>
  )
}
