'use client'

import { GameEngine } from '@/game/engine'

declare global {
  interface Window { gameEngine?: GameEngine }
}

function DPadButton({ label, keyName, className }: { label: string; keyName: string; className: string }) {
  const handleTouch = (type: 'down' | 'up') => window.gameEngine?.simulateKey(keyName, type)
  return (
    <button
      className={`${className} w-12 h-12 bg-black/70 border border-[#7c6af7]/50 font-pixel text-[#7c6af7] text-sm flex items-center justify-center active:bg-[#7c6af7]/30`}
      onTouchStart={() => handleTouch('down')}
      onTouchEnd={() => handleTouch('up')}
      onMouseDown={() => handleTouch('down')}
      onMouseUp={() => handleTouch('up')}
    >
      {label}
    </button>
  )
}

export default function MobileControls() {
  return (
    <div className="fixed bottom-20 right-4 z-20 md:hidden">
      <div className="relative w-36 h-36">
        <DPadButton label="▲" keyName="ArrowUp" className="absolute top-0 left-12" />
        <DPadButton label="◀" keyName="ArrowLeft" className="absolute top-12 left-0" />
        <DPadButton label="▶" keyName="ArrowRight" className="absolute top-12 right-0" />
        <DPadButton label="▼" keyName="ArrowDown" className="absolute bottom-0 left-12" />
      </div>
      <button
        className="mt-2 w-full h-10 bg-black/70 border border-[#f5c842]/50 font-pixel text-[#f5c842] text-xs"
        onTouchStart={() => window.gameEngine?.simulateKey('e', 'down')}
        onTouchEnd={() => window.gameEngine?.simulateKey('e', 'up')}
        onMouseDown={() => window.gameEngine?.simulateKey('e', 'down')}
        onMouseUp={() => window.gameEngine?.simulateKey('e', 'up')}
      >
        [A] TALK
      </button>
    </div>
  )
}
