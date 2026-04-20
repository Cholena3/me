import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useApp } from '../store'
import { FiLock, FiUnlock } from 'react-icons/fi'

const notes = [
  'Reminder: You don\'t have to have it all figured out. You just have to keep showing up. Carpe diem, always.',
  'Goals for this year: Ship the ITDA project. Improve DSA consistency. Read 12 books. Visit Paris (manifesting). Take better care of myself.',
  'The person I\'m becoming is worth the discomfort of growth. Keep dancing, keep laughing, keep building.',
  'Things that make me happy: home-made food, Taylor Swift on full volume, chocolate at midnight, and people who match my effort.',
  'Dear future Cho — I hope you made it to Paris, shipped something you\'re proud of, and still look up at the stars. Stay soft.',
]

export default function SecretSection() {
  const { secretUnlocked, setSecretUnlocked } = useApp()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleUnlock = () => {
    if (password === 'cho2026') { setSecretUnlocked(true); setError(false) }
    else { setError(true); setTimeout(() => setError(false), 2000) }
  }

  return (
    <section className="py-32 px-8 max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {!secretUnlocked ? (
          <motion.div key="locked" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} viewport={{ once: true }}
            className="rounded-card p-10 bg-surface dark:bg-cosmos-card border border-warm/20 dark:border-cosmos-border text-center">
            <div className="w-12 h-12 rounded-card bg-champagne dark:bg-nebula/20 flex items-center justify-center mx-auto mb-6">
              <FiLock className="w-5 h-5 text-dusty-dark dark:text-nebula-soft" />
            </div>
            <h3 className="font-serif text-xl text-slate-dark dark:text-cosmos-text mb-2">Private</h3>
            <p className="text-xs text-taupe dark:text-cosmos-muted font-sans font-light mb-8">Only for Cho's eyes.</p>
            <div className="flex gap-2 max-w-xs mx-auto">
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                className={`flex-1 px-4 py-2.5 rounded-btn border ${error ? 'border-red-300' : 'border-warm/30 dark:border-cosmos-border'} focus:border-rose dark:focus:border-nebula focus:outline-none text-sm font-sans bg-champagne-light/30 dark:bg-cosmos/50 dark:text-cosmos-text font-light`} />
              <button onClick={handleUnlock} className="px-4 py-2.5 rounded-btn bg-slate-dark dark:bg-nebula/30 text-white hover:bg-rose dark:hover:bg-nebula transition-colors">
                <FiUnlock className="w-4 h-4" />
              </button>
            </div>
            {error && <p className="text-xs text-red-400 mt-3 font-sans">Incorrect password</p>}
          </motion.div>
        ) : (
          <motion.div key="unlocked" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-card p-10 bg-surface dark:bg-cosmos-card border border-warm/20 dark:border-cosmos-border">
            <div className="w-12 h-12 rounded-card bg-rose dark:bg-nebula flex items-center justify-center mx-auto mb-6">
              <FiUnlock className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-serif text-xl text-slate-dark dark:text-cosmos-text mb-8 text-center">Private notes</h3>
            <div className="space-y-4">
              {notes.map((n, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="rounded-btn p-5 bg-champagne-light/50 dark:bg-cosmos/50 border border-warm/15 dark:border-cosmos-border">
                  <p className="text-sm text-slate dark:text-cosmos-muted font-sans font-light leading-relaxed">{n}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
