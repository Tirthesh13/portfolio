'use client'
import { useGameStore } from '@/store/gameStore'

export default function HUD() {
  const { currentZone, showInteract } = useGameStore()

  return (
    <>
      {/* Top Left - Player stats */}
      <div className="fixed top-4 left-4 z-20 pointer-events-none">
        <div className="bg-black/70 border border-[#7c6af7]/40 p-3 min-w-48">
          <p className="font-pixel text-[#f5c842] text-xs mb-3">TIRTHESH · LVL.26</p>
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="font-pixel text-red-400 text-xs">CODE</span>
              <span className="font-pixel text-red-400 text-xs">∞/∞</span>
            </div>
            <div className="h-2 bg-gray-800 border border-red-900">
              <div className="h-full bg-red-500 w-full" />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-pixel text-blue-400 text-xs">CREATIVE</span>
              <span className="font-pixel text-blue-400 text-xs">∞/∞</span>
            </div>
            <div className="h-2 bg-gray-800 border border-blue-900">
              <div className="h-full bg-blue-500 w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Right - Zone */}
      <div className="fixed top-4 right-4 z-20 pointer-events-none">
        <div className="bg-black/70 border border-[#f5c842]/40 p-3">
          <p className="font-pixel text-gray-500 text-xs mb-1">CURRENT ZONE</p>
          <p className="font-pixel text-[#f5c842] text-xs">{currentZone}</p>
        </div>
      </div>

      {/* Controls hint */}
      <div className="fixed bottom-4 left-4 z-20 pointer-events-none">
        <div className="bg-black/60 border border-gray-800 p-2">
          <p className="font-pixel text-gray-600 text-xs">WASD / ↑↓←→ MOVE</p>
          {showInteract && (
            <p className="font-pixel text-[#7c6af7] text-xs mt-1 blink">[ E ] INTERACT</p>
          )}
        </div>
      </div>
    </>
  )
}
