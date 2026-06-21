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
        ...(isGame ? { left: '1rem' } : { right: '1rem' }),
        zIndex: 50,
        background: 'rgba(10,10,20,0.75)',
        border: '1px solid rgba(124,106,247,0.5)',
        color: '#a89ef8',
        fontSize: '0.55rem',
        padding: '6px 10px',
        cursor: 'pointer',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 0 8px rgba(124,106,247,0.3)',
      }}
    >
      {isGame ? '≡ PORTFOLIO' : '▶ PLAY GAME'}
    </button>
  )
}
