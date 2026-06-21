'use client'
import dynamic from 'next/dynamic'
import { useGameStore } from '@/store/gameStore'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import StartScreen from '@/components/StartScreen'
import HUD from '@/components/HUD'
import DialogBox from '@/components/DialogBox'
import MiniMap from '@/components/MiniMap'
import QuestLog from '@/components/QuestLog'
import Inventory from '@/components/Inventory'
import CompletionScreen from '@/components/CompletionScreen'
import PortfolioView from '@/components/PortfolioView'
import FloatingModeToggle from '@/components/FloatingModeToggle'
import MuteButton from '@/components/MuteButton'

const GameCanvas = dynamic(() => import('@/components/GameCanvas'), { ssr: false })
const MobileControls = dynamic(() => import('@/components/MobileControls'), { ssr: false })

export default function Page() {
  const { phase, mode } = useGameStore()
  const isActive = phase === 'playing' || phase === 'dialogue'

  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <AnimatePresence>
        {phase === 'loading' && <LoadingScreen key="loading" />}
        {phase === 'start' && <StartScreen key="start" />}
      </AnimatePresence>

      {isActive && mode === 'portfolio' && (
        <>
          <PortfolioView />
          <FloatingModeToggle />
        </>
      )}

      {isActive && mode === 'game' && (
        <>
          <GameCanvas />
          <HUD />
          <DialogBox />
          <MiniMap />
          <QuestLog />
          <Inventory />
          <CompletionScreen />
          <MuteButton />
          <MobileControls />
          <FloatingModeToggle />
        </>
      )}
    </main>
  )
}
