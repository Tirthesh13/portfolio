'use client'
import { useGameStore } from '@/store/gameStore'
import { QUESTS } from '@/game/quests'
import { motion, AnimatePresence } from 'framer-motion'

const SLOTS = QUESTS.length

export default function Inventory() {
  const inventory = useGameStore((s) => s.inventory)

  const rewardMap: Record<string, string> = Object.fromEntries(
    QUESTS.map((q) => [q.reward, q.rewardEmoji])
  )

  return (
    <div
      className="hidden md:flex"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(0,0,0,0.75)',
        border: '1px solid rgba(124,106,247,0.35)',
        padding: '0.5rem 0.75rem',
        pointerEvents: 'none',
      }}
    >
      <span
        className="font-pixel"
        style={{ color: '#7c6af7', fontSize: '0.5rem', marginRight: '0.25rem' }}
      >
        ITEMS:
      </span>
      {Array.from({ length: SLOTS }).map((_, i) => {
        const itemId = QUESTS[i].reward
        const collected = inventory.includes(itemId)
        const emoji = rewardMap[itemId] ?? '?'
        return (
          <div
            key={itemId}
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: collected ? 'rgba(124,106,247,0.15)' : 'rgba(30,30,50,0.5)',
              border: `1px solid ${collected ? 'rgba(124,106,247,0.6)' : 'rgba(60,60,80,0.5)'}`,
              fontSize: '1.1rem',
              opacity: collected ? 1 : 0.25,
              boxShadow: collected ? '0 0 8px rgba(124,106,247,0.4)' : 'none',
            }}
          >
            <AnimatePresence>
              {collected && (
                <motion.span
                  key={`item-${itemId}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  {emoji}
                </motion.span>
              )}
            </AnimatePresence>
            {!collected && (
              <span style={{ color: '#333', fontSize: '0.6rem' }}>■</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
