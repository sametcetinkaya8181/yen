import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { joinCampaign, getCampaignStats } from '../api/carbonApi'

const greenRate = 5.88
const standardLowRate = 2.92
const standardHighRate = 4.32

function monthlyCost(kwh: number, rate: number) {
  return (kwh * rate).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function GreenTariffCampaign() {
  const { t, i18n } = useTranslation()
  const [monthlyKwh, setMonthlyKwh] = useState(200)
  const [showDetail, setShowDetail] = useState(false)

  const [heardParticipants, setHeardParticipants] = useState(0)
  const [heardJoined, setHeardJoined] = useState(false)
  const [heardShowForm, setHeardShowForm] = useState(false)
  const [heardName, setHeardName] = useState('')
  const [heardEmail, setHeardEmail] = useState('')
  const [heardJoining, setHeardJoining] = useState(false)

  const [userParticipants, setUserParticipants] = useState(0)
  const [userJoined, setUserJoined] = useState(false)
  const [userShowForm, setUserShowForm] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userJoining, setUserJoining] = useState(false)

  const heardCampaignId = 'green-tariff-heard'
  const userCampaignId = 'green-tariff-user'

  useEffect(() => {
    getCampaignStats(heardCampaignId).then((s) => {
      setHeardParticipants(s.totalParticipants)
    }).catch(() => {})
    getCampaignStats(userCampaignId).then((s) => {
      setUserParticipants(s.totalParticipants)
    }).catch(() => {})
  }, [])

  const handleHeardJoin = async () => {
    if (!heardName.trim() || !heardEmail.trim()) return
    setHeardJoining(true)
    try {
      const result = await joinCampaign({ name: heardName, email: heardEmail, campaignId: heardCampaignId, weeklyOrganicKg: 0 })
      setHeardParticipants(result.totalParticipants)
      setHeardJoined(true)
      setHeardShowForm(false)
    } catch {
      alert(t('carbonApi.joinError'))
    } finally {
      setHeardJoining(false)
    }
  }

  const handleUserJoin = async () => {
    if (!userName.trim() || !userEmail.trim()) return
    setUserJoining(true)
    try {
      const result = await joinCampaign({ name: userName, email: userEmail, campaignId: userCampaignId, weeklyOrganicKg: 0 })
      setUserParticipants(result.totalParticipants)
      setUserJoined(true)
      setUserShowForm(false)
    } catch {
      alert(t('carbonApi.joinError'))
    } finally {
      setUserJoining(false)
    }
  }

  const locale = i18n.language === 'tr' ? 'tr-TR' : 'en-US'
  const lowCap = 240
  const lowPortion = Math.min(monthlyKwh, lowCap)
  const highPortion = Math.max(0, monthlyKwh - lowCap)
  const standardTotal = lowPortion * standardLowRate + highPortion * standardHighRate
  const greenTotal = monthlyKwh * greenRate
  const diff = greenTotal - standardTotal

  return (
    <section className="campaign-section">
      <div className="campaign-hero">
        <span className="campaign-emoji">⚡</span>
        <h2>{t('greenTariffCampaign.title')}</h2>
        <p className="campaign-tagline">
          {t('greenTariffCampaign.tagline')}
        </p>
      </div>

      <div className="campaign-grid">
        <div className="campaign-collective">
          <h3>{t('greenTariffCampaign.heardTitle')}</h3>
          <p className="collective-desc">
            {t('greenTariffCampaign.heardDesc')}
          </p>

          <div className="collective-stats">
            <div className="collective-stat">
              <span className="cs-number">{heardParticipants}</span>
              <span className="cs-label">{t('greenTariffCampaign.heardStat')}</span>
            </div>
          </div>

          {!heardJoined && !heardShowForm && (
            <button className="join-btn" onClick={() => setHeardShowForm(true)}>
              {t('greenTariffCampaign.heardButton')}
            </button>
          )}

          {heardShowForm && (
            <div className="join-form">
              <input type="text" placeholder={t('greenTariffCampaign.placeholderName')} value={heardName} onChange={(e) => setHeardName(e.target.value)} />
              <input type="email" placeholder={t('greenTariffCampaign.placeholderEmail')} value={heardEmail} onChange={(e) => setHeardEmail(e.target.value)} />
              <div className="join-form-actions">
                <button className="join-btn" onClick={handleHeardJoin} disabled={heardJoining || !heardName.trim() || !heardEmail.trim()}>
                  {heardJoining ? t('greenTariffCampaign.joining') : t('greenTariffCampaign.heardSubmit')}
                </button>
                <button className="cancel-btn" onClick={() => setHeardShowForm(false)}>{t('greenTariffCampaign.cancel')}</button>
              </div>
            </div>
          )}

          {heardJoined && (
            <div className="joined-message">
              {t('greenTariffCampaign.heardJoined', { count: heardParticipants })}
            </div>
          )}
        </div>

        <div className="campaign-collective">
          <h3>{t('greenTariffCampaign.userTitle')}</h3>
          <p className="collective-desc">
            {t('greenTariffCampaign.userDesc')}
          </p>

          <div className="collective-stats">
            <div className="collective-stat">
              <span className="cs-number">{userParticipants}</span>
              <span className="cs-label">{t('greenTariffCampaign.userStat')}</span>
            </div>
          </div>

          {!userJoined && !userShowForm && (
            <button className="join-btn" onClick={() => setUserShowForm(true)}>
              {t('greenTariffCampaign.userButton')}
            </button>
          )}

          {userShowForm && (
            <div className="join-form">
              <input type="text" placeholder={t('greenTariffCampaign.placeholderName')} value={userName} onChange={(e) => setUserName(e.target.value)} />
              <input type="email" placeholder={t('greenTariffCampaign.placeholderEmail')} value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
              <div className="join-form-actions">
                <button className="join-btn" onClick={handleUserJoin} disabled={userJoining || !userName.trim() || !userEmail.trim()}>
                  {userJoining ? t('greenTariffCampaign.joining') : t('greenTariffCampaign.userSubmit')}
                </button>
                <button className="cancel-btn" onClick={() => setUserShowForm(false)}>{t('greenTariffCampaign.cancel')}</button>
              </div>
            </div>
          )}

          {userJoined && (
            <div className="joined-message">
              {t('greenTariffCampaign.userJoined', { count: userParticipants })}
            </div>
          )}
        </div>
      </div>

      <div className="campaign-why-expensive">
        <h3>{t('greenTariffCampaign.whyExpensive')}</h3>
        <p>
          {t('greenTariffCampaign.whyExpensiveDesc')}
        </p>
      </div>

      <div className="campaign-stats">
        <div className="stat-card highlight">
          <span className="stat-number">{t('greenTariffCampaign.statPriceDiffValue')}</span>
          <span className="stat-label">{t('greenTariffCampaign.statPriceDiff')}</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{greenRate.toFixed(2)} TL/kWh</span>
          <span className="stat-label">{t('greenTariffCampaign.statGreenRate')}</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{standardLowRate.toFixed(2)} TL/kWh</span>
          <span className="stat-label">{t('greenTariffCampaign.statStandardLow')}</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{standardHighRate.toFixed(2)} TL/kWh</span>
          <span className="stat-label">{t('greenTariffCampaign.statStandardHigh')}</span>
        </div>
      </div>

      <div className="campaign-calculator">
        <h3>{t('greenTariffCampaign.calculatorTitle')}</h3>
        <p className="calc-hint">{t('greenTariffCampaign.calculatorHint')}</p>
        <div className="calc-row">
          <label>{t('greenTariffCampaign.calculatorLabel')}</label>
          <div className="calc-input-group">
            <button onClick={() => setMonthlyKwh(Math.max(50, monthlyKwh - 10))}>−</button>
            <input type="number" value={monthlyKwh} onChange={(e) => setMonthlyKwh(parseFloat(e.target.value) || 0)} step="10" min="50" />
            <button onClick={() => setMonthlyKwh(monthlyKwh + 10)}>+</button>
            <span>{t('greenTariffCampaign.calculatorUnit')}</span>
          </div>
        </div>

        <div className="calc-results">
          <div className="calc-result-item">
            <span>{t('greenTariffCampaign.standardBill')}</span>
            <strong className="text-green">{standardTotal.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} {t('greenTariffCampaign.unitTLPerMonth')}</strong>
          </div>
          <div className="calc-result-item">
            <span>{t('greenTariffCampaign.greenBill')}</span>
            <strong className="text-red">{monthlyCost(monthlyKwh, greenRate)} {t('greenTariffCampaign.unitTLPerMonth')}</strong>
          </div>
          <div className="calc-result-item highlight">
            <span>{t('greenTariffCampaign.annualDiff')}</span>
            <strong className="text-red">{(diff * 12).toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} {t('greenTariffCampaign.unitTLPerYear')}</strong>
          </div>
        </div>
      </div>

      <div className="campaign-collective">
        <h3>{t('greenTariffCampaign.whatIsGreenTitle')}</h3>
        <p className="collective-desc">
          {t('greenTariffCampaign.whatIsGreenDesc1')}
        </p>
        <p className="collective-desc">
          {t('greenTariffCampaign.whatIsGreenDesc2')}
        </p>

        {!showDetail && (
          <button className="join-btn" onClick={() => setShowDetail(true)}>
            {t('greenTariffCampaign.showDetail')}
          </button>
        )}

        {showDetail && (
          <div className="green-detail">
            <h4>{t('greenTariffCampaign.detailTitle')}</h4>
            <div className="comparison-table">
              <div className="comparison-row header">
                <span>{t('greenTariffCampaign.tableHeaderItem')}</span>
                <span>{t('greenTariffCampaign.tableHeaderStandardLow')}</span>
                <span>{t('greenTariffCampaign.tableHeaderStandardHigh')}</span>
                <span>{t('greenTariffCampaign.tableHeaderGreen')}</span>
              </div>
              <div className="comparison-row">
                <span>{t('greenTariffCampaign.tableRowEnergy')}</span>
                <span>49.41 kr/kWh</span>
                <span>189.58 kr/kWh</span>
                <span className="highlight-red">345.47 kr/kWh</span>
              </div>
              <div className="comparison-row">
                <span>{t('greenTariffCampaign.tableRowDistribution')}</span>
                <span>242.49 kr/kWh</span>
                <span>242.49 kr/kWh</span>
                <span>242.49 kr/kWh</span>
              </div>
              <div className="comparison-row total">
                <span>{t('greenTariffCampaign.tableRowTotal')}</span>
                <span>~{standardLowRate.toFixed(2)} TL/kWh</span>
                <span>~{standardHighRate.toFixed(2)} TL/kWh</span>
                <span className="highlight-red">~{greenRate.toFixed(2)} TL/kWh</span>
              </div>
            </div>

            <div className="green-critique">
              <h4>{t('greenTariffCampaign.fairnessTitle')}</h4>
              <p>
                {t('greenTariffCampaign.fairnessDesc')}
              </p>
              <ul>
                <li>{t('greenTariffCampaign.critique1')}</li>
                <li>{t('greenTariffCampaign.critique2')}</li>
                <li>{t('greenTariffCampaign.critique3')}</li>
                <li>{t('greenTariffCampaign.critique4')}</li>
              </ul>
            </div>

            <div className="green-solution">
              <h4>{t('greenTariffCampaign.solutionTitle')}</h4>
              <div className="howto-grid">
                <div className="howto-card">
                  <span className="howto-icon">🏠</span>
                  <h4>{t('greenTariffCampaign.solution1Title')}</h4>
                  <p>{t('greenTariffCampaign.solution1Desc')}</p>
                </div>
                <div className="howto-card">
                  <span className="howto-icon">📢</span>
                  <h4>{t('greenTariffCampaign.solution2Title')}</h4>
                  <p>{t('greenTariffCampaign.solution2Desc')}</p>
                </div>
                <div className="howto-card">
                  <span className="howto-icon">🤝</span>
                  <h4>{t('greenTariffCampaign.solution3Title')}</h4>
                  <p>{t('greenTariffCampaign.solution3Desc')}</p>
                </div>
                <div className="howto-card">
                  <span className="howto-icon">⚡</span>
                  <h4>{t('greenTariffCampaign.solution4Title')}</h4>
                  <p>{t('greenTariffCampaign.solution4Desc')}</p>
                </div>
              </div>
            </div>

            <button className="cancel-btn" onClick={() => setShowDetail(false)}>{t('greenTariffCampaign.hideDetail')}</button>
          </div>
        )}
      </div>
    </section>
  )
}
