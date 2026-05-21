import { type FormEvent, useState } from 'react'
import type { CarbonFootprintRequest, FoodInput, WasteInput } from '../types/carbon'
import FoodSelector from './FoodSelector'
import WasteDetail from './WasteDetail'

interface Props {
  onCalculate: (data: CarbonFootprintRequest) => void
  loading: boolean
}

const defaultForm: CarbonFootprintRequest = {
  carKmPerYear: 10000,
  busKmPerYear: 0,
  trainKmPerYear: 0,
  flightHoursPerYear: 0,
  electricityKwhPerYear: 3000,
  naturalGasM3PerYear: 0,
  foods: [],
  wasteItems: [],
}

export default function CarbonForm({ onCalculate, loading }: Props) {
  const [form, setForm] = useState<CarbonFootprintRequest>(defaultForm)

  const handleChange = (field: keyof CarbonFootprintRequest, value: string) => {
    setForm((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }))
  }

  const handleFoodsChange = (foods: FoodInput[]) => {
    setForm((prev) => ({ ...prev, foods }))
  }

  const handleWasteChange = (wasteItems: WasteInput[]) => {
    setForm((prev) => ({ ...prev, wasteItems }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onCalculate(form)
  }

  return (
    <form onSubmit={handleSubmit} className="carbon-form">
      <h2>🌍 Karbon Ayak İzi Hesaplayıcı</h2>

      <fieldset>
        <legend>🚗 Ulaşım</legend>
        <label>Araba (yıllık km)
          <input type="number" value={form.carKmPerYear} onChange={(e) => handleChange('carKmPerYear', e.target.value)} />
        </label>
        <label>Otobüs (yıllık km)
          <input type="number" value={form.busKmPerYear} onChange={(e) => handleChange('busKmPerYear', e.target.value)} />
        </label>
        <label>Tren (yıllık km)
          <input type="number" value={form.trainKmPerYear} onChange={(e) => handleChange('trainKmPerYear', e.target.value)} />
        </label>
        <label>Uçak (yıllık saat)
          <input type="number" value={form.flightHoursPerYear} onChange={(e) => handleChange('flightHoursPerYear', e.target.value)} />
        </label>
      </fieldset>

      <fieldset>
        <legend>💡 Enerji</legend>
        <label>Elektrik (yıllık kWh)
          <input type="number" value={form.electricityKwhPerYear} onChange={(e) => handleChange('electricityKwhPerYear', e.target.value)} />
        </label>
        <label>Doğalgaz (yıllık m³)
          <input type="number" value={form.naturalGasM3PerYear} onChange={(e) => handleChange('naturalGasM3PerYear', e.target.value)} />
        </label>
      </fieldset>

      <fieldset>
        <legend>🥘 Beslenme</legend>
        <p className="fieldset-desc">Aşağıda tükettiğiniz besinleri arayarak ekleyin ve haftalık miktarını girin.</p>
        <FoodSelector selected={form.foods} onChange={handleFoodsChange} />
      </fieldset>

      <fieldset>
        <legend>🗑️ Atık</legend>
        <p className="fieldset-desc">Atık türlerinin haftalık miktarını ve bertaraf yöntemini seçin.</p>
        <WasteDetail items={form.wasteItems} onChange={handleWasteChange} />
      </fieldset>

      <button type="submit" disabled={loading}>
        {loading ? 'Hesaplanıyor...' : 'Karbon Ayak İzimi Hesapla'}
      </button>
    </form>
  )
}
