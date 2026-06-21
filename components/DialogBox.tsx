'use client'
import { useEffect, useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function DialogBox() {
  const { dialogue, nextLine, closeDialogue, phase } = useGameStore()
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  const currentLine = dialogue?.lines[dialogue.lineIndex] ?? ''

  useEffect(() => {
    if (!dialogue) { setDisplayed(''); setDone(false); return }
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i >= currentLine.length) { setDone(true); clearInterval(interval); return }
      setDisplayed(currentLine.slice(0, ++i))
    }, 30)
    return () => clearInterval(interval)
  }, [dialogue?.lineIndex, dialogue?.speaker, currentLine])

  useEffect(() => {
    if (phase === 'dialogue') window.dispatchEvent(new Event('game:dialogue-open'))
    else window.dispatchEvent(new Event('game:dialogue-close'))
  }, [phase])

  const advance = () => {
    if (!done) { setDisplayed(currentLine); setDone(true) }
    else nextLine()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E' || e.key === 'Enter') advance()
      if (e.key === 'Escape') closeDialogue()
    }
    if (phase === 'dialogue') window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, done, advance])

  return (
    <AnimatePresence>
      {phase === 'dialogue' && dialogue && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-30 p-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={advance}
        >
          <div
            className="max-w-3xl mx-auto bg-black/90 border-2 border-[#7c6af7] relative"
            style={{ boxShadow: '0 0 0 2px #0a0a0f, 0 0 0 4px #7c6af7, 0 0 20px rgba(124,106,247,0.3)' }}
          >
            {/* Speaker name */}
            <div className="absolute -top-5 left-4 bg-[#7c6af7] px-3 py-1">
              <span className="font-pixel text-white text-xs">{dialogue.speaker}</span>
            </div>

            <div className="p-5 pt-6">
              <p className="font-pixel text-white text-xs leading-6 min-h-8">{displayed}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="font-pixel text-gray-600 text-xs">
                  {dialogue.lineIndex + 1}/{dialogue.lines.length}
                </span>
                {done ? (
                  <span className="font-pixel text-[#7c6af7] text-xs blink">
                    {dialogue.lineIndex < dialogue.lines.length - 1 ? '▼ NEXT [E]' : '✓ CLOSE [E]'}
                  </span>
                ) : (
                  <span className="font-pixel text-gray-700 text-xs">CLICK TO SKIP</span>
                )}
              </div>
            </div>
          </div>
          <p className="text-center font-pixel text-gray-700 text-xs mt-2">[ESC] CLOSE</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
