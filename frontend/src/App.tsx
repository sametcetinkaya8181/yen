import { useState } from 'react'
import type { CarbonFootprintRequest, CarbonFootprintResponse } from './types/carbon'
import { calculateFootprint } from './api/carbonApi'
import Header from './components/Header'
import CarbonForm from './components/CarbonForm'
import CarbonResult from './components/CarbonResult'
import Tips from './components/Tips'
import Gallery from './components/Gallery'
import CampaignsPage from './components/CampaignsPage'
import BackgroundSlideshow from './components/BackgroundSlideshow'
import './App.css'

type Tab = 'calculator' | 'campaigns'

export default function App() {
  const [tab, setTab] = useState<Tab>('calculator')
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

      <nav className="app-tabs">
        <button className={`tab ${tab === 'calculator' ? 'active' : ''}`} onClick={() => setTab('calculator')}>
          📊 Hesaplayıcı
        </button>
        <button className={`tab ${tab === 'campaigns' ? 'active' : ''}`} onClick={() => setTab('campaigns')}>
          🎯 Kampanyalar
        </button>
      </nav>

      <main>
        {tab === 'calculator' && (
          <>
            <CarbonForm onCalculate={handleCalculate} loading={loading} />
            {error && <div className="error">{error}</div>}
            {result && <CarbonResult data={result} />}
            <Tips />
            <Gallery />
          </>
        )}
        {tab === 'campaigns' && <CampaignsPage />}
      </main>

      <footer>
        <p>Bu uygulama sera gazı emisyonları hakkında farkındalık yaratmak amacıyla hazırlanmıştır.</p>
      </footer>
    </div>
  )
}
