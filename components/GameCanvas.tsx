'use client'
import { useEffect, useRef } from 'react'
import { useGameStore } from '@/store/gameStore'
import { GameEngine } from '@/game/engine'

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setPhase, openDialogue, setZone, setInteract, setPlayerPos } = useGameStore()

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
    return () => {
      engine.destroy()
      delete window.gameEngine
    }
  }, [])

  return <canvas ref={canvasRef} className="block w-full h-full" style={{ imageRendering: 'pixelated' }} />
}
