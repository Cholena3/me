import { motion } from 'framer-motion'
import { useApp } from '../store'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useApp()

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      onClick={() => setDarkMode(!darkMode)}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-card flex items-center justify-center transition-all duration-500 shadow-lg ${
        darkMode
          ? 'bg-cosmos-card border border-cosmos-border text-star-gold hover:bg-nebula/20 shadow-nebula/10'
          : 'bg-surface border border-warm/30 text-dusty-dark hover:bg-champagne shadow-warm/10'
      }`}
      aria-label={darkMode ? 'Switch to day mode' : 'Switch to night mode'}
    >
      <motion.div
        key={darkMode ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
      </motion.div>
    </motion.button>
  )
}
