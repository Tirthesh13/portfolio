'use client'
import { useEffect, useState } from 'react'

export default function PortraitWarning() {
  const [isPortrait, setIsPortrait] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsPortrait(window.innerHeight > window.innerWidth && window.innerWidth < 768)
    }
    check()
    window.addEventListener('resize', check)
    window.addEventListener('orientationchange', check)
    return () => {
      window.removeEventListener('resize', check)
      window.removeEventListener('orientationchange', check)
    }
  }, [])

  if (!isPortrait) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center font-pixel"
      style={{ background: 'rgba(5,5,15,0.97)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="text-center p-8 border border-[#7c6af7]/50"
        style={{ boxShadow: '0 0 30px rgba(124,106,247,0.2)' }}
      >
        <div className="text-5xl mb-6" style={{ animation: 'spin 2s linear infinite' }}>↻</div>
        <p className="text-[#f5c842] text-xs mb-3">ROTATE DEVICE</p>
        <p className="text-gray-400 text-xs leading-6">
          For the best RPG<br />experience, play in<br />landscape mode.
        </p>
        <div className="mt-6 text-[#7c6af7]/50 text-xs">═══════════════</div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
