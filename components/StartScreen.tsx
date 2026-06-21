'use client'
import { useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'
import { motion } from 'framer-motion'

export default function StartScreen() {
  const setPhase = useGameStore(s => s.setPhase)

  const start = () => setPhase('playing')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') start() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      className="fixed inset-0 bg-[#0a0a0f] flex flex-col items-center justify-center cursor-pointer"
      onClick={start}
    >
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.1,
              animation: `blink ${Math.random() * 3 + 1}s step-end infinite`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="font-pixel text-[#f5c842] text-3xl md:text-5xl mb-4 tracking-widest"
          animate={{ textShadow: ['0 0 10px #f5c842', '0 0 30px #f5c842', '0 0 10px #f5c842'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          THE WORLD
        </motion.h1>
        <h2 className="font-pixel text-[#f5c842] text-2xl md:text-4xl mb-2">OF TIRTHESH</h2>
        <div className="w-48 h-0.5 bg-[#f5c842] mx-auto mb-8 opacity-40" />
        <p className="font-pixel text-gray-400 text-xs mb-2">SOFTWARE ENGINEER</p>
        <p className="font-pixel text-gray-600 text-xs mb-16">MUMBAI · MAHARASHTRA</p>
        <p className="font-pixel text-[#7c6af7] text-sm blink">▶ PRESS ENTER TO BEGIN ◀</p>
        <p className="font-pixel text-gray-700 text-xs mt-4">OR CLICK ANYWHERE</p>
      </motion.div>

      <div className="absolute bottom-6 right-6 font-pixel text-gray-700 text-xs">v1.0.0</div>
    </div>
  )
}
