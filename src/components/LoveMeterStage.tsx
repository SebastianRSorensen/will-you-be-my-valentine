import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const milestones = [
  { threshold: 100, text: 'Bare 100%? Me kan gjør det bedre!' },
  { threshold: 500, text: 'Nå snakke vi! 🔥' },
  { threshold: 1000, text: 'Til månen og tilbake! 🚀' },
  { threshold: 5000, text: 'WOOOW du elsker meg SÅ mye?? 🥰' },
]

function getMilestoneText(value: number): string | null {
  for (let i = milestones.length - 1; i >= 0; i--) {
    if (value >= milestones[i].threshold) return milestones[i].text
  }
  return null
}

export default function LoveMeterStage({ onNext }: { onNext: () => void }) {
  const [value, setValue] = useState(0)
  const [showNext, setShowNext] = useState(false)
  const speedRef = useRef(2)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const showNextRef = useRef(false)

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    speedRef.current = 2
  }, [])

  const start = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      speedRef.current *= 1.03
      setValue((prev) => {
        const next = Math.round(prev + speedRef.current)
        if (next >= 1000 && !showNextRef.current) {
          showNextRef.current = true
          setShowNext(true)
        }
        return next
      })
    }, 50)
  }, [])

  const milestoneText = getMilestoneText(value)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-dvh px-6 text-center select-none"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-bold text-text-primary mb-8"
      >
        Kor mye elsker du meg?
      </motion.h2>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-6xl sm:text-8xl font-bold text-accent mb-4 tabular-nums"
      >
        {value}%
      </motion.div>

      <AnimatePresence mode="wait">
        {milestoneText && (
          <motion.p
            key={milestoneText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg sm:text-xl text-text-secondary mb-8 h-8"
          >
            {milestoneText}
          </motion.p>
        )}
      </AnimatePresence>

      {!milestoneText && <div className="mb-8 h-8" />}

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onPointerDown={start}
        onPointerUp={stop}
        onPointerLeave={stop}
        className="px-10 py-4 bg-accent text-white font-semibold rounded-full text-xl hover:bg-accent-hover transition-colors cursor-pointer touch-none"
      >
        Hold inne! ❤️
      </motion.button>

      {showNext && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onNext}
          className="mt-6 px-8 py-3 bg-accent text-white font-semibold rounded-full text-lg hover:bg-accent-hover transition-colors cursor-pointer"
        >
          Neste ❤️
        </motion.button>
      )}
    </motion.div>
  )
}
