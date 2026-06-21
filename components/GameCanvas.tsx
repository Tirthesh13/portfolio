'use client'
import { useEffect, useRef } from 'react'
import { useGameStore } from '@/store/gameStore'
import { GameEngine } from '@/game/engine'

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setPhase, openDialogue, setZone, setInteract, setPlayerPos, completeQuest, addItem } =
    useGameStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const engine = new GameEngine(canvas, {
      setPhase: (p) => setPhase(p),
      openDialogue,
      setZone,
      setInteract,
      setPlayerPos,
    })
    engine.init()
    engine.start()
    window.gameEngine = engine

    const onQuestComplete = (e: Event) => {
      const { questId, itemId } = (e as CustomEvent<{ questId: string; itemId: string }>).detail
      const store = useGameStore.getState()
      if (!store.quests[questId]) {
        completeQuest(questId)
        addItem(itemId)
        window.dispatchEvent(new CustomEvent('game:item-collected'))
      }
    }

    window.addEventListener('game:quest-complete', onQuestComplete)

    return () => {
      engine.destroy()
      delete window.gameEngine
      window.removeEventListener('game:quest-complete', onQuestComplete)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
