import { renderMap, TILE_SIZE, ZONES, getZoneAtTile } from './map'
import { Player } from './player'
import { ALL_NPCS, drawNPC, type NPC } from './npc'
import { ParticleSystem } from './particles'
import { QUEST_BY_NPC } from './quests'
import { audioEngine } from './audio'

type StoreActions = {
  setPhase: (p: 'playing' | 'dialogue') => void
  openDialogue: (speaker: string, lines: string[]) => void
  setZone: (zone: string) => void
  setInteract: (show: boolean) => void
  setPlayerPos: (pos: { x: number; y: number }) => void
}

export class GameEngine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private player: Player
  private particles: ParticleSystem
  private keys: Set<string> = new Set()
  private frameCount: number = 0
  private rafId: number = 0
  private store: StoreActions
  private isDialogueOpen: boolean = false
  private camX: number = 0
  private camY: number = 0
  private nearestNPC: NPC | null = null
  private audioInited: boolean = false
  private footstepFrame: number = 0
  private pendingQuestNpcId: string | null = null

  constructor(canvas: HTMLCanvasElement, store: StoreActions) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.store = store
    this.player = new Player(28 * TILE_SIZE, 29 * TILE_SIZE)
    this.particles = new ParticleSystem()
    this.ctx.imageSmoothingEnabled = false
  }

  init() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    window.addEventListener('game:dialogue-open', this.onDialogueOpen as EventListener)
    window.addEventListener('game:dialogue-close', this.onDialogueClose as EventListener)
    this.resize()
    window.addEventListener('resize', this.resize)
  }

  private initAudioOnce() {
    if (this.audioInited) return
    this.audioInited = true
    audioEngine.init()
    audioEngine.resume()
    audioEngine.playOverworld()
  }

  // Extracted so both keyboard and mobile touch can trigger it
  private handleInteract() {
    if (!this.isDialogueOpen && this.nearestNPC) {
      this.store.openDialogue(this.nearestNPC.name, this.nearestNPC.dialogue)
      audioEngine.sfxDialogueOpen()
      const quest = QUEST_BY_NPC[this.nearestNPC.id]
      if (quest) {
        // Store the quest — dispatch AFTER dialogue is fully read, not immediately
        this.pendingQuestNpcId = this.nearestNPC.id
      }
    } else if (this.isDialogueOpen) {
      audioEngine.sfxDialogueBlip()
      // Also dispatch advance-dialogue so DialogBox advances on mobile
      window.dispatchEvent(new Event('game:advance-dialogue'))
    }
  }

  private onKeyDown = (e: KeyboardEvent) => {
    this.initAudioOnce()
    audioEngine.resume()
    this.keys.add(e.key)
    if (e.key === 'e' || e.key === 'E') {
      this.handleInteract()
    }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      e.preventDefault()
    }
  }

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.key)
  }

  private onDialogueOpen = () => {
    this.isDialogueOpen = true
  }

  private onDialogueClose = () => {
    this.isDialogueOpen = false
    // Quest completes only after the player has read all dialogue
    if (this.pendingQuestNpcId) {
      const quest = QUEST_BY_NPC[this.pendingQuestNpcId]
      if (quest) {
        window.dispatchEvent(
          new CustomEvent('game:quest-complete', {
            detail: { questId: quest.id, itemId: quest.reward },
          })
        )
      }
      this.pendingQuestNpcId = null
    }
  }

  private resize = () => {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx.imageSmoothingEnabled = false
  }

  start() {
    this.rafId = requestAnimationFrame(this.gameLoop)
  }

  private gameLoop = (_timestamp: number) => {
    this.update()
    this.render()
    this.frameCount++
    this.rafId = requestAnimationFrame(this.gameLoop)
  }

  private update() {
    if (!this.isDialogueOpen) {
      this.player.update(this.keys, this.frameCount)
    }

    if (this.player.moving) {
      this.footstepFrame++
      if (this.footstepFrame % 12 === 0) {
        audioEngine.sfxFootstep()
      }
    } else {
      this.footstepFrame = 0
    }

    this.particles.update()

    const targetCamX = this.player.x - this.canvas.width / 2 + 15
    const targetCamY = this.player.y - this.canvas.height / 2 + 16
    this.camX += (targetCamX - this.camX) * 0.12
    this.camY += (targetCamY - this.camY) * 0.12
    this.camX = Math.max(0, Math.min(this.camX, 60 * TILE_SIZE - this.canvas.width))
    this.camY = Math.max(0, Math.min(this.camY, 50 * TILE_SIZE - this.canvas.height))

    if (this.frameCount % 6 === 0) {
      const colors = ['#f5c842', '#7c6af7', '#60a5fa', '#f97316', '#a78bfa']
      ZONES.forEach((zone, i) => {
        const zx = (zone.tileX + zone.width / 2) * TILE_SIZE
        const zy = zone.tileY * TILE_SIZE
        this.particles.emit(zx + Math.random() * zone.width * TILE_SIZE, zy, colors[i % colors.length], 1)
      })
    }

    let closest: NPC | null = null
    let closestDist = 52
    for (const npc of ALL_NPCS) {
      const dx = npc.x - this.player.x
      const dy = npc.y - this.player.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < closestDist) {
        closestDist = dist
        closest = npc
      }
    }
    this.nearestNPC = closest
    this.store.setInteract(closest !== null)

    const { tileX, tileY } = this.player.getTilePos()
    const zone = getZoneAtTile(tileX, tileY)
    this.store.setZone(zone?.name ?? 'The Overworld')
    this.store.setPlayerPos({ x: this.player.x, y: this.player.y })
  }

  private render() {
    const { ctx, canvas, camX, camY } = this
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    renderMap(ctx, camX, camY, this.frameCount, canvas.width, canvas.height)
    this.particles.render(ctx, camX, camY)

    for (const zone of ZONES) {
      const torchX = zone.tileX * TILE_SIZE + Math.floor(zone.width / 2) * TILE_SIZE - camX
      const torchY = (zone.tileY + zone.height) * TILE_SIZE - camY - 8
      const flicker = Math.sin(this.frameCount * 0.2 + zone.tileX) * 0.3 + 0.7
      ctx.fillStyle = `rgba(255, ${Math.floor(140 * flicker)}, 0, ${flicker})`
      ctx.fillRect(torchX - 2, torchY, 4, 8)
      ctx.shadowColor = '#ff8800'
      ctx.shadowBlur = 8 * flicker
      ctx.fillStyle = '#ffcc00'
      ctx.fillRect(torchX - 1, torchY - 2, 2, 4)
      ctx.shadowBlur = 0
    }

    for (const npc of ALL_NPCS) {
      const sx = npc.x - camX
      const sy = npc.y - camY
      if (sx > -50 && sx < canvas.width + 50 && sy > -50 && sy < canvas.height + 50) {
        drawNPC(ctx, npc, sx, sy, this.frameCount)
        if (npc === this.nearestNPC) {
          const bounce = Math.sin(this.frameCount * 0.15) * 4
          ctx.fillStyle = '#7c6af7'
          ctx.font = '10px "Press Start 2P", monospace'
          ctx.textAlign = 'center'
          ctx.fillText('[E]', sx + 15, sy - 12 + bounce)
          ctx.textAlign = 'left'
        }
      }
    }

    this.player.draw(ctx, this.player.x - camX, this.player.y - camY)
  }

  // Called from MobileControls touch buttons
  simulateKey(key: string, type: 'down' | 'up') {
    if (type === 'down') {
      this.keys.add(key)
      // Init audio on first mobile touch (browser autoplay policy)
      this.initAudioOnce()
      audioEngine.resume()
      if (key === 'e' || key === 'E') {
        this.handleInteract()
      }
    } else {
      this.keys.delete(key)
    }
  }

  destroy() {
    cancelAnimationFrame(this.rafId)
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('game:dialogue-open', this.onDialogueOpen as EventListener)
    window.removeEventListener('game:dialogue-close', this.onDialogueClose as EventListener)
    audioEngine.stopBg()
  }
}
