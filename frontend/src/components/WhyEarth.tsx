import { useTranslation } from 'react-i18next'

const sectionImages = [
  'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/355770/pexels-photo-355770.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/414659/pexels-photo-414659.jpeg?auto=compress&cs=tinysrgb&w=800',
]

export default function WhyEarth() {
  const { t } = useTranslation()

  const sections = t('whyEarth.sections', { returnObjects: true }) as {
    title: string
    body: string
    items?: string[]
  }[]

  return (
    <section className="why-earth">
      <div className="why-earth-hero" style={{ backgroundImage: `url(${sectionImages[0]})` }}>
        <div className="why-earth-hero-overlay">
          <span className="why-earth-emoji">🌍</span>
          <h2>{t('whyEarth.title')}</h2>
          <p className="why-earth-subtitle">{t('whyEarth.subtitle')}</p>
        </div>
      </div>

      {sections.map((section, i) => (
        <div key={i} className={`why-earth-section${i >= 1 ? ' no-bg' : ''}`}>
          {i === 0 && <div className="why-earth-section-bg" style={{ backgroundImage: `url(${sectionImages[i + 1] || sectionImages[0]})` }} />}
          <div className="why-earth-section-content">
            <h3>{section.title}</h3>
            <p>{section.body}</p>
            {section.items && (
              <ul>
                {section.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}

      <div className="why-earth-footer">
        <p>{t('whyEarth.footer')}</p>
      </div>
    </section>
  )
}
