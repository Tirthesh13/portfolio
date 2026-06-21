export const TILE_SIZE = 32

export enum Tile {
  GRASS = 0,
  DIRT = 1,
  WATER = 2,
  STONE = 3,
  WALL = 4,
  FLOOR = 5,
  TREE = 6,
  PATH = 7,
}

export const TILE_COLORS: Record<Tile, string[]> = {
  [Tile.GRASS]: ['#1a3a1a', '#1e4020', '#163516'],
  [Tile.DIRT]: ['#4a3520', '#3d2d18', '#523d24'],
  [Tile.WATER]: ['#0a2a4a', '#0d3259', '#0a2540'],
  [Tile.STONE]: ['#2a2a3a', '#252535', '#2f2f40'],
  [Tile.WALL]: ['#1a1a2e', '#161628', '#1e1e34'],
  [Tile.FLOOR]: ['#2a1f0f', '#241a0c', '#301f0f'],
  [Tile.TREE]: ['#0d2e0d', '#0a260a', '#103210'],
  [Tile.PATH]: ['#3d3020', '#352a1a', '#453520'],
}

export const MAP_COLS = 60
export const MAP_ROWS = 50

// Zone definitions with bounds
export interface Zone {
  name: string
  tileX: number
  tileY: number
  width: number
  height: number
  color: string
  labelColor: string
}

export const ZONES: Zone[] = [
  { name: "The Starting Village", tileX: 25, tileY: 20, width: 8, height: 8, color: '#2d4a1e', labelColor: '#7dd56f' },
  { name: "Academy of Knowledge", tileX: 6, tileY: 6, width: 10, height: 8, color: '#1a2a4a', labelColor: '#60a5fa' },
  { name: "Guild of Quests", tileX: 42, tileY: 6, width: 10, height: 8, color: '#3a2a0a', labelColor: '#f5c842' },
  { name: "Forge of Artifacts", tileX: 6, tileY: 36, width: 10, height: 8, color: '#3a1a0a', labelColor: '#f97316' },
  { name: "Arsenal of Skills", tileX: 42, tileY: 36, width: 10, height: 8, color: '#1a1a3a', labelColor: '#a78bfa' },
  { name: "Messenger's Inn", tileX: 24, tileY: 40, width: 10, height: 6, color: '#2a1a0a', labelColor: '#f59e0b' },
]

