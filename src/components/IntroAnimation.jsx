import { useEffect } from 'react'
import { Sparkles } from 'lucide-react'

export default function IntroAnimation({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="intro-screen" onClick={onDone}>
      <div className="intro-sparkles">
        {Array.from({ length: 18 }).map((_, i) => (
          <Sparkles
            key={i}
            size={12 + (i % 3) * 6}
            className="intro-sparkle"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 31) % 100}%`,
              animationDelay: `${(i % 6) * 0.18}s`,
            }}
          />
        ))}
      </div>
      <div className="intro-content">
        <div className="intro-logo">
          Vidhify<span className="dot">.</span>
        </div>
        <p className="intro-message">Happy 1 Month, my love ♡</p>
      </div>
    </div>
  )
}

