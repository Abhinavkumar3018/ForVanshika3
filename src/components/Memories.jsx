import { useState } from 'react'
import Lightbox from './Lightbox.jsx'
import Footer from './Footer.jsx'

const PHOTOS = Array.from({ length: 14 }, (_, i) => `/images/${i + 1}.jpeg`)

export default function Memories() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="page">
      <div className="page-head">
        <h1>Our Memories</h1>
        <p>Every photo, one little world.</p>
      </div>

      <div className="memory-grid">
        {PHOTOS.map((src, i) => (
          <button className="memory-item" key={src} onClick={() => setOpenIndex(i)}>
            <img src={src} alt={`Memory ${i + 1}`} loading="lazy" />
            <span className="memory-overlay" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={PHOTOS}
          index={openIndex}
          setIndex={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}

      <Footer />
    </div>
  )
}
