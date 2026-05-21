import { useState, useEffect } from 'react'
import { getWasteCategories } from '../api/carbonApi'
import type { WasteCategory, WasteInput } from '../types/carbon'

interface Props {
  items: WasteInput[]
  onChange: (items: WasteInput[]) => void
}

const DISPOSAL_OPTIONS = [
  { value: 'landfill', label: 'Çöplük' },
  { value: 'incineration', label: 'Yakma' },
  { value: 'recycling', label: 'Geri Dönüşüm' },
]

export default function WasteDetail({ items, onChange }: Props) {
  const [categories, setCategories] = useState<WasteCategory[]>([])
  const [expandedFact, setExpandedFact] = useState<string | null>(null)

  useEffect(() => {
    getWasteCategories().then(setCategories)
  }, [])

  const getOrCreate = (type: string) => {
    let existing = items.find((i) => i.type === type)
    if (!existing) {
      existing = { type, kgPerWeek: 1, disposalMethod: 'landfill' }
      onChange([...items, existing])
    }
    return existing
  }

  const updateItem = (type: string, changes: Partial<WasteInput>) => {
    onChange(items.map((i) => (i.type === type ? { ...i, ...changes } : i)))
  }

  return (
    <div className="waste-detail">
      <h4>Atık Detayları</h4>
      <div className="waste-grid">
        {categories.map((cat) => {
          const item = items.find((i) => i.type === cat.type) || { type: cat.type, kgPerWeek: 0, disposalMethod: 'landfill' }
          const prodCo2 = item.kgPerWeek * cat.productionCo2PerKg * 52
          const disposalCo2 = item.disposalMethod === 'recycling'
            ? item.kgPerWeek * cat.recyclingSavingPerKg * 52 * -1
            : item.disposalMethod === 'incineration'
              ? item.kgPerWeek * cat.incinerationCo2PerKg * 52
              : item.kgPerWeek * cat.landfillCo2PerKg * 52
          const totalCo2 = prodCo2 + disposalCo2

          return (
            <div key={cat.type} className={`waste-card ${item.kgPerWeek > 0 ? 'active' : ''}`}>
              <div className="waste-card-header">
                <span className="waste-icon">{cat.icon}</span>
                <strong>{cat.label}</strong>
                <span className="waste-years">{cat.decompositionYears}</span>
              </div>

              <div className="waste-inputs">
                <label>
                  Miktar:
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={item.kgPerWeek}
                    onChange={(e) => updateItem(cat.type, { kgPerWeek: parseFloat(e.target.value) || 0 })}
                  />
                  <span>kg/hafta</span>
                </label>

                <label>
                  Bertaraf:
                  <select
                    value={item.disposalMethod}
                    onChange={(e) => updateItem(cat.type, { disposalMethod: e.target.value as WasteInput['disposalMethod'] })}
                  >
                    {DISPOSAL_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="waste-co2-info">
                <span>Üretim: <strong>{prodCo2.toFixed(0)} kg CO₂/yıl</strong></span>
                <span>Bertaraf: <strong className={disposalCo2 < 0 ? 'negative' : 'positive'}>
                  {disposalCo2 >= 0 ? '+' : ''}{disposalCo2.toFixed(0)} kg CO₂/yıl
                </strong></span>
                <span>Toplam: <strong className={totalCo2 < 0 ? 'negative' : 'positive'}>
                  {totalCo2.toFixed(0)} kg CO₂/yıl
                </strong></span>
              </div>

              <div className={`damage-fact ${expandedFact === cat.type ? 'expanded' : ''}`}>
                <button className="fact-toggle" onClick={() => setExpandedFact(expandedFact === cat.type ? null : cat.type)}>
                  {expandedFact === cat.type ? 'Gizle' : 'Çevresel Zararı Göster'} ⚠️
                </button>
                {expandedFact === cat.type && (
                  <div className="fact-text">
                    {cat.damageFact}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
