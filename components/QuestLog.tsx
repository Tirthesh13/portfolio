'use client'
import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { QUESTS } from '@/game/quests'

export default function QuestLog() {
  const quests = useGameStore((s) => s.quests)
  const [collapsed, setCollapsed] = useState(false)
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
        background: 'rgba(0,0,0,0.80)',
        border: '1px solid rgba(124,106,247,0.35)',
        minWidth: collapsed ? 'unset' : '170px',
        pointerEvents: 'auto',
      }}
    >
      {/* Header — always shown, tap to collapse on mobile */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span style={{ color: '#7c6af7', fontSize: '0.55rem' }}>
          QUESTS [{completed}/{total}]
        </span>
        <span style={{ color: '#7c6af7', fontSize: '0.5rem', marginLeft: 'auto' }}>
          {collapsed ? '▶' : '▼'}
        </span>
      </button>

      {!collapsed && (
        <div style={{ padding: '0 0.75rem 0.6rem' }}>
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
      )}
    </div>
  )
}
