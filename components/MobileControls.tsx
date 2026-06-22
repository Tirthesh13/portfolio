'use client'
import { GameEngine } from '@/game/engine'

declare global {
  interface Window { gameEngine?: GameEngine }
}

function DBtn({ label, k }: { label: string; k: string }) {
  return (
    <button
      className="flex items-center justify-center bg-black/80 border border-[#7c6af7]/50 font-pixel text-[#7c6af7] select-none touch-none active:bg-[#7c6af7]/25"
      style={{ width: 44, height: 44, fontSize: 16 }}
      onTouchStart={(e) => { e.preventDefault(); window.gameEngine?.simulateKey(k, 'down') }}
      onTouchEnd={(e) => { e.preventDefault(); window.gameEngine?.simulateKey(k, 'up') }}
      onMouseDown={() => window.gameEngine?.simulateKey(k, 'down')}
      onMouseUp={() => window.gameEngine?.simulateKey(k, 'up')}
    >
      {label}
    </button>
  )
}

export default function MobileControls() {
  const handleTalk = (type: 'down' | 'up') => {
    if (type === 'down') {
      window.gameEngine?.simulateKey('e', 'down')
      // Also fires game:advance-dialogue so DialogBox advances text on mobile
      window.dispatchEvent(new Event('game:advance-dialogue'))
    } else {
      window.gameEngine?.simulateKey('e', 'up')
    }
  }

  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '8px 12px 50px', // 50px bottom: leaves room for PORTFOLIO toggle
        pointerEvents: 'none',
      }}
    >
      {/* D-pad — left side */}
      <div style={{ pointerEvents: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '44px 44px 44px', gridTemplateRows: '44px 44px 44px', gap: 2 }}>
          {/* Row 1 */}
          <div />
          <DBtn label="▲" k="ArrowUp" />
          <div />
          {/* Row 2 */}
          <DBtn label="◀" k="ArrowLeft" />
          <div style={{ width: 44, height: 44, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(124,106,247,0.2)' }} />
          <DBtn label="▶" k="ArrowRight" />
          {/* Row 3 */}
          <div />
          <DBtn label="▼" k="ArrowDown" />
          <div />
        </div>
      </div>

      {/* TALK button — right side */}
      <div style={{ pointerEvents: 'auto' }}>
        <button
          className="font-pixel select-none touch-none active:bg-[#f5c842]/20"
          style={{
            width: 72,
            height: 136,
            background: 'rgba(0,0,0,0.85)',
            border: '2px solid rgba(245,200,66,0.65)',
            color: '#f5c842',
            fontSize: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '0.05em',
            boxShadow: '0 0 10px rgba(245,200,66,0.25)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            cursor: 'pointer',
          }}
          onTouchStart={(e) => { e.preventDefault(); handleTalk('down') }}
          onTouchEnd={(e) => { e.preventDefault(); handleTalk('up') }}
          onMouseDown={() => handleTalk('down')}
          onMouseUp={() => handleTalk('up')}
        >
          [A] TALK
        </button>
      </div>
    </div>
  )
}
