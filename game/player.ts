import { TILE_SIZE, isTileWalkable } from './map'

export type Direction = 'up' | 'down' | 'left' | 'right'

export class Player {
  x: number
  y: number
  speed: number = 2
  direction: Direction = 'down'
  moving: boolean = false
  walkFrame: number = 0
  walkTimer: number = 0

  constructor(startX: number, startY: number) {
    this.x = startX
    this.y = startY
  }

  update(keys: Set<string>, _frameCount: number) {
    let dx = 0, dy = 0

    if (keys.has('ArrowUp') || keys.has('w') || keys.has('W')) { dy = -this.speed; this.direction = 'up' }
    if (keys.has('ArrowDown') || keys.has('s') || keys.has('S')) { dy = this.speed; this.direction = 'down' }
    if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) { dx = -this.speed; this.direction = 'left' }
    if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) { dx = this.speed; this.direction = 'right' }

    this.moving = dx !== 0 || dy !== 0

    if (this.moving) {
      this.walkTimer++
      if (this.walkTimer > 8) { this.walkFrame = (this.walkFrame + 1) % 2; this.walkTimer = 0 }
    } else {
      this.walkFrame = 0
    }

    // Try move X
    const nx = this.x + dx
    const tileX = Math.floor((nx + 8) / TILE_SIZE)
    const tileY = Math.floor((this.y + 12) / TILE_SIZE)
    const tileX2 = Math.floor((nx + 22) / TILE_SIZE)
    if (isTileWalkable(tileX, tileY) && isTileWalkable(tileX2, tileY) &&
        isTileWalkable(tileX, Math.floor((this.y + 28) / TILE_SIZE)) &&
        isTileWalkable(tileX2, Math.floor((this.y + 28) / TILE_SIZE))) {
      this.x = nx
    }

    // Try move Y
    const ny = this.y + dy
    const tX = Math.floor((this.x + 8) / TILE_SIZE)
    const tY = Math.floor((ny + 12) / TILE_SIZE)
    const tX2 = Math.floor((this.x + 22) / TILE_SIZE)
    if (isTileWalkable(tX, tY) && isTileWalkable(tX2, tY) &&
        isTileWalkable(tX, Math.floor((ny + 28) / TILE_SIZE)) &&
        isTileWalkable(tX2, Math.floor((ny + 28) / TILE_SIZE))) {
      this.y = ny
    }
  }

  draw(ctx: CanvasRenderingContext2D, screenX: number, screenY: number) {
    const x = Math.floor(screenX)
    const y = Math.floor(screenY)
    const wf = this.walkFrame

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    ctx.beginPath()
    ctx.ellipse(x + 15, y + 30, 10, 4, 0, 0, Math.PI * 2)
    ctx.fill()

    // Legs
    ctx.fillStyle = '#1a1a3e'
    if (this.direction !== 'up') {
      ctx.fillRect(x + 8 + (wf === 0 ? -2 : 2), y + 22, 6, 10)
      ctx.fillRect(x + 16 + (wf === 0 ? 2 : -2), y + 22, 6, 10)
    } else {
      ctx.fillRect(x + 8 + (wf === 0 ? 2 : -2), y + 22, 6, 10)
      ctx.fillRect(x + 16 + (wf === 0 ? -2 : 2), y + 22, 6, 10)
    }

    // Body (blue tunic)
    ctx.fillStyle = '#3b5fc0'
    ctx.fillRect(x + 7, y + 12, 16, 12)

    // Arms
    ctx.fillStyle = '#3b5fc0'
    if (this.direction === 'left') {
      ctx.fillRect(x + 1, y + 13 + (wf * 2), 6, 8)
      ctx.fillRect(x + 23, y + 13, 6, 8)
    } else if (this.direction === 'right') {
      ctx.fillRect(x + 1, y + 13, 6, 8)
      ctx.fillRect(x + 23, y + 13 + (wf * 2), 6, 8)
    } else {
      ctx.fillRect(x + 1, y + 13 + (wf * 2), 6, 8)
      ctx.fillRect(x + 23, y + 13 + ((1 - wf) * 2), 6, 8)
    }

    // Head
    ctx.fillStyle = '#f4c2a1'
    ctx.fillRect(x + 8, y + 2, 14, 12)

    // Hair
    ctx.fillStyle = '#2d1b00'
    ctx.fillRect(x + 7, y, 16, 5)
    ctx.fillRect(x + 6, y + 2, 3, 8)
    ctx.fillRect(x + 21, y + 2, 3, 8)

    // Eyes (direction dependent)
    ctx.fillStyle = '#1a1a1a'
    if (this.direction !== 'up') {
      ctx.fillRect(x + 10, y + 7, 2, 2)
      ctx.fillRect(x + 18, y + 7, 2, 2)
    }

    // Shoes
    ctx.fillStyle = '#3d2010'
    ctx.fillRect(x + 6 + (wf === 0 ? -2 : 2), y + 29, 8, 4)
    ctx.fillRect(x + 16 + (wf === 0 ? 2 : -2), y + 29, 8, 4)
  }

  getTilePos() {
    return {
      tileX: Math.floor((this.x + 15) / TILE_SIZE),
      tileY: Math.floor((this.y + 20) / TILE_SIZE),
    }
  }
}
