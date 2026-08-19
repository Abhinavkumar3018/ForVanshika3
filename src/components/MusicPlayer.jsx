import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Volume2,
  Volume1,
  VolumeX,
  ChevronUp,
  Music2,
} from 'lucide-react'
import { usePlayer } from '../context/PlayerContext.jsx'
import { formatTime } from '../utils.js'
import NowPlayingModal from './NowPlayingModal.jsx'

export default function MusicPlayer() {
  const {
    current,
    isPlaying,
    currentTime,
    duration,
    volume,
    muted,
    liked,
    expanded,
    loadError,
    setExpanded,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
    toggleLike,
  } = usePlayer()

  if (!current) return null

  const VolIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2
  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <>
      <div className="player-bar">
        {loadError && <div className="player-toast">{loadError}</div>}

        <div className="player-left">
          <img
            src={current.cover}
            alt={current.title}
            className="player-cover"
            onClick={() => setExpanded(true)}
          />
          <div className="player-trackinfo" onClick={() => setExpanded(true)}>
            <span className="player-title">{current.title}</span>
            <span className="player-artist">{current.artist}</span>
          </div>
          <button
            className={`like-btn ${liked.has(current.id) ? 'liked' : ''}`}
            onClick={() => toggleLike(current.id)}
            aria-label="Like"
          >
            <Heart size={17} fill={liked.has(current.id) ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="player-center">
          <div className="player-controls">
            <button onClick={prev} aria-label="Previous" className="ctrl-btn">
              <SkipBack size={18} fill="currentColor" />
            </button>
            <button onClick={togglePlay} aria-label="Play or pause" className="ctrl-btn play">
              {isPlaying ? (
                <Pause size={19} fill="currentColor" />
              ) : (
                <Play size={19} fill="currentColor" />
              )}
            </button>
            <button onClick={next} aria-label="Next" className="ctrl-btn">
              <SkipForward size={18} fill="currentColor" />
            </button>
          </div>
          <div className="player-progress">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="seek-bar"
              style={{ '--progress': `${progress}%` }}
              aria-label="Seek"
            />
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="player-right">
          <button className="ctrl-btn" onClick={toggleMute} aria-label="Mute">
            <VolIcon size={18} />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={muted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="volume-bar"
            style={{ '--progress': `${(muted ? 0 : volume) * 100}%` }}
            aria-label="Volume"
          />
        </div>

        <div className="player-mobile-controls">
          <button onClick={togglePlay} aria-label="Play or pause" className="ctrl-btn play">
            {isPlaying ? (
              <Pause size={17} fill="currentColor" />
            ) : (
              <Play size={17} fill="currentColor" />
            )}
          </button>
          <button onClick={next} aria-label="Next" className="ctrl-btn">
            <SkipForward size={18} fill="currentColor" />
          </button>
          <button className="player-mobile-expand" onClick={() => setExpanded(true)} aria-label="Expand player">
            <ChevronUp size={18} />
          </button>
        </div>
      </div>

      {expanded && <NowPlayingModal />}
    </>
  )
}

export function EmptyPlayerHint() {
  return (
    <div className="player-bar player-bar-empty">
      <Music2 size={16} />
      <span>Our songs are waiting here ♡</span>
    </div>
  )
}
