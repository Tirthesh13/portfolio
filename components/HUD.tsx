'use client'
import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function HUD() {
  const { currentZone, showInteract, phase } = useGameStore()
  const prevZoneRef = useRef<string>(currentZone)
  const [bannerZone, setBannerZone] = useState<string | null>(null)

  useEffect(() => {
    if (currentZone !== prevZoneRef.current) {
      prevZoneRef.current = currentZone
      setBannerZone(currentZone)
      const timer = setTimeout(() => setBannerZone(null), 2500)
      return () => clearTimeout(timer)
    }
  }, [currentZone])

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

      {/* Controls hint — desktop only, hidden when dialogue is open */}
      {phase !== 'dialogue' && (
        <div className="fixed bottom-4 left-4 z-20 pointer-events-none hidden md:block">
          <div className="bg-black/60 border border-gray-800 p-2">
            <p className="font-pixel text-gray-600 text-xs">WASD / ↑↓←→ MOVE</p>
            {showInteract && (
              <p className="font-pixel text-[#7c6af7] text-xs mt-1 blink">[ E ] INTERACT</p>
            )}
          </div>
        </div>
      )}

      {/* Zone entry banner */}
      <AnimatePresence>
        {bannerZone && (
          <motion.div
            key={bannerZone}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="font-pixel"
            style={{
              position: 'fixed',
              top: '40%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 30,
              pointerEvents: 'none',
              textAlign: 'center',
              background: 'rgba(0,0,0,0.82)',
              border: '1px solid rgba(245,200,66,0.5)',
              padding: '0.75rem 2rem',
              boxShadow: '0 0 20px rgba(245,200,66,0.2)',
            }}
          >
            <p style={{ color: '#f5c84260', fontSize: '0.5rem', marginBottom: '0.25rem' }}>
              ═══════════════
            </p>
            <p style={{ color: '#f5c842', fontSize: '0.65rem' }}>
              ENTERING: {bannerZone}
            </p>
            <p style={{ color: '#f5c84260', fontSize: '0.5rem', marginTop: '0.25rem' }}>
              ═══════════════
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
