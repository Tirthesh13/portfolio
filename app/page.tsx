'use client'
import dynamic from 'next/dynamic'
import { useGameStore } from '@/store/gameStore'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import StartScreen from '@/components/StartScreen'
import HUD from '@/components/HUD'
import DialogBox from '@/components/DialogBox'
import MiniMap from '@/components/MiniMap'

const GameCanvas = dynamic(() => import('@/components/GameCanvas'), { ssr: false })
const MobileControls = dynamic(() => import('@/components/MobileControls'), { ssr: false })

export default function Page() {
  const phase = useGameStore(s => s.phase)

  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <AnimatePresence>
        {phase === 'loading' && <LoadingScreen key="loading" />}
        {phase === 'start' && <StartScreen key="start" />}
      </AnimatePresence>

      {(phase === 'playing' || phase === 'dialogue') && (
        <>
          <GameCanvas />
          <HUD />
          <DialogBox />
          <MiniMap />
          <MobileControls />
        </>
      )}
    </main>
  )
}
