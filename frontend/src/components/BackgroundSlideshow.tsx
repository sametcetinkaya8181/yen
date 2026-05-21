import { useState, useEffect, useRef } from 'react'

const bgImages = [
  'https://images.pexels.com/photos/16638588/pexels-photo-16638588.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/27244420/pexels-photo-27244420.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/28318169/pexels-photo-28318169.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/4621457/pexels-photo-4621457.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/929385/pexels-photo-929385.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/9034664/pexels-photo-9034664.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/6471927/pexels-photo-6471927.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/1238347/pexels-photo-1238347.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/23331428/pexels-photo-23331428.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/6754758/pexels-photo-6754758.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/6675078/pexels-photo-6675078.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/15080633/pexels-photo-15080633.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/15763636/pexels-photo-15763636.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/12281226/pexels-photo-12281226.jpeg?auto=compress&cs=tinysrgb&w=1920',
]

export default function BackgroundSlideshow() {
  const [layerA, setLayerA] = useState({ url: bgImages[0], opacity: 0.5 })
  const [layerB, setLayerB] = useState({ url: bgImages[1], opacity: 0 })
  const idxRef = useRef(0)

  useEffect(() => {
    bgImages.forEach((src) => { const img = new Image(); img.src = src })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % bgImages.length
      const nextUrl = bgImages[(idxRef.current + 1) % bgImages.length]

      if (layerA.opacity > 0) {
        setLayerA((prev) => ({ ...prev, opacity: 0 }))
        setLayerB({ url: nextUrl, opacity: 0.5 })
      } else {
        setLayerB((prev) => ({ ...prev, opacity: 0 }))
        setLayerA({ url: nextUrl, opacity: 0.5 })
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [layerA.opacity])

  return (
    <div className="bg-slideshow">
      <div
        className="bg-slide"
        style={{
          backgroundImage: `url(${layerA.url})`,
          opacity: layerA.opacity,
          transition: 'opacity 2.5s ease-in-out',
        }}
      />
      <div
        className="bg-slide"
        style={{
          backgroundImage: `url(${layerB.url})`,
          opacity: layerB.opacity,
          transition: 'opacity 2.5s ease-in-out',
        }}
      />
      <div className="bg-overlay" />
      <div className="bg-attribution">
        Görsel kaynağı: Pexels.com (CC0 Lisansı)
      </div>
    </div>
  )
}
