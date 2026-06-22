'use client'
import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function HUD() {
  const { currentZone, showInteract, phase } = useGameStore()
  const prevZoneRef = useRef<string>(currentZone)
  const [bannerZone, setBannerZone] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (currentZone !== prevZoneRef.current) {
      prevZoneRef.current = currentZone
      // Only show zone entry banner on desktop — mobile screen is too small
      if (!isMobile) {
        setBannerZone(currentZone)
        const timer = setTimeout(() => setBannerZone(null), 2500)
        return () => clearTimeout(timer)
      }
    }
  }, [currentZone, isMobile])

  return (
    <>
      {/* Top Left - Player stats */}
      <div className="fixed top-2 left-2 z-20 pointer-events-none">
        <div
          className="bg-black/75 border border-[#7c6af7]/40"
          style={{ padding: isMobile ? '0.4rem 0.5rem' : '0.75rem' }}
        >
          <p
            className="font-pixel text-[#f5c842]"
            style={{ fontSize: isMobile ? '0.45rem' : '0.6rem', marginBottom: isMobile ? '0.35rem' : '0.75rem' }}
          >
            TIRTHESH · LVL.26
          </p>
          <div style={{ marginBottom: isMobile ? '0.25rem' : '0.5rem' }}>
            <div className="flex justify-between" style={{ marginBottom: 2 }}>
              <span className="font-pixel text-red-400" style={{ fontSize: isMobile ? '0.38rem' : '0.5rem' }}>CODE</span>
              <span className="font-pixel text-red-400" style={{ fontSize: isMobile ? '0.38rem' : '0.5rem' }}>∞/∞</span>
            </div>
            <div style={{ height: isMobile ? 4 : 8, background: '#1a1a2e', border: '1px solid #3a1a1a' }}>
              <div style={{ height: '100%', background: '#ef4444', width: '100%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between" style={{ marginBottom: 2 }}>
              <span className="font-pixel text-blue-400" style={{ fontSize: isMobile ? '0.38rem' : '0.5rem' }}>CREATIVE</span>
              <span className="font-pixel text-blue-400" style={{ fontSize: isMobile ? '0.38rem' : '0.5rem' }}>∞/∞</span>
            </div>
            <div style={{ height: isMobile ? 4 : 8, background: '#1a1a2e', border: '1px solid #1a1a3a' }}>
              <div style={{ height: '100%', background: '#3b82f6', width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Top Right - Zone (desktop only; mobile zone shown as small text) */}
      <div className="fixed top-2 right-2 z-20 pointer-events-none">
        <div
          className="bg-black/75 border border-[#f5c842]/40"
          style={{ padding: isMobile ? '0.3rem 0.45rem' : '0.75rem' }}
        >
          <p className="font-pixel text-gray-500" style={{ fontSize: isMobile ? '0.35rem' : '0.45rem', marginBottom: 2 }}>
            ZONE
          </p>
          <p className="font-pixel text-[#f5c842]" style={{ fontSize: isMobile ? '0.38rem' : '0.5rem', maxWidth: isMobile ? 80 : 180 }}>
            {currentZone}
          </p>
        </div>
      </div>

      {/* Controls hint — desktop only, hidden during dialogue */}
      {!isMobile && phase !== 'dialogue' && (
        <div className="fixed bottom-4 left-4 z-20 pointer-events-none">
          <div className="bg-black/60 border border-gray-800 p-2">
            <p className="font-pixel text-gray-600 text-xs">WASD / ↑↓←→ MOVE</p>
            {showInteract && (
              <p className="font-pixel text-[#7c6af7] text-xs mt-1 blink">[ E ] INTERACT</p>
            )}
          </div>
        </div>
      )}

      {/* Mobile interact hint — shown above D-pad when NPC is nearby */}
      {isMobile && showInteract && phase !== 'dialogue' && (
        <div
          className="fixed z-20 pointer-events-none blink"
          style={{ bottom: 210, left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="bg-black/80 border border-[#7c6af7]/60 px-3 py-1">
            <p className="font-pixel text-[#7c6af7]" style={{ fontSize: '0.45rem' }}>TAP TALK →</p>
          </div>
        </div>
      )}

      {/* Zone entry banner — desktop only */}
      <AnimatePresence>
        {bannerZone && !isMobile && (
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
              background: 'rgba(0,0,0,0.85)',
              border: '1px solid rgba(245,200,66,0.5)',
              padding: '0.75rem 2rem',
              boxShadow: '0 0 20px rgba(245,200,66,0.2)',
            }}
          >
            <p style={{ color: '#f5c84260', fontSize: '0.5rem', marginBottom: '0.25rem' }}>═══════════════</p>
            <p style={{ color: '#f5c842', fontSize: '0.65rem' }}>ENTERING: {bannerZone}</p>
            <p style={{ color: '#f5c84260', fontSize: '0.5rem', marginTop: '0.25rem' }}>═══════════════</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
