import { useState } from 'react'
import { Eye, EyeOff, Heart } from 'lucide-react'

const SECRET = 'BABBA'

export default function Login({ onSuccess }) {
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [leaving, setLeaving] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (value.trim().toUpperCase() === SECRET) {
      setError('')
      setLeaving(true)
      localStorage.setItem('vidhify_auth', 'true')
      setTimeout(onSuccess, 550)
    } else {
      setError('Hmm... that’s not our secret word ♡')
    }
  }

  return (
    <div className={`login-screen ${leaving ? 'login-leave' : ''}`}>
      <div className="login-glow" />
      <form className="login-card" onSubmit={submit}>
        <div className="login-logo">
          Vidhify<span className="dot">.</span>
        </div>
        <h1 className="login-heading">Welcome to our little world ♡</h1>
        <p className="login-sub">A playlist made for us.</p>

        <div className="login-field">
          <input
            type={show ? 'text' : 'password'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter our secret word"
            autoFocus
            aria-label="Password"
          />
          <button
            type="button"
            className="field-toggle"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="btn-enter">
          Enter Vidhify
        </button>

        <p className="login-hint">
          <Heart size={13} className="hint-heart" /> Hint: the cute name I call you ♡
        </p>
      </form>
    </div>
  )
}

