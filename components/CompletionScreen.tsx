'use client'
import { useGameStore } from '@/store/gameStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function CompletionScreen() {
  const allDone = useGameStore((s) => s.allQuestsComplete())
  const setMode = useGameStore((s) => s.setMode)

  return (
    <AnimatePresence>
      {allDone && (
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'rgba(5,3,15,0.96)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            style={{ textAlign: 'center', maxWidth: 560 }}
          >
            <motion.p
              className="font-pixel"
              style={{ color: '#f5c842', fontSize: '1.5rem', marginBottom: '0.5rem' }}
              animate={{ textShadow: ['0 0 10px #f5c842', '0 0 30px #f5c842', '0 0 10px #f5c842'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ★ QUEST COMPLETE ★
            </motion.p>

            <div
              style={{
                border: '2px solid rgba(245,200,66,0.4)',
                boxShadow: '0 0 24px rgba(245,200,66,0.2)',
                padding: '2rem',
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
                background: 'rgba(15,10,30,0.8)',
              }}
            >
              <p
                className="font-pixel"
                style={{ color: '#f5c842', fontSize: '0.65rem', marginBottom: '1rem' }}
              >
                You have explored the entire realm!
              </p>
              <p
                style={{
                  color: '#aaa',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}
              >
                Thanks for playing through my portfolio.
                <br />
                If you&apos;d like to connect or work together:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <a
                  href="mailto:dhaigudetirthesh@gmail.com"
                  className="font-pixel"
                  style={{
                    color: '#7c6af7',
                    textDecoration: 'none',
                    border: '1px solid rgba(124,106,247,0.5)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.6rem',
                    display: 'block',
                    background: 'rgba(124,106,247,0.08)',
                  }}
                >
                  ✉ dhaigudetirthesh@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/tirthesh-dhaigude"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-pixel"
                  style={{
                    color: '#60a5fa',
                    textDecoration: 'none',
                    border: '1px solid rgba(96,165,250,0.4)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.6rem',
                    display: 'block',
                    background: 'rgba(96,165,250,0.06)',
                  }}
                >
                  ↗ LinkedIn: tirthesh-dhaigude
                </a>
                <a
                  href="https://github.com/Tirthesh13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-pixel"
                  style={{
                    color: '#a78bfa',
                    textDecoration: 'none',
                    border: '1px solid rgba(167,139,250,0.4)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.6rem',
                    display: 'block',
                    background: 'rgba(167,139,250,0.06)',
                  }}
                >
                  ↗ GitHub: Tirthesh13
                </a>
                <a
                  href="#"
                  className="font-pixel"
                  style={{
                    color: '#f5c842',
                    textDecoration: 'none',
                    border: '1px solid rgba(245,200,66,0.4)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.6rem',
                    display: 'block',
                    background: 'rgba(245,200,66,0.06)',
                  }}
                >
                  ↓ Download Resume
                </a>
              </div>

              <button
                onClick={() => setMode('game')}
                className="font-pixel"
                style={{
                  background: 'rgba(124,106,247,0.15)',
                  border: '2px solid #7c6af7',
                  color: '#a89ef8',
                  fontSize: '0.6rem',
                  padding: '0.75rem 2rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 12px rgba(124,106,247,0.4)',
                }}
              >
                CONTINUE EXPLORING
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
