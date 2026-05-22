import { useTranslation } from 'react-i18next'

export default function Tips() {
  const { t } = useTranslation()
  const tips = t('tips.items', { returnObjects: true }) as { icon: string; title: string; desc: string }[]

  return (
    <section className="tips-section">
      <h2>{t('tips.title')}</h2>
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
