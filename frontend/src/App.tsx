import { useState } from 'react'
import type { CarbonFootprintRequest, CarbonFootprintResponse } from './types/carbon'
import { calculateFootprint } from './api/carbonApi'
import Header from './components/Header'
import CarbonForm from './components/CarbonForm'
import CarbonResult from './components/CarbonResult'
import Tips from './components/Tips'
import Gallery from './components/Gallery'
import BackgroundSlideshow from './components/BackgroundSlideshow'
import './App.css'

export default function App() {
  const [result, setResult] = useState<CarbonFootprintResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCalculate = async (data: CarbonFootprintRequest) => {
    setLoading(true)
    setError('')
    try {
      const res = await calculateFootprint(data)
      setResult(res)
    } catch {
      setError('Hesaplama sırasında bir hata oluştu. Lütfen backend sunucusunun çalıştığından emin olun.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <BackgroundSlideshow />
      <Header />
      <main>
        <CarbonForm onCalculate={handleCalculate} loading={loading} />
        {error && <div className="error">{error}</div>}
        {result && <CarbonResult data={result} />}
        <Tips />
        <Gallery />
      </main>
      <footer>
        <p>Bu uygulama sera gazı emisyonları hakkında farkındalık yaratmak amacıyla hazırlanmıştır.</p>
      </footer>
    </div>
  )
}
