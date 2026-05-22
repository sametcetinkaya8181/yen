import { useTranslation } from 'react-i18next'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'
import type { CarbonFootprintResponse } from '../types/carbon'

const COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff']

interface Props {
  data: CarbonFootprintResponse
}

export default function CarbonResult({ data }: Props) {
  const { t } = useTranslation()

  const CATEGORY_LABELS: Record<string, string> = {
    transportation: t('carbonResult.categoryTransportation'),
    energy: t('carbonResult.categoryEnergy'),
    food: t('carbonResult.categoryFood'),
    waste: t('carbonResult.categoryWaste'),
  }

  const pieData = Object.entries(data.breakdown).map(([key, value]) => ({
    name: CATEGORY_LABELS[key] || key,
    value,
  }))

  const comparisonData = [
    { name: t('carbonResult.yourFootprint'), ton: data.totalAnnualTonsCO2, fill: '#ff6b6b' },
    { name: t('carbonResult.turkeyAverage'), ton: data.turkeyAverageTons, fill: '#ffd93d' },
    { name: t('carbonResult.worldAverage'), ton: data.worldAverageTons, fill: '#6bcb77' },
  ]

  const disposalLabel = (method: string) => {
    if (method === 'recycling') return t('carbonResult.disposalRecycling')
    if (method === 'incineration') return t('carbonResult.disposalIncineration')
    return t('carbonResult.disposalLandfill')
  }

  return (
    <div className="carbon-result">
      <div className="result-hero">
        <div className="result-number">
          <span className="big-number">{data.totalAnnualTonsCO2}</span>
          <span className="unit">{t('carbonResult.unitPerYear')}</span>
        </div>
        <p className="equivalent">
          {t('carbonResult.equivalent', { trees: data.treesNeeded })}
        </p>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h3>{t('carbonResult.chartCategory')}</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name} %${value}`}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>{t('carbonResult.chartComparison')}</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={comparisonData}>
              <XAxis dataKey="name" />
              <YAxis unit=" ton" />
              <Tooltip />
              <Legend />
              <Bar dataKey="ton" name="CO₂ (ton)">
                {comparisonData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {data.foodDetails.length > 0 && (
        <div className="detail-section">
          <h3>{t('carbonResult.foodDetails')}</h3>
          <div className="detail-list">
            {data.foodDetails.map((f, i) => (
              <div key={i} className="detail-row">
                <span className="detail-name">{f.name}</span>
                <span>{f.kgPerWeek} {t('carbonResult.kgPerWeek')}</span>
                <span className="detail-co2">{(f.annualCo2 / 1000).toFixed(2)} {t('carbonResult.tonPerYear')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.wasteDetails.length > 0 && (
        <div className="detail-section">
          <h3>{t('carbonResult.wasteDetails')}</h3>
          <div className="detail-list">
            {data.wasteDetails.map((w, i) => (
              <div key={i} className="detail-row waste-row">
                <span className="detail-name">{w.icon} {w.label}</span>
                <span>{w.kgPerWeek} {t('carbonResult.kgPerWeek')} ({disposalLabel(w.disposalMethod)})</span>
                <span className={`detail-co2 ${w.annualCo2 < 0 ? 'negative' : ''}`}>
                  {(w.annualCo2 / 1000).toFixed(2)} {t('carbonResult.tonPerYear')}
                </span>
              </div>
            ))}
          </div>
          {data.wasteDetails.some((w) => w.annualCo2 > 0) && (
            <div className="waste-warning">
              ⚠️ {data.wasteDetails.filter((w) => w.annualCo2 > 0).map((w) => w.damageFact).filter(Boolean).join(' ')}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
