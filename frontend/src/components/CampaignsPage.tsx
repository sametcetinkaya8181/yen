import { useState } from 'react'
import CompostingCampaign from './CompostingCampaign'
import GreenTariffCampaign from './GreenTariffCampaign'

const campaigns = [
  {
    id: 'compost',
    title: 'Kompost Kampanyası',
    emoji: '🌱',
    desc: 'Mutfak atıklarınızı kompost yaparak metan gazı oluşumunu engelleyin.',
    component: CompostingCampaign,
  },
  {
    id: 'green-tariff',
    title: 'Yeşil Tarifeyi Seç, Tarafın Belli',
    emoji: '⚡',
    desc: 'Yeşil tarifeyi seç, tarafın belli — ama cüzdanın acır mı?',
    component: GreenTariffCampaign,
  },
]

export default function CampaignsPage() {
  const [activeCampaign, setActiveCampaign] = useState(campaigns[0].id)

  const ActiveComponent = campaigns.find((c) => c.id === activeCampaign)?.component

  return (
    <section className="campaigns-page">
      <div className="campaigns-header">
        <h2>🎯 Kampanyalar</h2>
        <p>İklim değişikliğiyle mücadele etmek için düzenlenen kampanyalara katılın, etkinizi görün.</p>
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
