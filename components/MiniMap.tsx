'use client'
import { useEffect, useRef } from 'react'
import { useGameStore } from '@/store/gameStore'
import { ZONES, MAP_COLS, MAP_ROWS } from '@/game/map'

const W = 150, H = 120

export default function MiniMap() {
  const ref = useRef<HTMLCanvasElement>(null)
  const playerPos = useGameStore(s => s.playerPos)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#050508'
    ctx.fillRect(0, 0, W, H)

    const scaleX = W / (MAP_COLS * 32)
    const scaleY = H / (MAP_ROWS * 32)

    // Draw zones
    for (const zone of ZONES) {
      ctx.fillStyle = zone.color + 'cc'
      ctx.fillRect(zone.tileX * 32 * scaleX, zone.tileY * 32 * scaleY,
        zone.width * 32 * scaleX, zone.height * 32 * scaleY)
      ctx.strokeStyle = zone.labelColor + '80'
      ctx.lineWidth = 0.5
      ctx.strokeRect(zone.tileX * 32 * scaleX, zone.tileY * 32 * scaleY,
        zone.width * 32 * scaleX, zone.height * 32 * scaleY)
    }

    // Player dot
    const px = playerPos.x * scaleX
    const py = playerPos.y * scaleY
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(px - 2, py - 2, 4, 4)
    ctx.fillStyle = '#7c6af7'
    ctx.fillRect(px - 1, py - 1, 2, 2)
  }, [playerPos])

  return (
    <div className="fixed bottom-4 right-4 z-20 pointer-events-none">
      <div className="border border-[#7c6af7]/40 bg-black/80">
        <p className="font-pixel text-gray-600 text-xs p-1 border-b border-[#7c6af7]/20">MAP</p>
        <canvas ref={ref} width={W} height={H} style={{ imageRendering: 'pixelated' }} />
      </div>
    </div>
  )
}
