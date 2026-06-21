import { create } from 'zustand'
import { QUESTS } from '@/game/quests'

export type GamePhase = 'loading' | 'start' | 'playing' | 'dialogue'

interface DialogueState {
  speaker: string
  lines: string[]
  lineIndex: number
}

interface GameState {
  phase: GamePhase
  mode: 'game' | 'portfolio'
  currentZone: string
  dialogue: DialogueState | null
  showInteract: boolean
  playerPos: { x: number; y: number }
  quests: Record<string, boolean>
  inventory: string[]

  setPhase: (phase: GamePhase) => void
  setMode: (mode: 'game' | 'portfolio') => void
  setZone: (zone: string) => void
  openDialogue: (speaker: string, lines: string[]) => void
  nextLine: () => void
  closeDialogue: () => void
  setInteract: (show: boolean) => void
  setPlayerPos: (pos: { x: number; y: number }) => void
  completeQuest: (id: string) => void
  addItem: (id: string) => void
  allQuestsComplete: () => boolean
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'loading',
  mode: 'game',
  currentZone: 'The Starting Village',
  dialogue: null,
  showInteract: false,
  playerPos: { x: 0, y: 0 },
  quests: {},
  inventory: [],

  setPhase: (phase) => set({ phase }),
  setMode: (mode) => set({ mode }),
  setZone: (zone) => set({ currentZone: zone }),
  setInteract: (show) => set({ showInteract: show }),
  setPlayerPos: (pos) => set({ playerPos: pos }),

  completeQuest: (id) =>
    set((state) => ({ quests: { ...state.quests, [id]: true } })),

  addItem: (id) =>
    set((state) =>
      state.inventory.includes(id)
        ? {}
        : { inventory: [...state.inventory, id] }
    ),

  allQuestsComplete: () => QUESTS.every((q) => get().quests[q.id]),

  openDialogue: (speaker, lines) => {
    set({ phase: 'dialogue', dialogue: { speaker, lines, lineIndex: 0 } })
  },

  nextLine: () => {
    const { dialogue } = get()
    if (!dialogue) return
    const next = dialogue.lineIndex + 1
    if (next >= dialogue.lines.length) {
      set({ phase: 'playing', dialogue: null })
    } else {
      set({ dialogue: { ...dialogue, lineIndex: next } })
    }
  },

  closeDialogue: () => set({ phase: 'playing', dialogue: null }),
}))
