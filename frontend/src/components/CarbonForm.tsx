import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
      <h2>{t('carbonForm.title')}</h2>

      <fieldset>
        <legend>{t('carbonForm.transportation')}</legend>
        <label>{t('carbonForm.car')}
          <input type="number" value={form.carKmPerYear} onChange={(e) => handleChange('carKmPerYear', e.target.value)} />
        </label>
        <label>{t('carbonForm.bus')}
          <input type="number" value={form.busKmPerYear} onChange={(e) => handleChange('busKmPerYear', e.target.value)} />
        </label>
        <label>{t('carbonForm.train')}
          <input type="number" value={form.trainKmPerYear} onChange={(e) => handleChange('trainKmPerYear', e.target.value)} />
        </label>
        <label>{t('carbonForm.flight')}
          <input type="number" value={form.flightHoursPerYear} onChange={(e) => handleChange('flightHoursPerYear', e.target.value)} />
        </label>
      </fieldset>

      <fieldset>
        <legend>{t('carbonForm.energy')}</legend>
        <label>{t('carbonForm.electricity')}
          <input type="number" value={form.electricityKwhPerYear} onChange={(e) => handleChange('electricityKwhPerYear', e.target.value)} />
        </label>
        <label>{t('carbonForm.naturalGas')}
          <input type="number" value={form.naturalGasM3PerYear} onChange={(e) => handleChange('naturalGasM3PerYear', e.target.value)} />
        </label>
      </fieldset>

      <fieldset>
        <legend>{t('carbonForm.food')}</legend>
        <p className="fieldset-desc">{t('carbonForm.foodDesc')}</p>
        <FoodSelector selected={form.foods} onChange={handleFoodsChange} />
      </fieldset>

      <fieldset>
        <legend>{t('carbonForm.waste')}</legend>
        <p className="fieldset-desc">{t('carbonForm.wasteDesc')}</p>
        <WasteDetail items={form.wasteItems} onChange={handleWasteChange} />
      </fieldset>

      <button type="submit" disabled={loading}>
        {loading ? t('carbonForm.submitting') : t('carbonForm.submit')}
      </button>
    </form>
  )
}
