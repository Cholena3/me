import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../store'

function getMoonPhase() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()

  // Conway's moon phase algorithm
  let r = year % 100
  r %= 19
  if (r > 9) r -= 19
  r = ((r * 11) % 30) + month + day
  if (month < 3) r += 2
  r -= ((year < 2000) ? 4 : 8.3)
  r = Math.floor(r + 0.5) % 30
  if (r < 0) r += 30

  return r // 0-29, where 0/29 = new moon, ~15 = full moon
}

const phaseNames = [
  'New Moon', 'Waxing Crescent', 'Waxing Crescent', 'Waxing Crescent',
  'Waxing Crescent', 'Waxing Crescent', 'Waxing Crescent', 'First Quarter',
  'First Quarter', 'Waxing Gibbous', 'Waxing Gibbous', 'Waxing Gibbous',
  'Waxing Gibbous', 'Waxing Gibbous', 'Full Moon', 'Full Moon',
  'Waning Gibbous', 'Waning Gibbous', 'Waning Gibbous', 'Waning Gibbous',
  'Waning Gibbous', 'Last Quarter', 'Last Quarter', 'Waning Crescent',
  'Waning Crescent', 'Waning Crescent', 'Waning Crescent', 'Waning Crescent',
  'Waning Crescent', 'New Moon',
]

const phaseEmojis = [
  '🌑', '🌒', '🌒', '🌒', '🌒', '🌒', '🌒', '🌓',
  '🌓', '🌔', '🌔', '🌔', '🌔', '🌔', '🌕', '🌕',
  '🌖', '🌖', '🌖', '🌖', '🌖', '🌗', '🌗', '🌘',
  '🌘', '🌘', '🌘', '🌘', '🌘', '🌑',
]

export default function MoonPhase() {
  const { darkMode } = useApp()

  const phase = useMemo(() => {
    const p = getMoonPhase()
    return { day: p, name: phaseNames[p], emoji: phaseEmojis[p] }
  }, [])

  if (!darkMode) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-card bg-cosmos-card/80 backdrop-blur-md border border-cosmos-border/50"
    >
      <span className="text-xl">{phase.emoji}</span>
      <div>
        <p className="text-[9px] tracking-[0.2em] text-cosmos-muted uppercase font-sans">Tonight</p>
        <p className="text-xs text-nebula-soft font-sans">{phase.name}</p>
      </div>
    </motion.div>
  )
}
