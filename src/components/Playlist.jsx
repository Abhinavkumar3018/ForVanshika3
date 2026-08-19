import { Play, Pause, Heart, Music2 } from 'lucide-react'
import { usePlayer } from '../context/PlayerContext.jsx'
import { formatTime } from '../utils.js'
import Footer from './Footer.jsx'

export default function Playlist() {
  const { songs, current, isPlaying, currentIndex, playIndex, togglePlay, liked, toggleLike } =
    usePlayer()

  return (
    <div className="page">
      <div className="page-head">
        <h1>Songs That Feel Like Us</h1>
        <p>{songs.length} songs, made for us.</p>
      </div>

      {songs.length === 0 ? (
        <div className="empty-state">
          <Music2 size={36} />
          <p>Our songs are waiting here ♡</p>
        </div>
      ) : (
        <div className="song-table">
          <div className="song-table-head">
            <span>#</span>
            <span>Title</span>
            <span className="hide-sm">Album</span>
            <span>Time</span>
          </div>
          {songs.map((song, i) => {
            const isCurrent = current?.id === song.id
            const playingThis = isCurrent && isPlaying
            return (
              <div
                key={song.id}
                className={`song-row ${isCurrent ? 'current' : ''}`}
                onClick={() => (isCurrent ? togglePlay() : playIndex(i))}
              >
                <span className="song-index">
                  {playingThis ? (
                    <Pause size={15} />
                  ) : (
                    <>
                      <span className="idx-num">{i + 1}</span>
                      <Play size={15} className="idx-play" fill="currentColor" />
                    </>
                  )}
                </span>
                <span className="song-main">
                  <img src={song.cover} alt="" />
                  <span className="song-titles">
                    <span className="song-title">{song.title}</span>
                    <span className="song-artist">{song.artist}</span>
                  </span>
                </span>
                <span className="song-album hide-sm">{song.album}</span>
                <span className="song-meta">
                  <button
                    className={`like-btn ${liked.has(song.id) ? 'liked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(song.id)
                    }}
                    aria-label="Like song"
                  >
                    <Heart size={15} fill={liked.has(song.id) ? 'currentColor' : 'none'} />
                  </button>
                  <span className="song-duration">{formatTime(song.duration)}</span>
                </span>
              </div>
            )
          })}
        </div>
      )}

      <Footer />
    </div>
  )
}

