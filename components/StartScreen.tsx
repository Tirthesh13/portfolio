'use client'
import { useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'
import { motion } from 'framer-motion'

export default function StartScreen() {
  const setPhase = useGameStore((s) => s.setPhase)
  const setMode = useGameStore((s) => s.setMode)

  const startGame = () => {
    setMode('game')
    setPhase('playing')
  }

  const startPortfolio = () => {
    setMode('portfolio')
    setPhase('playing')
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') startGame()
      if (e.key === 's' || e.key === 'S') startPortfolio()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] flex flex-col items-center justify-center">
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
        <p className="font-pixel text-gray-600 text-xs mb-12">MUMBAI · MAHARASHTRA</p>

        {/* Mode selection buttons */}
        <div className="flex gap-6 justify-center mb-8">
          <motion.button
            onClick={startGame}
            className="font-pixel text-sm px-6 py-4 cursor-pointer"
            style={{
              background: 'rgba(124, 106, 247, 0.15)',
              border: '2px solid #7c6af7',
              color: '#a89ef8',
              boxShadow: '0 0 16px rgba(124, 106, 247, 0.5), inset 0 0 8px rgba(124,106,247,0.1)',
            }}
            whileHover={{
              boxShadow: '0 0 28px rgba(124, 106, 247, 0.8), inset 0 0 16px rgba(124,106,247,0.2)',
              color: '#d0c8ff',
            }}
            whileTap={{ scale: 0.96 }}
          >
            <div className="text-lg mb-1">▶ PLAY</div>
            <div className="text-[10px] text-[#7c6af7] opacity-80">Explore as RPG</div>
            <div className="text-[9px] text-gray-600 mt-2">[ENTER]</div>
          </motion.button>

          <motion.button
            onClick={startPortfolio}
            className="font-pixel text-sm px-6 py-4 cursor-pointer"
            style={{
              background: 'rgba(30,30,50,0.5)',
              border: '2px solid #4a4a6a',
              color: '#888899',
            }}
            whileHover={{
              borderColor: '#8888aa',
              color: '#ccccdd',
              background: 'rgba(60,60,90,0.4)',
            }}
            whileTap={{ scale: 0.96 }}
          >
            <div className="text-lg mb-1">≡ SKIP</div>
            <div className="text-[10px] text-gray-500 opacity-80">View Portfolio</div>
            <div className="text-[9px] text-gray-700 mt-2">[S]</div>
          </motion.button>
        </div>
      </motion.div>

      <div className="absolute bottom-6 right-6 font-pixel text-gray-700 text-xs">v2.0.0</div>
    </div>
  )
}
