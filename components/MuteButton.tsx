'use client'
import { useState } from 'react'
import { audioEngine } from '@/game/audio'

export default function MuteButton() {
  const [muted, setMuted] = useState(false)

  const toggle = () => {
    audioEngine.toggleMute()
    setMuted(!muted)
  }

  return (
    <button
      onClick={toggle}
      className="font-pixel"
      style={{
        position: 'fixed',
        top: '4.5rem',
        right: '1rem',
        zIndex: 25,
        background: 'rgba(0,0,0,0.7)',
        border: '1px solid rgba(124,106,247,0.35)',
        color: muted ? '#555' : '#a89ef8',
        fontSize: '0.55rem',
        padding: '4px 8px',
        cursor: 'pointer',
      }}
      title={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  )
}
