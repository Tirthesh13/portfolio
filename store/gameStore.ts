import { create } from 'zustand'

export type GamePhase = 'loading' | 'start' | 'playing' | 'dialogue'

interface DialogueState {
  speaker: string
  lines: string[]
  lineIndex: number
}

interface GameState {
  phase: GamePhase
  currentZone: string
  dialogue: DialogueState | null
  showInteract: boolean
  playerPos: { x: number; y: number }
  setPhase: (phase: GamePhase) => void
  setZone: (zone: string) => void
  openDialogue: (speaker: string, lines: string[]) => void
  nextLine: () => void
  closeDialogue: () => void
  setInteract: (show: boolean) => void
  setPlayerPos: (pos: { x: number; y: number }) => void
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'loading',
  currentZone: 'The Starting Village',
  dialogue: null,
  showInteract: false,
  playerPos: { x: 0, y: 0 },

  setPhase: (phase) => set({ phase }),
  setZone: (zone) => set({ currentZone: zone }),
  setInteract: (show) => set({ showInteract: show }),
  setPlayerPos: (pos) => set({ playerPos: pos }),

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
