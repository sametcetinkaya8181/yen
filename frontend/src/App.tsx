import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { CarbonFootprintRequest, CarbonFootprintResponse } from './types/carbon'
import { calculateFootprint } from './api/carbonApi'
import Header from './components/Header'
import CarbonForm from './components/CarbonForm'
import CarbonResult from './components/CarbonResult'
import Tips from './components/Tips'
import Gallery from './components/Gallery'
import CampaignsPage from './components/CampaignsPage'
import WhyEarth from './components/WhyEarth'
import BackgroundSlideshow from './components/BackgroundSlideshow'
import './App.css'

type Tab = 'calculator' | 'campaigns' | 'blog'

export default function App() {
  const { t, i18n } = useTranslation()
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
      setError(t('app.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="lang-switcher">
        <select value={i18n.language} onChange={(e) => { i18n.changeLanguage(e.target.value); localStorage.setItem('lang', e.target.value) }}>
          <option value="tr">🇹🇷 TR</option>
          <option value="en">🇬🇧 EN</option>
        </select>
      </div>
      <BackgroundSlideshow />
      <Header />

      <nav className="app-tabs">
        <button className={`tab ${tab === 'calculator' ? 'active' : ''}`} onClick={() => setTab('calculator')}>
          {t('app.tabCalculator')}
        </button>
        <button className={`tab ${tab === 'campaigns' ? 'active' : ''}`} onClick={() => setTab('campaigns')}>
          {t('app.tabCampaigns')}
        </button>
        <button className={`tab ${tab === 'blog' ? 'active' : ''}`} onClick={() => setTab('blog')}>
          {t('app.tabBlog')}
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
        {tab === 'blog' && <WhyEarth />}
      </main>

      <footer>
        <p>{t('app.footer')}</p>
      </footer>
    </div>
  )
}
