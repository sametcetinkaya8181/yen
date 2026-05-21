const tips = [
  { icon: '🚲', title: 'Bisiklet kullan', desc: 'Kısa mesafelerde araba yerine bisiklet tercih edin. 1 km bisiklet = 0 kg CO₂.' },
  { icon: '🚆', title: 'Toplu taşıma', desc: 'Özel araç yerine otobüs/tren kullanmak emisyonu %70 azaltır.' },
  { icon: '✈️', title: 'Uçak yolculuğunu azalt', desc: 'Mümkünse trenle seyahat edin. Kısa uçuşlar en yüksek km başı emisyona sahiptir.' },
  { icon: '💡', title: 'Enerji tasarrufu', desc: 'LED ampul kullanın, elektronikleri fişten çekin. Yılda 500 kg CO₂ tasarruf edebilirsiniz.' },
  { icon: '🗑️', title: 'Gıda israfını önleyin', desc: 'Her yıl 1.3 milyar ton gıda çöpe gidiyor. Bu, küresel sera gazı emisyonunun %8\'inden sorumlu. İhtiyacınız kadar alın, artanları değerlendirin.' },
  { icon: '♻️', title: 'Geri dönüşüm', desc: 'Atıklarınızı ayırın. 1 ton geri dönüşüm = 1 ton CO₂ tasarrufu.' },
  { icon: '🌱', title: 'Ağaç dikin', desc: 'Bir ağaç yılda ~22 kg CO₂ emer. Her 10 ağaç = 1 uçak yolculuğu.' },
  { icon: '🔌', title: 'Yenilenebilir enerji', desc: 'Yeşil enerji tarifesine geçerek elektrik kullanımınızı sıfır karbon yapabilirsiniz.' },
]

export default function Tips() {
  return (
    <section className="tips-section">
      <h2>💚 Karbon Ayak İzinizi Azaltma İpuçları</h2>
      <div className="tips-grid">
        {tips.map((tip, i) => (
          <div key={i} className="tip-card">
            <span className="tip-icon">{tip.icon}</span>
            <h4>{tip.title}</h4>
            <p>{tip.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
