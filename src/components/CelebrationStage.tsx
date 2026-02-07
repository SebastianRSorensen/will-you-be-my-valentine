import { useEffect } from 'react'
import { motion } from 'framer-motion'
import useConfetti from '../hooks/useConfetti'

export default function CelebrationStage() {
  const { startLoop } = useConfetti()

  useEffect(() => {
    startLoop()
  }, [startLoop])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-dvh px-6 text-center"
    >
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
        className="text-5xl sm:text-7xl font-bold text-text-primary mb-6"
      >
        YAAAY! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-xl sm:text-2xl text-text-secondary mb-8"
      >
        Jeg visste du ville si ja 😘
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="text-lg text-text-secondary max-w-md"
      >
        Gleder meg til valentine's day med deg! ❤️
      </motion.p>
    </motion.div>
  )
}
