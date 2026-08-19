import { useState } from 'react'
import { Home, Heart, Camera, Mail, Menu, X, LogOut } from 'lucide-react'

const NAV = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'playlist', label: 'Our Playlist', icon: Heart },
  { id: 'memories', label: 'Our Memories', icon: Camera },
  { id: 'foryou', label: 'For You', icon: Mail },
]

export default function TopNav({ view, setView, onLogout }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="topnav">
      <div className="topnav-bar">
        <div className="topnav-logo">
          Vidhify<span className="dot">.</span>
        </div>
        <button className="topnav-menu" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className="topnav-tabs">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`topnav-tab ${view === id ? 'active' : ''}`}
            onClick={() => setView(id)}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      {open && (
        <div className="topnav-sheet">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`sheet-link ${view === id ? 'active' : ''}`}
              onClick={() => {
                setView(id)
                setOpen(false)
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
          <button className="sheet-link logout" onClick={onLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  )
}
