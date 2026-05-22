import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface GalleryImage {
  url: string
  title: string
  description: string
  photographer: string
  photographerUrl: string
  source: string
  sourceUrl: string
}

const imageMeta: Omit<GalleryImage, 'title' | 'description'>[] = [
  {
    url: 'https://images.pexels.com/photos/16638588/pexels-photo-16638588.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Brian Hydesmith',
    photographerUrl: 'https://www.pexels.com/@brian-hydesmith-2864446',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/polar-bear-in-snow-16638588/',
  },
  {
    url: 'https://images.pexels.com/photos/27244420/pexels-photo-27244420.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/melting-glacier-on-iceland-27244420/',
  },
  {
    url: 'https://images.pexels.com/photos/28318169/pexels-photo-28318169.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/dramatic-night-view-of-california-wildfire-28318169/',
  },
  {
    url: 'https://images.pexels.com/photos/4621457/pexels-photo-4621457.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/photo-of-burning-forest-4621457/',
  },
  {
    url: 'https://images.pexels.com/photos/1238347/pexels-photo-1238347.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/photo-of-primate-1238347/',
  },
  {
    url: 'https://images.pexels.com/photos/23331428/pexels-photo-23331428.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/cracked-dry-mud-on-ground-23331428/',
  },
  {
    url: 'https://images.pexels.com/photos/929385/pexels-photo-929385.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/photography-of-factory-929385/',
  },
  {
    url: 'https://images.pexels.com/photos/9034664/pexels-photo-9034664.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/plastic-scattered-on-beach-shore-9034664/',
  },
  {
    url: 'https://images.pexels.com/photos/6471927/pexels-photo-6471927.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/flooded-small-village-with-residential-houses-6471927/',
  },
  {
    url: 'https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/dumpsite-under-clear-sky-128421/',
  },
  {
    url: 'https://images.pexels.com/photos/6754758/pexels-photo-6754758.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/aerial-view-of-industrial-plant-6754758/',
  },
  {
    url: 'https://images.pexels.com/photos/6675078/pexels-photo-6675078.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/a-smokestack-emission-of-an-industrial-exhaust-pipes-6675078/',
  },
  {
    url: 'https://images.pexels.com/photos/15080633/pexels-photo-15080633.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/cut-wood-logs-15080633/',
  },
  {
    url: 'https://images.pexels.com/photos/15763636/pexels-photo-15763636.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/coral-reef-underwater-15763636/',
  },
  {
    url: 'https://images.pexels.com/photos/12281226/pexels-photo-12281226.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/pemex-executive-tower-in-mexico-city-12281226/',
  },
]

export default function Gallery() {
  const { t } = useTranslation()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const translated = t('gallery.images', { returnObjects: true }) as { title: string; description: string }[]

  const images: GalleryImage[] = imageMeta.map((meta, i) => ({
    ...meta,
    title: translated[i]?.title ?? meta.url,
    description: translated[i]?.description ?? '',
  }))

  return (
    <section className="gallery-section">
      <h2>{t('gallery.title')}</h2>
      <p className="gallery-subtitle">{t('gallery.subtitle')}</p>

      <div className="gallery-grid">
        {images.map((img, i) => (
          <div
            key={i}
            className={`gallery-card ${expandedIndex === i ? 'expanded' : ''}`}
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
          >
            <div className="gallery-image-wrapper">
              <img
                src={img.url}
                alt={img.title}
                loading="lazy"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3>{img.title}</h3>
              </div>
            </div>

            {expandedIndex === i && (
              <div className="gallery-details">
                <p className="gallery-description">{img.description}</p>
                <p className="gallery-attribution">
                  📸 <a href={img.photographerUrl} target="_blank" rel="noopener noreferrer">{img.photographer}</a>
                  {' '}·{' '}
                  <a href={img.sourceUrl} target="_blank" rel="noopener noreferrer">{img.source}</a>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
