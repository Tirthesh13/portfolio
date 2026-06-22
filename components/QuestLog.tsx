'use client'
import { useEffect, useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { QUESTS } from '@/game/quests'

export default function QuestLog() {
  const quests = useGameStore((s) => s.quests)
  const completed = QUESTS.filter((q) => quests[q.id]).length
  const total = QUESTS.length
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setCollapsed(true)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      className="font-pixel"
      style={{
        position: 'fixed',
        // Desktop: left side below HUD. Mobile: top-right below zone indicator
        ...(isMobile
          ? { top: '70px', right: '0.5rem', left: 'auto' }
          : { top: '160px', left: '1rem' }),
        zIndex: 20,
        background: 'rgba(0,0,0,0.82)',
        border: '1px solid rgba(124,106,247,0.35)',
        minWidth: collapsed ? 'unset' : (isMobile ? '140px' : '170px'),
        maxWidth: isMobile ? '150px' : '200px',
        pointerEvents: 'auto',
      }}
    >
      <button
        onClick={() => setCollapsed((c) => !c)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: isMobile ? '0.35rem 0.5rem' : '0.5rem 0.75rem',
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span style={{ color: '#7c6af7', fontSize: isMobile ? '0.42rem' : '0.55rem' }}>
          QUESTS [{completed}/{total}]
        </span>
        <span style={{ color: '#7c6af7', fontSize: '0.45rem', marginLeft: 'auto' }}>
          {collapsed ? '▶' : '▼'}
        </span>
      </button>

      {!collapsed && (
        <div style={{ padding: isMobile ? '0 0.5rem 0.4rem' : '0 0.75rem 0.6rem' }}>
          {QUESTS.map((q) => {
            const done = !!quests[q.id]
            return (
              <div
                key={q.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  marginBottom: '0.2rem',
                  fontSize: isMobile ? '0.4rem' : '0.5rem',
                }}
              >
                <span style={{ color: done ? '#4ade80' : '#555' }}>{done ? '▣' : '□'}</span>
                <span style={{ color: done ? '#4ade80aa' : '#888' }}>{q.title}</span>
                {done && <span style={{ color: '#4ade80', marginLeft: 'auto' }}>✓</span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
