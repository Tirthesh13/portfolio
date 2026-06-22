'use client'
import { useGameStore } from '@/store/gameStore'

export default function FloatingModeToggle() {
  const mode = useGameStore((s) => s.mode)
  const setMode = useGameStore((s) => s.setMode)

  const isGame = mode === 'game'

  return (
    <button
      onClick={() => setMode(isGame ? 'portfolio' : 'game')}
      className="font-pixel"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        background: 'rgba(10,10,20,0.85)',
        border: `1px solid ${isGame ? 'rgba(124,106,247,0.6)' : 'rgba(245,200,66,0.6)'}`,
        color: isGame ? '#a89ef8' : '#f5c842',
        fontSize: '0.55rem',
        padding: '8px 16px',
        cursor: 'pointer',
        backdropFilter: 'blur(6px)',
        boxShadow: isGame
          ? '0 0 12px rgba(124,106,247,0.35)'
          : '0 0 12px rgba(245,200,66,0.35)',
        whiteSpace: 'nowrap',
      }}
    >
      {isGame ? '≡ PORTFOLIO VIEW' : '▶ PLAY GAME'}
    </button>
  )
}
