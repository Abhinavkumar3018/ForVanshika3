import { ChevronDown, Play, Pause, SkipBack, SkipForward, Heart } from 'lucide-react'
import { usePlayer } from '../context/PlayerContext.jsx'
import { formatTime } from '../utils.js'

export default function NowPlayingModal() {
  const {
    current,
    isPlaying,
    currentTime,
    duration,
    liked,
    setExpanded,
    togglePlay,
    next,
    prev,
    seek,
    toggleLike,
  } = usePlayer()

  if (!current) return null
  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="now-playing">
      <div className="now-playing-head">
        <button onClick={() => setExpanded(false)} aria-label="Collapse">
          <ChevronDown size={24} />
        </button>
        <span>Now Playing</span>
        <span style={{ width: 24 }} />
      </div>

      <div className="now-playing-art">
        <img src={current.cover} alt={current.title} />
      </div>

      <div className="now-playing-info">
        <div>
          <h2>{current.title}</h2>
          <p>{current.artist}</p>
        </div>
        <button
          className={`like-btn large ${liked.has(current.id) ? 'liked' : ''}`}
          onClick={() => toggleLike(current.id)}
        >
          <Heart size={22} fill={liked.has(current.id) ? 'currentColor' : 'none'} />
        </button>
      </div>

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        className="seek-bar large"
        style={{ '--progress': `${progress}%` }}
        aria-label="Seek"
      />
      <div className="now-playing-times">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="now-playing-controls">
        <button onClick={prev} aria-label="Previous">
          <SkipBack size={26} fill="currentColor" />
        </button>
        <button className="play-large" onClick={togglePlay} aria-label="Play or pause">
          {isPlaying ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" />}
        </button>
        <button onClick={next} aria-label="Next">
          <SkipForward size={26} fill="currentColor" />
        </button>
      </div>
    </div>
  )
}
