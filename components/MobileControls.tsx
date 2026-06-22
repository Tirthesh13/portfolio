'use client'

import { GameEngine } from '@/game/engine'

declare global {
  interface Window { gameEngine?: GameEngine }
}

function DPadButton({ label, keyName }: { label: string; keyName: string }) {
  const handleTouch = (type: 'down' | 'up') => window.gameEngine?.simulateKey(keyName, type)
  return (
    <button
      className="w-14 h-14 bg-black/75 border border-[#7c6af7]/60 font-pixel text-[#7c6af7] text-base flex items-center justify-center active:bg-[#7c6af7]/30 select-none touch-none"
      onTouchStart={(e) => { e.preventDefault(); handleTouch('down') }}
      onTouchEnd={(e) => { e.preventDefault(); handleTouch('up') }}
      onMouseDown={() => handleTouch('down')}
      onMouseUp={() => handleTouch('up')}
    >
      {label}
    </button>
  )
}

export default function MobileControls() {
  return (
    <div className="fixed bottom-12 right-3 z-20 md:hidden flex flex-col items-end gap-2">
      {/* D-pad */}
      <div className="relative w-44 h-44">
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <DPadButton label="▲" keyName="ArrowUp" />
        </div>
        <div className="absolute top-14 left-0">
          <DPadButton label="◀" keyName="ArrowLeft" />
        </div>
        <div className="absolute top-14 right-0">
          <DPadButton label="▶" keyName="ArrowRight" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <DPadButton label="▼" keyName="ArrowDown" />
        </div>
      </div>
      {/* Action button */}
      <button
        className="w-full px-4 h-12 bg-black/80 border-2 border-[#f5c842]/70 font-pixel text-[#f5c842] text-xs active:bg-[#f5c842]/20 select-none touch-none"
        style={{ boxShadow: '0 0 8px rgba(245,200,66,0.3)' }}
        onTouchStart={(e) => { e.preventDefault(); window.gameEngine?.simulateKey('e', 'down') }}
        onTouchEnd={(e) => { e.preventDefault(); window.gameEngine?.simulateKey('e', 'up') }}
        onMouseDown={() => window.gameEngine?.simulateKey('e', 'down')}
        onMouseUp={() => window.gameEngine?.simulateKey('e', 'up')}
      >
        [A] TALK
      </button>
    </div>
  )
}
