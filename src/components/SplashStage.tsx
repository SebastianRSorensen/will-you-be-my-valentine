import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import TypingText from "./TypingText";

export default function SplashStage({ onNext }: { onNext: () => void }) {
  const [showButton, setShowButton] = useState(false);
  const handleComplete = useCallback(() => setShowButton(true), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-dvh px-6 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold text-text-primary mb-6"
      >
        Hei Bolla 🥰
      </motion.h1>

      <p className="text-lg sm:text-xl text-text-secondary h-8">
        <TypingText
          text="Eg har noe viktig å spør deg om..."
          speed={50}
          delay={800}
          onComplete={handleComplete}
        />
      </p>

      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onNext}
          className="mt-10 px-8 py-3 bg-accent text-white font-semibold rounded-full text-lg hover:bg-accent-hover transition-colors cursor-pointer"
        >
          Kadå?
        </motion.button>
      )}
    </motion.div>
  );
}