function generateMap(): Tile[][] {
  const map: Tile[][] = []
  for (let y = 0; y < MAP_ROWS; y++) {
    map[y] = []
    for (let x = 0; x < MAP_COLS; x++) {
      // Default grass
      let tile = Tile.GRASS
      // Water border
      if (x < 2 || x >= MAP_COLS - 2 || y < 2 || y >= MAP_ROWS - 2) {
        tile = Tile.WATER
      }
      map[y][x] = tile
    }
  }

  // Draw zones as buildings
  for (const zone of ZONES) {
    for (let dy = 0; dy < zone.height; dy++) {
      for (let dx = 0; dx < zone.width; dx++) {
        const tx = zone.tileX + dx
        const ty = zone.tileY + dy
        if (ty >= 0 && ty < MAP_ROWS && tx >= 0 && tx < MAP_COLS) {
          if (dy === 0 || dy === zone.height - 1 || dx === 0 || dx === zone.width - 1) {
            map[ty][tx] = Tile.WALL
          } else {
            map[ty][tx] = Tile.FLOOR
          }
        }
      }
    }
  }

  // Draw dirt paths connecting all zones to center
  const centerX = 29
  const centerY = 24
  const endpoints = ZONES.map(z => ({ x: z.tileX + Math.floor(z.width / 2), y: z.tileY + Math.floor(z.height / 2) }))
  for (const ep of endpoints) {
    // Horizontal then vertical path
    const minX = Math.min(ep.x, centerX)
    const maxX = Math.max(ep.x, centerX)
    for (let x = minX; x <= maxX; x++) {
      if (map[ep.y]?.[x] === Tile.GRASS) map[ep.y][x] = Tile.PATH
    }
    const minY = Math.min(ep.y, centerY)
    const maxY = Math.max(ep.y, centerY)
    for (let y = minY; y <= maxY; y++) {
      if (map[y]?.[centerX] === Tile.GRASS) map[y][centerX] = Tile.PATH
    }
  }

  // Add trees scattered on grass
  const rng = (seed: number) => ((seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff
  for (let y = 3; y < MAP_ROWS - 3; y++) {
    for (let x = 3; x < MAP_COLS - 3; x++) {
      if (map[y][x] === Tile.GRASS && rng(x * 100 + y) > 0.88) {
        map[y][x] = Tile.TREE
      }
    }
  }

  return map
}

export const MAP_DATA = generateMap()

export function getTileAt(tileX: number, tileY: number): Tile {
  if (tileY < 0 || tileY >= MAP_ROWS || tileX < 0 || tileX >= MAP_COLS) return Tile.WATER
  return MAP_DATA[tileY][tileX]
}

export function isTileWalkable(tileX: number, tileY: number): boolean {
  const tile = getTileAt(tileX, tileY)
  return tile !== Tile.WATER && tile !== Tile.WALL && tile !== Tile.TREE
}

export function getZoneAtTile(tileX: number, tileY: number): Zone | null {
  for (const zone of ZONES) {
    if (tileX >= zone.tileX && tileX < zone.tileX + zone.width &&
        tileY >= zone.tileY && tileY < zone.tileY + zone.height) {
      return zone
    }
  }
  return null
}

export function renderMap(ctx: CanvasRenderingContext2D, camX: number, camY: number, frameCount: number, canvasW: number, canvasH: number) {
  const startCol = Math.max(0, Math.floor(camX / TILE_SIZE) - 1)
  const endCol = Math.min(MAP_COLS, Math.ceil((camX + canvasW) / TILE_SIZE) + 1)
  const startRow = Math.max(0, Math.floor(camY / TILE_SIZE) - 1)
  const endRow = Math.min(MAP_ROWS, Math.ceil((camY + canvasH) / TILE_SIZE) + 1)

  for (let y = startRow; y < endRow; y++) {
    for (let x = startCol; x < endCol; x++) {
      const tile = MAP_DATA[y][x]
      const colors = TILE_COLORS[tile]
      const colorIdx = ((x * 3 + y * 7) & 0xff) % colors.length

      let color = colors[colorIdx]

      // Animate water
      if (tile === Tile.WATER) {
        const wave = Math.sin(frameCount * 0.05 + x * 0.3 + y * 0.3) * 0.5 + 0.5
        const v = Math.floor(10 + wave * 20)
        color = `rgb(10, ${30 + v}, ${60 + v})`
      }

      const sx = x * TILE_SIZE - camX
      const sy = y * TILE_SIZE - camY
      ctx.fillStyle = color
      ctx.fillRect(sx, sy, TILE_SIZE, TILE_SIZE)

      // Tree trunk and foliage
      if (tile === Tile.TREE) {
        ctx.fillStyle = '#3d2010'
        ctx.fillRect(sx + 12, sy + 20, 8, 12)
        ctx.fillStyle = '#0d4a0d'
        ctx.fillRect(sx + 4, sy + 4, 24, 20)
        ctx.fillStyle = '#0a3a0a'
        ctx.fillRect(sx + 8, sy, 16, 8)
      }
    }
  }

  // Draw zone buildings overlay
  for (const zone of ZONES) {
    const sx = zone.tileX * TILE_SIZE - camX
    const sy = zone.tileY * TILE_SIZE - camY
    const sw = zone.width * TILE_SIZE
    const sh = zone.height * TILE_SIZE

    // Building glow
    ctx.shadowColor = zone.labelColor
    ctx.shadowBlur = 12
    ctx.fillStyle = zone.color + '40'
    ctx.fillRect(sx, sy, sw, sh)
    ctx.shadowBlur = 0

    // Wall border
    ctx.strokeStyle = zone.labelColor + '80'
    ctx.lineWidth = 2
    ctx.strokeRect(sx + 1, sy + 1, sw - 2, sh - 2)

    // Zone name label above building
    ctx.fillStyle = zone.labelColor
    ctx.font = '8px "Press Start 2P", monospace'
    ctx.textAlign = 'center'
    const label = zone.name
    const textX = sx + sw / 2
    const textY = sy - 10

    // Background for text
    const textW = ctx.measureText(label).width
    ctx.fillStyle = 'rgba(0,0,0,0.7)'
    ctx.fillRect(textX - textW / 2 - 4, textY - 10, textW + 8, 14)
    ctx.fillStyle = zone.labelColor
    ctx.fillText(label, textX, textY)

    // Door
    ctx.fillStyle = '#3d2010'
    const doorX = sx + Math.floor(zone.width / 2) * TILE_SIZE - 6
    const doorY = sy + sh - TILE_SIZE
    ctx.fillRect(doorX, doorY + 8, 12, 24)

    // Windows
    ctx.fillStyle = '#f5c84280'
    if (zone.width > 4) {
      ctx.fillRect(sx + TILE_SIZE, sy + TILE_SIZE, 14, 10)
      ctx.fillRect(sx + sw - TILE_SIZE * 2, sy + TILE_SIZE, 14, 10)
    }
  }

  ctx.textAlign = 'left'
}
