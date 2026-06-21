'use client'
import { useGameStore } from '@/store/gameStore'
import { QUESTS } from '@/game/quests'

export default function QuestLog() {
  const quests = useGameStore((s) => s.quests)
  const completed = QUESTS.filter((q) => quests[q.id]).length
  const total = QUESTS.length

  return (
    <div
      className="font-pixel"
      style={{
        position: 'fixed',
        top: '160px',
        left: '1rem',
        zIndex: 20,
        background: 'rgba(0,0,0,0.75)',
        border: '1px solid rgba(124,106,247,0.35)',
        padding: '0.6rem 0.75rem',
        minWidth: '170px',
        pointerEvents: 'none',
      }}
    >
      <p style={{ color: '#7c6af7', fontSize: '0.55rem', marginBottom: '0.5rem' }}>
        QUESTS [{completed}/{total}]
      </p>
      {QUESTS.map((q) => {
        const done = !!quests[q.id]
        return (
          <div
            key={q.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '0.2rem',
              color: done ? '#4ade8088' : '#888',
              fontSize: '0.5rem',
            }}
          >
            <span>{done ? '▣' : '□'}</span>
            <span style={{ color: done ? '#4ade80aa' : '#999' }}>{q.title}</span>
            {done && <span style={{ color: '#4ade80', marginLeft: 'auto' }}>✓</span>}
          </div>
        )
      })}
    </div>
  )
}
