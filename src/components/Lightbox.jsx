import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ photos, index, setIndex, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % photos.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [photos.length, onClose, setIndex])

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        <X size={26} />
      </button>
      <span className="lightbox-counter">
        {index + 1} / {photos.length}
      </span>
      <button
        className="lightbox-nav prev"
        onClick={(e) => {
          e.stopPropagation()
          setIndex((i) => (i - 1 + photos.length) % photos.length)
        }}
        aria-label="Previous"
      >
        <ChevronLeft size={28} />
      </button>
      <img
        src={photos[index]}
        alt=""
        className="lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="lightbox-nav next"
        onClick={(e) => {
          e.stopPropagation()
          setIndex((i) => (i + 1) % photos.length)
        }}
        aria-label="Next"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  )
}
