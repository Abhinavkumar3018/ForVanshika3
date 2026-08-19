import { Play } from 'lucide-react'
import { usePlayer } from '../context/PlayerContext.jsx'
import Footer from './Footer.jsx'

const COLLAGE = [
  { src: '/ForVanshika3/images/1.jpeg', top: '4%', left: '2%', size: 150, rot: -6, delay: 0 },
  { src: '/ForVanshika3/images/4.jpeg', top: '2%', left: '58%', size: 130, rot: 5, delay: 0.6 },
  { src: '/ForVanshika3/images/9.jpeg', top: '34%', left: '76%', size: 140, rot: -4, delay: 1.2 },
  { src: '/ForVanshika3/images/5.jpeg', top: '52%', left: '10%', size: 120, rot: 7, delay: 0.3 },
  { src: '/ForVanshika3/images/12.jpeg', top: '60%', left: '46%', size: 150, rot: -3, delay: 0.9 },
  { src: '/ForVanshika3/images/7.jpeg', top: '10%', left: '32%', size: 100, rot: 4, delay: 1.5 },
]

export default function Home({ goPlaylist }) {
  const { songs, playIndex } = usePlayer()

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-collage" aria-hidden="true">
          {COLLAGE.map((p, i) => (
            <img
              key={i}
              src={p.src}
              alt=""
              className="collage-photo"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                '--rot': `${p.rot}deg`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="hero-text">
          <h1>One Month of Us ♡</h1>
          <p>30 days, countless memories, and a soundtrack that belongs to us.</p>
          <button className="btn-play-story" onClick={() => playIndex(0)}>
            <Play size={18} fill="currentColor" />
            Play Our Story
          </button>
        </div>
      </section>

      <section className="made-for-you">
        <h2>Made for You</h2>
        <div className="playlist-card" onClick={goPlaylist}>
          <img src="/ForVanshika3/images/1.jpeg" alt="Our Story cover" className="playlist-cover" />
          <div className="playlist-info">
            <span className="playlist-eyebrow">Playlist</span>
            <h3>Our Story ♡</h3>
            <p>A collection of us</p>
            <span className="playlist-count">{songs.length} songs</span>
          </div>
          <button
            className="playlist-play"
            onClick={(e) => {
              e.stopPropagation()
              playIndex(0)
            }}
            aria-label="Play Our Story"
          >
            <Play size={20} fill="currentColor" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

