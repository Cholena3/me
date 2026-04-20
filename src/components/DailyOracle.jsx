import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../store'

const messages = [
  { text: 'The stars align for quiet progress today.', icon: '✨' },
  { text: 'Trust the timing of your life — even the pauses have purpose.', icon: '🌙' },
  { text: 'Something you planted months ago is about to bloom.', icon: '🌸' },
  { text: 'Your energy today is magnetic. Use it wisely.', icon: '⚡' },
  { text: 'The universe rewards consistency, not perfection.', icon: '🌟' },
  { text: 'A small act of courage will open a big door.', icon: '🚪' },
  { text: 'Let go of what you can\'t control. Focus on what you can build.', icon: '🔨' },
  { text: 'Someone is thinking of you right now. Send them a message.', icon: '💌' },
  { text: 'Today\'s code will be tomorrow\'s foundation. Write it well.', icon: '💻' },
  { text: 'The moon says: rest is productive too.', icon: '🌕' },
  { text: 'You\'re closer to your goals than you were yesterday.', icon: '📍' },
  { text: 'Dance today. Even if it\'s just in your chair.', icon: '💃' },
  { text: 'A cup of coffee and a clear mind can solve anything.', icon: '☕' },
  { text: 'Your aesthetic sense is a superpower. Don\'t underestimate it.', icon: '🎨' },
  { text: 'The cosmos whispers: be bold, be soft, be you.', icon: '🦋' },
  { text: 'Paris is waiting. Keep building toward it.', icon: '🗼' },
  { text: 'Today\'s vibe: main character energy.', icon: '👑' },
  { text: 'Somewhere in the universe, a star was born for you.', icon: '⭐' },
  { text: 'Chocolate first, then conquer the world.', icon: '🍫' },
  { text: 'Your quiet ambition is louder than you think.', icon: '🔥' },
]

export default function DailyOracle() {
  const { darkMode } = useApp()

  const oracle = useMemo(() => {
    // Seed by date so it changes daily but stays consistent within the day
    const today = new Date()
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
    return messages[seed % messages.length]
  }, [])

  return (
    <section className="py-16 px-8 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`text-center rounded-card p-10 border relative overflow-hidden ${
          darkMode
            ? 'bg-cosmos-card/60 backdrop-blur-md border-cosmos-border/50 shadow-lg shadow-nebula/5 glass-card glow-border'
            : 'bg-surface border-warm/20 shadow-md shadow-warm/10'
        }`}
      >
        {/* Glow effect in dark mode */}
        {darkMode && (
          <div className="absolute inset-0 bg-gradient-to-br from-nebula/5 via-transparent to-stellar/5 pointer-events-none" />
        )}

        <p className={`text-[10px] tracking-[0.3em] uppercase font-sans mb-6 ${
          darkMode ? 'text-nebula-soft' : 'text-taupe'
        }`}>
          {darkMode ? '🔮 celestial message' : '✨ daily thought'}
        </p>

        <span className="text-3xl block mb-4">{oracle.icon}</span>

        <p className={`font-serif text-lg md:text-xl leading-relaxed ${
          darkMode ? 'text-cosmos-text' : 'text-slate-dark'
        }`}>
          "{oracle.text}"
        </p>

        <p className={`text-[10px] mt-6 font-sans tracking-wide ${
          darkMode ? 'text-cosmos-muted/40' : 'text-taupe/40'
        }`}>
          refreshes daily
        </p>
      </motion.div>
    </section>
  )
}
