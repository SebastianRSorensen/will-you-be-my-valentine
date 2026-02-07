import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Answer = null | 'ja' | 'nei'

export default function LikeMeStage({ onNext }: { onNext: () => void }) {
  const [answer, setAnswer] = useState<Answer>(null)

  useEffect(() => {
    if (answer === null) return
    const delay = answer === 'ja' ? 1500 : 2500
    const timeout = setTimeout(onNext, delay)
    return () => clearTimeout(timeout)
  }, [answer, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-dvh px-6 text-center"
    >
      {answer === null ? (
        <>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-10"
          >
            Liker du meg?
          </motion.h2>
          <div className="flex gap-4">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setAnswer('ja')}
              className="px-8 py-3 bg-accent text-white font-semibold rounded-full text-lg hover:bg-accent-hover transition-colors cursor-pointer"
            >
              Ja
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => setAnswer('nei')}
              className="px-8 py-3 bg-button-no text-text-primary font-semibold rounded-full text-lg hover:bg-gray-400 transition-colors cursor-pointer"
            >
              Nei
            </motion.button>
          </div>
        </>
      ) : (
        <motion.p
          key={answer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl sm:text-3xl font-semibold text-text-primary"
        >
          {answer === 'ja'
            ? 'Bra svar 😏'
            : 'Feil svar! Jeg liker ikke deg heller... Jeg ELSKER deg! ❤️'}
        </motion.p>
      )}
    </motion.div>
  )
}
