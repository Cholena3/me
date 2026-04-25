import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../store'

export default function BackToTop() {
  const { darkMode } = useApp()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollUp}
          className={`fixed bottom-8 left-8 z-50 w-12 h-12 rounded-card flex items-center justify-center transition-all duration-300 ${
            darkMode
              ? 'bg-cosmos-card/80 backdrop-blur-md border border-cosmos-border/50 text-nebula-light hover:bg-nebula/20 shadow-lg shadow-nebula/10'
              : 'bg-surface border border-warm/30 text-dusty-dark hover:bg-champagne shadow-md shadow-warm/10'
          }`}
          style={darkMode ? { animation: 'rocketBob 2s ease-in-out infinite' } : {}}
          aria-label="Back to top"
        >
          <span className="text-lg">{darkMode ? '🚀' : '↑'}</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
