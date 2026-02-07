import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import FloatingHearts from './components/FloatingHearts'
import SplashStage from './components/SplashStage'
import LikeMeStage from './components/LikeMeStage'
import LoveMeterStage from './components/LoveMeterStage'
import BigQuestionStage from './components/BigQuestionStage'
import CelebrationStage from './components/CelebrationStage'

type Stage = 1 | 2 | 3 | 4 | 5

export default function App() {
  const [stage, setStage] = useState<Stage>(1)
  const next = useCallback(() => setStage((s) => Math.min(s + 1, 5) as Stage), [])

  return (
    <>
      <FloatingHearts />
      <AnimatePresence mode="wait">
        {stage === 1 && <SplashStage key="splash" onNext={next} />}
        {stage === 2 && <LikeMeStage key="like" onNext={next} />}
        {stage === 3 && <LoveMeterStage key="meter" onNext={next} />}
        {stage === 4 && <BigQuestionStage key="question" onNext={next} />}
        {stage === 5 && <CelebrationStage key="celebration" />}
      </AnimatePresence>
    </>
  )
}
