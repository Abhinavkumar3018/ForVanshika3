import { Home, Heart, Camera, Mail, LogOut } from 'lucide-react'

const NAV = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'playlist', label: 'Our Playlist', icon: Heart },
  { id: 'memories', label: 'Our Memories', icon: Camera },
  { id: 'foryou', label: 'For You', icon: Mail },
]

export default function Sidebar({ view, setView, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        Vidhify<span className="dot">.</span>
      </div>
      <nav className="sidebar-nav">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`sidebar-link ${view === id ? 'active' : ''}`}
            onClick={() => setView(id)}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={onLogout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
        <p>Vidhify • made with love</p>
      </div>
    </aside>
  )
}

