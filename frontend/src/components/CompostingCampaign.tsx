import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { joinCampaign, getCampaignStats } from '../api/carbonApi'

const co2SavingsPerKg = 0.5

export default function CompostingCampaign() {
  const { t } = useTranslation()
  const [participants, setParticipants] = useState(0)
  const [totalWeeklyKg, setTotalWeeklyKg] = useState(0)
  const [userKg, setUserKg] = useState(5)
  const [joined, setJoined] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [joining, setJoining] = useState(false)

  const campaignId = 'compost'

  useEffect(() => {
    getCampaignStats(campaignId).then((s) => {
      setParticipants(s.totalParticipants)
      setTotalWeeklyKg(s.totalWeeklyKg)
    })
  }, [])

  const totalCo2Saved = totalWeeklyKg * co2SavingsPerKg * 52
  const treesEquivalent = Math.round(totalCo2Saved / 21.7)
  const carsEquivalent = Math.round(totalCo2Saved / 4600)

  const userAnnualSaving = userKg * (co2SavingsPerKg + 0.5) * 52

  const handleJoin = async () => {
    if (!name.trim() || !email.trim()) return
    setJoining(true)
    try {
      const result = await joinCampaign({ name, email, campaignId, weeklyOrganicKg: userKg })
      setParticipants(result.totalParticipants)
      setJoined(true)
      setShowForm(false)
      setTotalWeeklyKg((prev) => prev + userKg)
    } catch {
      alert(t('carbonApi.joinError'))
    } finally {
      setJoining(false)
    }
  }

  return (
    <section className="campaign-section">
      <div className="campaign-hero">
        <span className="campaign-emoji">🌱</span>
        <h2>{t('compostingCampaign.title')}</h2>
        <p className="campaign-tagline">
          {t('compostingCampaign.tagline')}
        </p>
      </div>

      <div className="campaign-stats">
        <div className="stat-card highlight">
          <span className="stat-number">{t('compostingCampaign.statFoodWasteValue')}</span>
          <span className="stat-label">{t('compostingCampaign.statFoodWaste')}</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{t('compostingCampaign.statGlobalShareValue')}</span>
          <span className="stat-label">{t('compostingCampaign.statGlobalShare')}</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{t('compostingCampaign.statMethaneValue')}</span>
          <span className="stat-label">{t('compostingCampaign.statMethane')}</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{t('compostingCampaign.statSavingValue')}</span>
          <span className="stat-label">{t('compostingCampaign.statSaving')}</span>
        </div>
      </div>

      <div className="campaign-calculator">
        <h3>{t('compostingCampaign.yourImpact')}</h3>
        <div className="calc-row">
          <label>{t('compostingCampaign.weeklyOrganicLabel')}</label>
          <div className="calc-input-group">
            <button onClick={() => setUserKg(Math.max(0.5, userKg - 0.5))}>−</button>
            <input type="number" value={userKg} onChange={(e) => setUserKg(parseFloat(e.target.value) || 0)} step="0.5" min="0" />
            <button onClick={() => setUserKg(userKg + 0.5)}>+</button>
            <span>{t('compostingCampaign.unitKgPerWeek')}</span>
          </div>
        </div>

        <div className="calc-results">
          <div className="calc-result-item">
            <span>{t('compostingCampaign.landfillEmission')}</span>
            <strong className="text-red">+{(userKg * 0.5 * 52).toFixed(0)} kg CO₂</strong>
          </div>
          <div className="calc-result-item">
            <span>{t('compostingCampaign.compostSaving')}</span>
            <strong className="text-green">{(userKg * 0.5 * 52).toFixed(0)} kg CO₂</strong>
          </div>
          <div className="calc-result-item highlight">
            <span>{t('compostingCampaign.totalPrevented')}</span>
            <strong className="text-green">{userAnnualSaving.toFixed(0)} kg CO₂</strong>
          </div>
        </div>
      </div>

      <div className="campaign-collective">
        <h3>{t('compostingCampaign.collectiveImpact')}</h3>
        <p className="collective-desc">
          {participants > 0
            ? `${participants} ${t('compostingCampaign.participantsJoined')}`
            : t('compostingCampaign.noParticipants')}
        </p>

        {participants > 0 && (
          <div className="collective-stats">
            <div className="collective-stat">
              <span className="cs-number">{(totalCo2Saved / 1000).toFixed(1)} ton</span>
              <span className="cs-label">{t('compostingCampaign.totalCo2Saved')}</span>
            </div>
            <div className="collective-stat">
              <span className="cs-number">{treesEquivalent}</span>
              <span className="cs-label">{t('compostingCampaign.equivalentTrees')}</span>
            </div>
            <div className="collective-stat">
              <span className="cs-number">{carsEquivalent}</span>
              <span className="cs-label">{t('compostingCampaign.equivalentCars')}</span>
            </div>
          </div>
        )}

        {!joined && !showForm && (
          <button className="join-btn" onClick={() => setShowForm(true)}>
            {t('compostingCampaign.joinButton')}
          </button>
        )}

        {showForm && (
          <div className="join-form">
            <input type="text" placeholder={t('compostingCampaign.placeholderName')} value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder={t('compostingCampaign.placeholderEmail')} value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="join-form-actions">
              <button className="join-btn" onClick={handleJoin} disabled={joining || !name.trim() || !email.trim()}>
                {joining ? t('compostingCampaign.joining') : t('compostingCampaign.joinSubmit')}
              </button>
              <button className="cancel-btn" onClick={() => setShowForm(false)}>{t('compostingCampaign.cancel')}</button>
            </div>
          </div>
        )}

        {joined && (
          <div className="joined-message">
            {t('compostingCampaign.joinedMessage', { count: participants })}
          </div>
        )}
      </div>

      <div className="campaign-howto">
        <h3>{t('compostingCampaign.howToTitle')}</h3>
        <div className="howto-grid">
          <div className="howto-card">
            <span className="howto-icon">1️⃣</span>
            <h4>{t('compostingCampaign.howToStep1Title')}</h4>
            <p>{t('compostingCampaign.howToStep1Desc')}</p>
          </div>
          <div className="howto-card">
            <span className="howto-icon">2️⃣</span>
            <h4>{t('compostingCampaign.howToStep2Title')}</h4>
            <p>{t('compostingCampaign.howToStep2Desc')}</p>
          </div>
          <div className="howto-card">
            <span className="howto-icon">3️⃣</span>
            <h4>{t('compostingCampaign.howToStep3Title')}</h4>
            <p>{t('compostingCampaign.howToStep3Desc')}</p>
          </div>
          <div className="howto-card">
            <span className="howto-icon">4️⃣</span>
            <h4>{t('compostingCampaign.howToStep4Title')}</h4>
            <p>{t('compostingCampaign.howToStep4Desc')}</p>
          </div>
        </div>
        <p className="howto-note">
          {t('compostingCampaign.howToNote')}
        </p>
      </div>
    </section>
  )
}
