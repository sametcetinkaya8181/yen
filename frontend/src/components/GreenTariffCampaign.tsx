import { useState, useEffect } from 'react'
import { joinCampaign, getCampaignStats } from '../api/carbonApi'

const greenRate = 5.88
const standardLowRate = 2.92
const standardHighRate = 4.32

function monthlyCost(kwh: number, rate: number) {
  return (kwh * rate).toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function GreenTariffCampaign() {
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
      alert('Katılım sırasında bir hata oluştu.')
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
      alert('Katılım sırasında bir hata oluştu.')
    } finally {
      setUserJoining(false)
    }
  }

  const lowCap = 240
  const lowPortion = Math.min(monthlyKwh, lowCap)
  const highPortion = Math.max(0, monthlyKwh - lowCap)
  const standardTotal = lowPortion * standardLowRate + highPortion * standardHighRate
  const greenTotal = monthlyKwh * greenRate
  const diff = greenTotal - standardTotal
  const diffPercent = (diff / standardTotal * 100).toFixed(0)

  return (
    <section className="campaign-section">
      <div className="campaign-hero">
        <span className="campaign-emoji">⚡</span>
        <h2>Yeşil Tarifeyi Seç, Tarafın Belli Olsun</h2>
        <p className="campaign-tagline">
          Yeşil tarife, elektrik şirketinin yenilenebilir kaynaklardan (rüzgar, güneş, jeotermal)
          ürettiği enerjiyi satın aldığın bir tarifedir.
        </p>
      </div>

      <div className="campaign-grid">
        <div className="campaign-collective">
          <h3>🙋 Yeşil Tarifeyi İlk Kez Duyanlar</h3>
          <p className="collective-desc">
            Yeşil tarifeyi ilk kez duydun ve "ben de yeşil tarifeliyim" demek mi istiyorsun?
            Farkındalık yaratmak için sesimizi yükseltelim!
          </p>

          <div className="collective-stats">
            <div className="collective-stat">
              <span className="cs-number">{heardParticipants}</span>
              <span className="cs-label">kişi yeşil tarifeyi ilk kez duydum dedi</span>
            </div>
          </div>

          {!heardJoined && !heardShowForm && (
            <button className="join-btn" onClick={() => setHeardShowForm(true)}>
              ⚡ Ben de yeşil tarifeyi ilk kez duydum
            </button>
          )}

          {heardShowForm && (
            <div className="join-form">
              <input type="text" placeholder="Adınız" value={heardName} onChange={(e) => setHeardName(e.target.value)} />
              <input type="email" placeholder="E-posta" value={heardEmail} onChange={(e) => setHeardEmail(e.target.value)} />
              <div className="join-form-actions">
                <button className="join-btn" onClick={handleHeardJoin} disabled={heardJoining || !heardName.trim() || !heardEmail.trim()}>
                  {heardJoining ? 'Kaydediliyor...' : 'Ben de duydum! ✅'}
                </button>
                <button className="cancel-btn" onClick={() => setHeardShowForm(false)}>Vazgeç</button>
              </div>
            </div>
          )}

          {heardJoined && (
            <div className="joined-message">
              ✅ Teşekkürler! Yeşil tarife farkındalığına katkıda bulundun. Şu an {heardParticipants} kişiyle birliktesin!
            </div>
          )}
        </div>

        <div className="campaign-collective">
          <h3>✅ Ben de Yeşil Tarifeli Oldum</h3>
          <p className="collective-desc">
            Yeşil tarifeye geçtin mi? Elektrik sağlayıcından yeşil tarifeye geçiş yaptıysan
            burada görün! Ne kadar kişi yeşil tarifeyi tercih etmiş görelim.
          </p>

          <div className="collective-stats">
            <div className="collective-stat">
              <span className="cs-number">{userParticipants}</span>
              <span className="cs-label">kişi yeşil tarifeli oldu</span>
            </div>
          </div>

          {!userJoined && !userShowForm && (
            <button className="join-btn" onClick={() => setUserShowForm(true)}>
              ✅ Ben de yeşil tarifeli oldum
            </button>
          )}

          {userShowForm && (
            <div className="join-form">
              <input type="text" placeholder="Adınız" value={userName} onChange={(e) => setUserName(e.target.value)} />
              <input type="email" placeholder="E-posta" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
              <div className="join-form-actions">
                <button className="join-btn" onClick={handleUserJoin} disabled={userJoining || !userName.trim() || !userEmail.trim()}>
                  {userJoining ? 'Kaydediliyor...' : 'Yeşil tarifeli oldum! ✅'}
                </button>
                <button className="cancel-btn" onClick={() => setUserShowForm(false)}>Vazgeç</button>
              </div>
            </div>
          )}

          {userJoined && (
            <div className="joined-message">
              ✅ Harika! Yeşil tarifeye geçiş yaptığın için teşekkürler. Şu an {userParticipants} kişiyle birliktesin!
            </div>
          )}
        </div>
      </div>

      <div className="campaign-why-expensive">
        <h3>💸 Yeşil tarife neden bu kadar pahalı?</h3>
        <p>
          "Doğayı seçiyorum" derken cüzdanını cezalandırma. Yeşil tarife standart tarifeden
          çok daha pahalı. <strong>Peki neden?</strong>
        </p>
      </div>

      <div className="campaign-stats">
        <div className="stat-card highlight">
          <span className="stat-number">%101 zam</span>
          <span className="stat-label">Yeşil tarife, standart tarifeden bu kadar daha pahalı</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{greenRate.toFixed(2)} TL/kWh</span>
          <span className="stat-label">Yeşil tarife birim fiyatı (vergiler hariç)</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{standardLowRate.toFixed(2)} TL/kWh</span>
          <span className="stat-label">Standart düşük kademe birim fiyatı (≤8 kWh/gün)</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{standardHighRate.toFixed(2)} TL/kWh</span>
          <span className="stat-label">Standart yüksek kademe birim fiyatı ({'>'}8 kWh/gün)</span>
        </div>
      </div>

      <div className="campaign-calculator">
        <h3>📊 Cebinize Etkisi</h3>
        <p className="calc-hint">Aylık tüketiminizi girerek yeşil tarifenin faturanıza etkisini görün.</p>
        <div className="calc-row">
          <label>Aylık elektrik tüketiminiz (kWh):</label>
          <div className="calc-input-group">
            <button onClick={() => setMonthlyKwh(Math.max(50, monthlyKwh - 10))}>−</button>
            <input type="number" value={monthlyKwh} onChange={(e) => setMonthlyKwh(parseFloat(e.target.value) || 0)} step="10" min="50" />
            <button onClick={() => setMonthlyKwh(monthlyKwh + 10)}>+</button>
            <span>kWh/ay</span>
          </div>
        </div>

        <div className="calc-results">
          <div className="calc-result-item">
            <span>Standart tarife ile faturanız:</span>
            <strong className="text-green">{standardTotal.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} TL/ay</strong>
          </div>
          <div className="calc-result-item">
            <span>Yeşil tarife ile faturanız:</span>
            <strong className="text-red">{monthlyCost(monthlyKwh, greenRate)} TL/ay</strong>
          </div>
          <div className="calc-result-item highlight">
            <span>Aradaki fark (yıllık):</span>
            <strong className="text-red">{(diff * 12).toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} TL/yıl</strong>
          </div>
        </div>
      </div>

      <div className="campaign-collective">
        <h3>🔍 Yeşil Tarife Nedir?</h3>
        <p className="collective-desc">
          Yeşil tarife, elektrik şirketlerinin yenilenebilir enerji kaynaklarından (rüzgar, güneş, jeotermal,
          biyokütle) ürettiği elektriği satın almanızı sağlayan bir tarifedir. Yani faturanızın bir kısmı
          doğrudan yenilenebilir enerji üreticilerine gider.
        </p>
        <p className="collective-desc">
          Kulağa harika geliyor, değil mi? Ama işin acı gerçeği: <strong>yeşil tarife standart tarifeden
          çok daha pahalı</strong>. Türkiye'de bir mesken abonesi yeşil tarifeyi seçtiğinde aktif enerji
          bedeli 345.47 kr/kWh olarak uygulanıyor. Oysa aynı abone standart tarifede düşük kademede
          yalnızca 49.41 kr/kWh, yüksek kademede ise 189.58 kr/kWh ödüyor.
        </p>

        {!showDetail && (
          <button className="join-btn" onClick={() => setShowDetail(true)}>
            📋 Detaylı Karşılaştırmayı Göster
          </button>
        )}

        {showDetail && (
          <div className="green-detail">
            <h4>📋 Tarife Karşılaştırması (AG Tek Terim Mesken)</h4>
            <div className="comparison-table">
              <div className="comparison-row header">
                <span>Kalem</span>
                <span>Standart (Düşük)</span>
                <span>Standart (Yüksek)</span>
                <span>Yeşil Tarife</span>
              </div>
              <div className="comparison-row">
                <span>Aktif Enerji Bedeli</span>
                <span>49.41 kr/kWh</span>
                <span>189.58 kr/kWh</span>
                <span className="highlight-red">345.47 kr/kWh</span>
              </div>
              <div className="comparison-row">
                <span>Dağıtım Bedeli</span>
                <span>242.49 kr/kWh</span>
                <span>242.49 kr/kWh</span>
                <span>242.49 kr/kWh</span>
              </div>
              <div className="comparison-row total">
                <span>Toplam (vergisiz)</span>
                <span>~{standardLowRate.toFixed(2)} TL/kWh</span>
                <span>~{standardHighRate.toFixed(2)} TL/kWh</span>
                <span className="highlight-red">~{greenRate.toFixed(2)} TL/kWh</span>
              </div>
            </div>

            <div className="green-critique">
              <h4>⚖️ Adil mi?</h4>
              <p>
                Yeşil tarife fiyatı, EPDK tarafından belirlenen tavan fiyat olan 345.47 kr/kWh üzerinden
                uygulanıyor. Bu fiyat, serbest piyasada yenilenebilir enerji maliyetinin çok üzerinde.
                Oysa güneş ve rüzgar enerjisi artık <strong>kömür ve doğalgazdan daha ucuz</strong>
                elektrik üretiyor. Peki neden yeşil tarife daha pahalı?
              </p>
              <ul>
                <li><strong>Çifte marj:</strong> Dağıtım şirketleri hem standart tarifede hem yeşil tarifede aynı dağıtım bedelini alıyor, üstüne yeşil enerji primi ekliyor.</li>
                <li><strong>Talep az, fiyat yüksek:</strong> Yeşil tarifeye talep düşük olduğu için ölçek ekonomisi işlemiyor ve birim maliyet yüksek kalıyor.</li>
                <li><strong>Teşvik eksikliği:</strong> Devlet yenilenebilir enerjiyi teşvik etmek yerine yeşil tarifeyi lüks tüketim gibi konumlandırıyor.</li>
                <li><strong>Şeffaflık sorunu:</strong> Ödediğiniz yeşil primin gerçekten yeni yenilenebilir enerji yatırımlarına gittiğine dair bağımsız denetim mekanizması zayıf.</li>
              </ul>
            </div>

            <div className="green-solution">
              <h4>💡 Ne Yapmalı?</h4>
              <div className="howto-grid">
                <div className="howto-card">
                  <span className="howto-icon">🏠</span>
                  <h4>Çatı Güneş Paneli</h4>
                  <p>Müstakil eviniz varsa çatınıza güneş paneli kurarak hem elektriğinizi üretin hem de fazlasını şebekeye satın.</p>
                </div>
                <div className="howto-card">
                  <span className="howto-icon">📢</span>
                  <h4>EPDK'ya Seslen</h4>
                  <p>Yeşil tarifenin makul fiyatlandırılması için EPDK'ya ve milletvekillerine şikayet bildirimi yap.</p>
                </div>
                <div className="howto-card">
                  <span className="howto-icon">🤝</span>
                  <h4>Toplu Talep Oluştur</h4>
                  <p>Toplu talebin olduğu yerde fiyat düşer. Bu kampanyayı yayarak yeşil tarifenin yaygınlaşmasını sağla.</p>
                </div>
                <div className="howto-card">
                  <span className="howto-icon">⚡</span>
                  <h4>Enerji Verimliliği</h4>
                  <p>Tüketimini azaltmak yeşil tarifeye geçmekten daha etkili. Enerji sınıfı A+ cihazlar kullan, gereksiz tüketimi kes.</p>
                </div>
              </div>
            </div>

            <button className="cancel-btn" onClick={() => setShowDetail(false)}>Gizle</button>
          </div>
        )}
      </div>
    </section>
  )
}
