import { useEffect, useRef, useState } from 'react'
import Footer from './Footer.jsx'

const LINE1 =
  "One month might sound small, but somehow you've already become such a beautiful part of my everyday life."
const LINE2 =
  "Here's to the memories we've already made, the songs we've shared, the silly moments, the quiet ones, and all the ones still waiting for us."
const FINAL = 'Happy 1 Month, my love ♡'

export default function Anniversary() {
  const [typed, setTyped] = useState('')
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(FINAL.slice(0, i))
      if (i >= FINAL.length) clearInterval(id)
    }, 55)
    return () => clearInterval(id)
  }, [visible])

  return (
    <div className="page">
      <div className="page-head">
        <h1>One Month With You</h1>
      </div>

      <section className={`anniversary ${visible ? 'in-view' : ''}`} ref={ref}>
        <img className="anniversary-photo" src="/images/10.jpeg" alt="Us" />
        <div className="anniversary-text">
          <p className="fade-line" style={{ transitionDelay: '0.1s' }}>
            {LINE1}
          </p>
          <p className="fade-line" style={{ transitionDelay: '0.4s' }}>
            {LINE2}
          </p>
          <p className="anniversary-final">
            {typed}
            <span className="caret">|</span>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
