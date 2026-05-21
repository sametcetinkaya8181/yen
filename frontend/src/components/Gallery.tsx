import { useState } from 'react'

interface GalleryImage {
  url: string
  title: string
  description: string
  photographer: string
  photographerUrl: string
  source: string
  sourceUrl: string
}

const images: GalleryImage[] = [
  {
    url: 'https://images.pexels.com/photos/16638588/pexels-photo-16638588.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Kutup Ayısı - Buzulların Yok Oluşu',
    description: 'Küresel ısınma yüzünden buzullar eriyor, kutup ayıları yaşam alanlarını kaybediyor. 2040\'a kadar Kuzey Kutbu\'nda yaz aylarında hiç buz kalmayabilir.',
    photographer: 'Brian Hydesmith',
    photographerUrl: 'https://www.pexels.com/@brian-hydesmith-2864446',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/polar-bear-in-snow-16638588/',
  },
  {
    url: 'https://images.pexels.com/photos/27244420/pexels-photo-27244420.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Eriyen Buzul - İzlanda',
    description: 'Buzullar her yıl rekor hızla eriyor. 20 yıl içinde birçok buzul tamamen yok olabilir. Deniz seviyesi yükseliyor, kıyı şehirleri sular altında kalma riskiyle karşı karşıya.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/melting-glacier-on-iceland-27244420/',
  },
  {
    url: 'https://images.pexels.com/photos/28318169/pexels-photo-28318169.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Kaliforniya Yangını - Gece Görüntüsü',
    description: 'Sera gazları yüzünden orman yangınları şiddetleniyor. 2023\'te Kanada yangınları 18 milyon hektar alanı küle çevirdi. Milyonlarca hayvan yaşam alanını kaybetti.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/dramatic-night-view-of-california-wildfire-28318169/',
  },
  {
    url: 'https://images.pexels.com/photos/4621457/pexels-photo-4621457.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Yanan Orman - Yangın Felaketi',
    description: 'Her yıl milyonlarca hektar orman kül oluyor. Karbon salınımı yangınları daha sık ve yıkıcı hale getiriyor. Ekosistemler geri dönülemez şekilde zarar görüyor.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/photo-of-burning-forest-4621457/',
  },
  {
    url: 'https://images.pexels.com/photos/1238347/pexels-photo-1238347.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Orangutan - Yağmur Ormanlarının Yok Oluşu',
    description: 'Palm yağı üretimi için yok edilen yağmur ormanları, orangutanları neslinin tükenmesinin eşiğine getirdi. Her saat 300 futbol sahası büyüklüğünde orman yok oluyor.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/photo-of-primate-1238347/',
  },
  {
    url: 'https://images.pexels.com/photos/23331428/pexels-photo-23331428.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Kuraklık - Çatlamış Topraklar',
    description: 'Küresel ısınma yüzünden kuraklık her geçen yıl şiddetleniyor. Milyonlarca insan susuzluk tehdidi altında. Tarım alanları çöle dönüşüyor, gıda krizi büyüyor.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/cracked-dry-mud-on-ground-23331428/',
  },
  {
    url: 'https://images.pexels.com/photos/929385/pexels-photo-929385.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Fabrika Kirliliği - Hava Kirliliği',
    description: 'Fosil yakıtlar sera gazı salınımının başlıca sebebi. Her yıl 8 milyon insan hava kirliliğine bağlı hastalıklar yüzünden hayatını kaybediyor.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/photography-of-factory-929385/',
  },
  {
    url: 'https://images.pexels.com/photos/9034664/pexels-photo-9034664.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Plastik Kirliliği - Sahilde Çöp',
    description: 'Her yıl 11 milyon ton plastik okyanuslara karışıyor. 2050\'de denizlerde balıktan çok plastik olacak. Deniz canlıları plastik atıklar yüzünden ölüyor.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/plastic-scattered-on-beach-shore-9034664/',
  },
  {
    url: 'https://images.pexels.com/photos/6471927/pexels-photo-6471927.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Sel Felaketi - Sular Altındaki Köy',
    description: 'İklim değişikliği yüzünden seller daha sık ve yıkıcı hale geldi. Milyonlarca insan evini terk etmek zorunda kalıyor. Deniz seviyesi 2100\'e kadar 1 metre yükselebilir.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/flooded-small-village-with-residential-houses-6471927/',
  },
  {
    url: 'https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Çöp Depolama Alanı - Metan Gazı',
    description: 'Çöplüklerde çürüyen organik atıklar metan gazı üretir. Metan, CO₂\'den 25 kat daha zararlıdır. Çöp depolama alanları, küresel metan salınımının %12\'sinden sorumludur.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/dumpsite-under-clear-sky-128421/',
  },
  {
    url: 'https://images.pexels.com/photos/6754758/pexels-photo-6754758.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Endüstriyel Tesis - Havadan Görünüm',
    description: 'Petrol rafinerileri ve sanayi tesisleri en büyük sera gazı kaynakları arasında. Her yıl 36 milyar ton CO₂ atmosfere salınıyor.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/aerial-view-of-industrial-plant-6754758/',
  },
  {
    url: 'https://images.pexels.com/photos/6675078/pexels-photo-6675078.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Gemi Egsozu - Deniz Ulaşımı Kiriliği',
    description: 'Deniz taşımacılığı küresel CO₂ salınımının %3\'ünden sorumlu. Gemiler ayrıca asit yağmurlarına neden olan sülfür oksit yayar.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/a-smokestack-emission-of-an-industrial-exhaust-pipes-6675078/',
  },
  {
    url: 'https://images.pexels.com/photos/15080633/pexels-photo-15080633.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Ormansızlaşma - Kesilen Ağaçlar',
    description: 'Her yıl 10 milyon hektar orman yok ediliyor. Ormanlar karbon yutaklarıdır; yok edildiklerinde depolanan karbon atmosfere karışır ve iklim krizini hızlandırır.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/cut-wood-logs-15080633/',
  },
  {
    url: 'https://images.pexels.com/photos/15763636/pexels-photo-15763636.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Mercan Resifi - Okyanuslar Isınıyor',
    description: 'Okyanus sıcaklığı arttıkça mercanlar beyazlıyor ve ölüyor. Dünya mercan resiflerinin %50\'si son 30 yılda yok oldu. Deniz ekosistemi çöküyor.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/coral-reef-underwater-15763636/',
  },
  {
    url: 'https://images.pexels.com/photos/12281226/pexels-photo-12281226.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Sis ve Hava Kirliliği - Mexico City',
    description: 'Şehirlerdeki hava kirliliği hem sera gazı salınımına yol açar hem de milyonlarca insanın sağlığını tehdit eder. Her 10 kişiden 9\'u kirli hava soluyor.',
    photographer: 'Pexels',
    photographerUrl: 'https://www.pexels.com/@pexels',
    source: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/pemex-executive-tower-in-mexico-city-12281226/',
  },
]

export default function Gallery() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="gallery-section">
      <h2>🌍 Sera Gazlarının Çevresel Etkileri</h2>
      <p className="gallery-subtitle">
        İklim değişikliği sadece sıcaklıkları değil, tüm ekosistemi tehdit ediyor. Aşağıdaki görseller
        sera gazı salınımının yol açtığı yıkımı gözler önüne seriyor.
      </p>

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
