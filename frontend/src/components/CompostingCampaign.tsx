import { useState, useEffect } from 'react'
import { joinCampaign, getCampaignStats } from '../api/carbonApi'

const co2SavingsPerKg = 0.5

export default function CompostingCampaign() {
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
      alert('Katılım sırasında bir hata oluştu.')
    } finally {
      setJoining(false)
    }
  }

  return (
    <section className="campaign-section">
      <div className="campaign-hero">
        <span className="campaign-emoji">🌱</span>
        <h2>Kompost Kampanyası</h2>
        <p className="campaign-tagline">
          Mutfak atıklarınızı çöpe atmak yerine kompost yaparak <strong>metan gazı</strong> oluşumunu engelleyin.
          Metan, CO₂'den <strong>25 kat daha zararlı</strong> bir sera gazıdır.
        </p>
      </div>

      <div className="campaign-stats">
        <div className="stat-card highlight">
          <span className="stat-number">1.3 milyar ton</span>
          <span className="stat-label">Her yıl çöpe giden gıda miktarı</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">%8</span>
          <span className="stat-label">Küresel sera gazının gıda israfı kaynaklı oranı</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">25x</span>
          <span className="stat-label">Metan, CO₂'den bu kadar daha zararlı</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">0.5 kg</span>
          <span className="stat-label">Her 1 kg organik atığı kompostlayarak önlenen CO₂ (haftalık)</span>
        </div>
      </div>

      <div className="campaign-calculator">
        <h3>📊 Sizin Etkiniz</h3>
        <div className="calc-row">
          <label>Haftalık organik atık miktarınız (kg):</label>
          <div className="calc-input-group">
            <button onClick={() => setUserKg(Math.max(0.5, userKg - 0.5))}>−</button>
            <input type="number" value={userKg} onChange={(e) => setUserKg(parseFloat(e.target.value) || 0)} step="0.5" min="0" />
            <button onClick={() => setUserKg(userKg + 0.5)}>+</button>
            <span>kg/hafta</span>
          </div>
        </div>

        <div className="calc-results">
          <div className="calc-result-item">
            <span>Çöplüğe giderse yıllık emisyon:</span>
            <strong className="text-red">+{(userKg * 0.5 * 52).toFixed(0)} kg CO₂</strong>
          </div>
          <div className="calc-result-item">
            <span>Kompost ile yıllık tasarruf:</span>
            <strong className="text-green">{(userKg * 0.5 * 52).toFixed(0)} kg CO₂</strong>
          </div>
          <div className="calc-result-item highlight">
            <span>Toplam önlenen emisyon:</span>
            <strong className="text-green">{userAnnualSaving.toFixed(0)} kg CO₂</strong>
          </div>
        </div>
      </div>

      <div className="campaign-collective">
        <h3>🤝 Toplu Etki</h3>
        <p className="collective-desc">
          {participants > 0
            ? `${participants} kişi bu kampanyaya katıldı!`
            : 'Henüz kimse katılmadı. İlk siz olun!'}
        </p>

        {participants > 0 && (
          <div className="collective-stats">
            <div className="collective-stat">
              <span className="cs-number">{(totalCo2Saved / 1000).toFixed(1)} ton</span>
              <span className="cs-label">Toplam önlenen CO₂ / yıl</span>
            </div>
            <div className="collective-stat">
              <span className="cs-number">{treesEquivalent}</span>
              <span className="cs-label">Ağaç dikmeye eşdeğer</span>
            </div>
            <div className="collective-stat">
              <span className="cs-number">{carsEquivalent}</span>
              <span className="cs-label">Araç trafikten çekilmiş gibi</span>
            </div>
          </div>
        )}

        {!joined && !showForm && (
          <button className="join-btn" onClick={() => setShowForm(true)}>
            🌱 Ben de katılıyorum
          </button>
        )}

        {showForm && (
          <div className="join-form">
            <input type="text" placeholder="Adınız" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="join-form-actions">
              <button className="join-btn" onClick={handleJoin} disabled={joining || !name.trim() || !email.trim()}>
                {joining ? 'Kaydediliyor...' : 'Katıl'}
              </button>
              <button className="cancel-btn" onClick={() => setShowForm(false)}>Vazgeç</button>
            </div>
          </div>
        )}

        {joined && (
          <div className="joined-message">
            ✅ Başarıyla katıldınız! {participants} kişi arasındasınız.
          </div>
        )}
      </div>

      <div className="campaign-howto">
        <h3>🏡 Kompost Nasıl Yapılır?</h3>
        <div className="howto-grid">
          <div className="howto-card">
            <span className="howto-icon">1️⃣</span>
            <h4>Bir kap seçin</h4>
            <p>Balkonda veya bahçede bir kompost kovası veya yığını oluşturun.</p>
          </div>
          <div className="howto-card">
            <span className="howto-icon">2️⃣</span>
            <h4>Malzemeleri ekleyin</h4>
            <p>Meyve/sebze kabukları, yumurta kabuğu, kahve telvesi, kuru yaprak.</p>
          </div>
          <div className="howto-card">
            <span className="howto-icon">3️⃣</span>
            <h4>Karıştırın ve bekleyin</h4>
            <p>Haftada bir karıştırın. 3-6 ay içinde besin dolu gübreniz hazır!</p>
          </div>
          <div className="howto-card">
            <span className="howto-icon">4️⃣</span>
            <h4>Doğaya geri verin</h4>
            <p>Ortaya çıkan gübreyi bahçenizde veya saksılarınızda kullanın.</p>
          </div>
        </div>
        <p className="howto-note">
          ⚠️ Et, süt ürünleri ve yağlı atıklar komposta uygun değildir. Sadece bitkisel atıklar kullanın.
        </p>
      </div>
    </section>
  )
}
