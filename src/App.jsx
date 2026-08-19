import { useEffect, useState } from 'react'
import Login from './components/Login.jsx'
import IntroAnimation from './components/IntroAnimation.jsx'
import Sidebar from './components/Sidebar.jsx'
import TopNav from './components/TopNav.jsx'
import Home from './components/Home.jsx'
import Playlist from './components/Playlist.jsx'
import Memories from './components/Memories.jsx'
import Anniversary from './components/Anniversary.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import { PlayerProvider } from './context/PlayerContext.jsx'

export default function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('vidhify_auth') === 'true')
  const [showIntro, setShowIntro] = useState(false)
  const [justLoggedIn, setJustLoggedIn] = useState(false)
  const [view, setView] = useState('home')

  useEffect(() => {
    if (authed && justLoggedIn) setShowIntro(true)
  }, [authed, justLoggedIn])

  const handleLoginSuccess = () => {
    setAuthed(true)
    setJustLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('vidhify_auth')
    setAuthed(false)
    setJustLoggedIn(false)
    setView('home')
  }

  if (!authed) return <Login onSuccess={handleLoginSuccess} />
  if (showIntro) return <IntroAnimation onDone={() => setShowIntro(false)} />

  return (
    <PlayerProvider>
      <div className="app-shell">
        <Sidebar view={view} setView={setView} onLogout={handleLogout} />
        <TopNav view={view} setView={setView} onLogout={handleLogout} />
        <main className="app-content">
          {view === 'home' && <Home goPlaylist={() => setView('playlist')} />}
          {view === 'playlist' && <Playlist />}
          {view === 'memories' && <Memories />}
          {view === 'foryou' && <Anniversary />}
        </main>
        <MusicPlayer />
      </div>
    </PlayerProvider>
  )
}
