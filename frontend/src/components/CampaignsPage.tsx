import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CompostingCampaign from './CompostingCampaign'
import GreenTariffCampaign from './GreenTariffCampaign'

export default function CampaignsPage() {
  const { t } = useTranslation()

  const campaigns = [
    {
      id: 'compost',
      title: t('campaignsPage.compostTitle'),
      emoji: '🌱',
      desc: t('campaignsPage.compostDesc'),
      component: CompostingCampaign,
    },
    {
      id: 'green-tariff',
      title: t('campaignsPage.greenTariffTitle'),
      emoji: '⚡',
      desc: t('campaignsPage.greenTariffDesc'),
      component: GreenTariffCampaign,
    },
  ]

  const [activeCampaign, setActiveCampaign] = useState(campaigns[0].id)

  const ActiveComponent = campaigns.find((c) => c.id === activeCampaign)?.component

  return (
    <section className="campaigns-page">
      <div className="campaigns-header">
        <h2>{t('campaignsPage.title')}</h2>
        <p>{t('campaignsPage.desc')}</p>
      </div>

      <div className="campaigns-tabs">
        {campaigns.map((c) => (
          <button
            key={c.id}
            className={`campaign-tab ${activeCampaign === c.id ? 'active' : ''}`}
            onClick={() => setActiveCampaign(c.id)}
          >
            {c.emoji} {c.title}
          </button>
        ))}
      </div>

      {ActiveComponent && <ActiveComponent />}
    </section>
  )
}
