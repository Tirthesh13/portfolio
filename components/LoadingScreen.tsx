'use client'
import { useEffect, useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const setPhase = useGameStore(s => s.setPhase)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(() => setPhase('start'), 400); return 100 }
        return p + 2
      })
    }, 40)
    return () => clearInterval(interval)
  }, [setPhase])

  return (
    <motion.div
      className="fixed inset-0 bg-[#0a0a0f] flex flex-col items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center">
        <h1 className="font-pixel text-[#7c6af7] text-xl mb-2 glitch">TIRTHESH</h1>
        <p className="font-pixel text-gray-500 text-xs mb-12">SOFTWARE ENGINEER</p>
        <div className="w-64 h-4 border-2 border-[#7c6af7] mx-auto mb-4 relative">
          <motion.div
            className="h-full bg-[#7c6af7]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>
        <p className="font-pixel text-gray-600 text-xs blink">LOADING...</p>
        <p className="font-pixel text-gray-700 text-xs mt-4">{progress}%</p>
      </div>
    </motion.div>
  )
}
