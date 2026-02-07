import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const noTexts = [
  'Nei',
  'E du sikker?',
  'Veldig sikker?',
  'Tenk deg om!',
  'Nei er ikkje et alternativ 😤',
  'Siste sjanse...',
  'Ok, prøv igjen då 😏',
  'Den knappen funke ikkje 🫣',
  'Gi opp, du kan ikkje si nei 💪',
  '...',
]

function getRandomPosition() {
  const padding = window.innerWidth < 640 ? 20 : 40
  const x = padding + Math.random() * (window.innerWidth - 120 - padding * 2)
  const y = padding + Math.random() * (window.innerHeight - 50 - padding * 2)
  return { x, y }
}

export default function BigQuestionStage({ onNext }: { onNext: () => void }) {
  const [attempts, setAttempts] = useState(0)
  const [isDodging, setIsDodging] = useState(false)
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const lastDodge = useRef(0)

  const dodge = useCallback(() => {
    const now = Date.now()
    if (now - lastDodge.current < 100) return
    lastDodge.current = now

    if (!isDodging) setIsDodging(true)
    setNoPos(getRandomPosition())
    setAttempts((prev) => prev + 1)
  }, [isDodging])

  const noText = attempts < noTexts.length ? noTexts[attempts] : noTexts[noTexts.length - 1]
  const dismissed = attempts >= 10
  const yesScale = 1 + attempts * 0.05

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-dvh px-6 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-3xl sm:text-5xl font-bold text-text-primary mb-12"
      >
        Vil du være min valentine? 💝
      </motion.h2>

      <div className="flex gap-4 items-center">
        <motion.button
          animate={{ scale: yesScale }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={onNext}
          className="px-10 py-4 bg-accent text-white font-bold rounded-full text-xl hover:bg-accent-hover transition-colors cursor-pointer"
        >
          Ja! 💕
        </motion.button>

        {!isDodging && !dismissed && (
          <motion.button
            onMouseEnter={dodge}
            onTouchStart={dodge}
            onClick={dodge}
            className="px-6 py-3 bg-button-no text-gray-600 font-medium rounded-full text-sm hover:bg-gray-400 transition-colors cursor-pointer"
          >
            {noText}
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isDodging && !dismissed && (
          <motion.button
            key="dodging-no"
            animate={{ x: noPos.x, y: noPos.y, scale: attempts >= 9 ? 0.5 : 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onMouseEnter={dodge}
            onTouchStart={dodge}
            onClick={dodge}
            style={{ position: 'fixed', top: 0, left: 0 }}
            className="px-6 py-3 bg-button-no text-gray-600 font-medium rounded-full text-sm hover:bg-gray-400 transition-colors cursor-pointer z-50"
          >
            {noText}
          </motion.button>
        )}

        {dismissed && isDodging && (
          <motion.div
            key="poof"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', top: noPos.y, left: noPos.x }}
            className="px-6 py-3 bg-button-no text-gray-600 font-medium rounded-full text-sm z-50"
          >
            ...
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
