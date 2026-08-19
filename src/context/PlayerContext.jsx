import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { songs } from '../data/songs.js'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [liked, setLiked] = useState(() => new Set())
  const [expanded, setExpanded] = useState(false)
  const [loadError, setLoadError] = useState(null)

  const current = songs[currentIndex] || null

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.muted = muted
  }, [volume, muted])

  const playIndex = useCallback((index) => {
    if (index < 0 || index >= songs.length) return
    setLoadError(null)
    setCurrentIndex(index)
    setIsPlaying(true)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !current) return
    setLoadError(null)
    audio.src = current.audio
    audio.load()
    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false)
        setLoadError('Add this song’s mp3 to /public/music ♡')
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !current) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false)
          setLoadError('Add this song’s mp3 to /public/music ♡')
        })
    }
  }, [isPlaying, current])

  const next = useCallback(() => {
    if (!songs.length) return
    const nextIndex = (currentIndex + 1) % songs.length
    playIndex(nextIndex)
  }, [currentIndex, playIndex])

  const prev = useCallback(() => {
    if (!songs.length) return
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length
    playIndex(prevIndex)
  }, [currentIndex, playIndex])

  const seek = useCallback((time) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
    setCurrentTime(time)
  }, [])

  const toggleMute = useCallback(() => setMuted((m) => !m), [])

  const toggleLike = useCallback((id) => {
    setLiked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const onTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime || 0)
  const onLoadedMetadata = () => setDuration(audioRef.current?.duration || current?.duration || 0)
  const onEnded = () => next()
  const onError = () => {
    setIsPlaying(false)
    setLoadError('Add this song’s mp3 to /public/music ♡')
  }

  const value = {
    songs,
    current,
    currentIndex,
    isPlaying,
    currentTime,
    duration: duration || current?.duration || 0,
    volume,
    muted,
    liked,
    expanded,
    loadError,
    setExpanded,
    playIndex,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
    toggleLike,
  }

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        onError={onError}
        preload="metadata"
      />
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
