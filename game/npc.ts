export interface NPC {
  id: string
  x: number
  y: number
  name: string
  bodyColor: string
  hairColor: string
  dialogue: string[]
  isActive?: boolean
  label?: string
}

import { EXPERIENCE, PROJECTS, EDUCATION, CERTS, ABOUT_DIALOGUE } from '@/data/portfolio'
import { TILE_SIZE } from './map'

export const ALL_NPCS: NPC[] = [
  // Town Hall keeper
  {
    id: 'keeper',
    x: 29 * TILE_SIZE,
    y: 23 * TILE_SIZE,
    name: 'REALM KEEPER',
    bodyColor: '#7c3aed',
    hairColor: '#f5c842',
    dialogue: ABOUT_DIALOGUE,
  },
  // Academy - Education NPCs
  {
    id: 'scholar1',
    x: 9 * TILE_SIZE,
    y: 9 * TILE_SIZE,
    name: 'SCHOLAR',
    bodyColor: '#1d4ed8',
    hairColor: '#e2e8f0',
    dialogue: EDUCATION[0].dialogue,
  },
  {
    id: 'scholar2',
    x: 13 * TILE_SIZE,
    y: 11 * TILE_SIZE,
    name: 'SCHOLAR',
    bodyColor: '#1e40af',
    hairColor: '#94a3b8',
    dialogue: [
      ...EDUCATION[1].dialogue,
      `CERT: ${CERTS[0].name}`,
      `Issuer: ${CERTS[0].issuer}`,
      `Date: ${CERTS[0].date}`,
    ],
  },
  // Guild - Experience NPCs
  {
    id: 'guild1',
    x: 45 * TILE_SIZE,
    y: 9 * TILE_SIZE,
    name: 'GUILD MASTER',
    bodyColor: '#7c6af7',
    hairColor: '#f5c842',
    dialogue: EXPERIENCE[0].dialogue,
    isActive: true,
    label: '! ACTIVE',
  },
  {
    id: 'guild2',
    x: 49 * TILE_SIZE,
    y: 11 * TILE_SIZE,
    name: 'QUEST GIVER',
    bodyColor: '#ca8a04',
    hairColor: '#78350f',
    dialogue: EXPERIENCE[1].dialogue,
  },
  // Forge - Project NPCs
  {
    id: 'forge1',
    x: 9 * TILE_SIZE,
    y: 39 * TILE_SIZE,
    name: 'BLACKSMITH',
    bodyColor: '#9a3412',
    hairColor: '#1c1917',
    dialogue: PROJECTS[0].dialogue,
  },
  {
    id: 'forge2',
    x: 13 * TILE_SIZE,
    y: 41 * TILE_SIZE,
    name: 'ARTIFICER',
    bodyColor: '#7c3aed',
    hairColor: '#312e81',
    dialogue: PROJECTS[1].dialogue,
  },
  {
    id: 'forge3',
    x: 11 * TILE_SIZE,
    y: 37 * TILE_SIZE,
    name: 'ENCHANTER',
    bodyColor: '#6d28d9',
    hairColor: '#4c1d95',
    dialogue: PROJECTS[2].dialogue,
  },
  // Arsenal - Skills NPC
  {
    id: 'arsenal',
    x: 45 * TILE_SIZE,
    y: 39 * TILE_SIZE,
    name: 'ARMORER',
    bodyColor: '#1e3a5f',
    hairColor: '#64748b',
    dialogue: [
      'THE ARSENAL OF SKILLS',
      '--- WEB TECHNOLOGIES ---',
      'HTML5, CSS3, JavaScript,',
      'React.js, Node.js',
      '--- LANGUAGES ---',
      'JavaScript, Python, Java,',
      'C#, Kotlin (Basic)',
      '--- DATABASES ---',
      'SQL, PostgreSQL, MongoDB',
      '--- GAME DEV ---',
      'Unity, C#, Game Design',
    ],
  },
  // Inn - Contact NPC
  {
    id: 'innkeeper',
    x: 27 * TILE_SIZE,
    y: 43 * TILE_SIZE,
    name: 'INNKEEPER',
    bodyColor: '#92400e',
    hairColor: '#451a03',
    dialogue: [
      "Welcome to the Messenger's Inn!",
      'Want to contact Tirthesh?',
      'Send a message:',
      'dhaigudetirthesh@gmail.com',
      'Or find him on:',
      'LinkedIn: tirthesh-dhaigude',
      'GitHub: Tirthesh13',
      'Location: Mumbai, Maharashtra',
    ],
  },
]

export function drawNPC(ctx: CanvasRenderingContext2D, npc: NPC, screenX: number, screenY: number, frameCount: number) {
  const x = Math.floor(screenX)
  const y = Math.floor(screenY)

  // Active quest glow
  if (npc.isActive) {
    ctx.shadowColor = '#f5c842'
    ctx.shadowBlur = 15
  }

  // Body
  ctx.shadowBlur = 0
  ctx.fillStyle = '#1a1a3e'
  ctx.fillRect(x + 8, y + 22, 6, 10)
  ctx.fillRect(x + 16, y + 22, 6, 10)
  ctx.fillStyle = npc.bodyColor
  ctx.fillRect(x + 7, y + 12, 16, 12)
  ctx.fillRect(x + 1, y + 13, 6, 8)
  ctx.fillRect(x + 23, y + 13, 6, 8)
  ctx.fillStyle = '#f4c2a1'
  ctx.fillRect(x + 8, y + 2, 14, 12)
  ctx.fillStyle = npc.hairColor
  ctx.fillRect(x + 7, y, 16, 5)
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(x + 10, y + 7, 2, 2)
  ctx.fillRect(x + 18, y + 7, 2, 2)
  ctx.fillStyle = '#3d2010'
  ctx.fillRect(x + 6, y + 29, 8, 4)
  ctx.fillRect(x + 16, y + 29, 8, 4)

  // Floating "!" indicator for active NPCs
  if (npc.isActive) {
    const bounce = Math.sin(frameCount * 0.1) * 3
    ctx.fillStyle = '#f5c842'
    ctx.font = '12px "Press Start 2P", monospace'
    ctx.textAlign = 'center'
    ctx.fillText('!', x + 15, y - 8 + bounce)
    ctx.textAlign = 'left'
  }
}

export function isNearPlayer(npc: NPC, playerX: number, playerY: number, threshold = 48): boolean {
  const dx = npc.x - playerX
  const dy = npc.y - playerY
  return Math.sqrt(dx * dx + dy * dy) < threshold
}
