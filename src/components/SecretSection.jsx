import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useApp } from '../store'
import { FiLock, FiUnlock, FiPlus, FiX, FiTrash2 } from 'react-icons/fi'

export default function SecretSection() {
  const { secretUnlocked, setSecretUnlocked, privateNotes, addPrivateNote, deletePrivateNote } = useApp()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [newNote, setNewNote] = useState('')

  const handleUnlock = () => {
    if (password === 'cho2026') { setSecretUnlocked(true); setError(false) }
    else { setError(true); setTimeout(() => setError(false), 2000) }
  }

  const handleAdd = () => {
    if (!newNote.trim()) return
    addPrivateNote(newNote.trim())
    setNewNote('')
    setShowAdd(false)
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

            <div className="space-y-3">
              <AnimatePresence>
                {privateNotes.map((n) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8, height: 0, marginBottom: 0, padding: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group rounded-btn p-5 bg-champagne-light/50 dark:bg-cosmos/50 border border-warm/15 dark:border-cosmos-border relative"
                  >
                    <p className="text-sm text-slate dark:text-cosmos-muted font-sans font-light leading-relaxed pr-8">{n.text}</p>
                    <button
                      onClick={() => deletePrivateNote(n.id)}
                      className="absolute top-4 right-4 p-1.5 rounded-btn opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/20 text-taupe/40 hover:text-red-400 transition-all duration-200"
                      aria-label="Delete note"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add note */}
              {!showAdd ? (
                <button
                  onClick={() => setShowAdd(true)}
                  className="w-full border border-dashed border-warm/30 dark:border-cosmos-border rounded-btn p-4 flex items-center justify-center gap-2 text-taupe dark:text-cosmos-muted hover:border-rose-light dark:hover:border-nebula/40 hover:text-rose dark:hover:text-nebula-light transition-all duration-300"
                >
                  <FiPlus className="w-4 h-4" />
                  <span className="text-[11px] font-sans tracking-[0.1em] uppercase">Add a note</span>
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-btn p-5 bg-champagne-light/30 dark:bg-cosmos/30 border border-warm/20 dark:border-cosmos-border"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-sans text-taupe dark:text-cosmos-muted tracking-[0.15em] uppercase">New note</span>
                    <button onClick={() => { setShowAdd(false); setNewNote('') }} aria-label="Cancel">
                      <FiX className="w-4 h-4 text-taupe dark:text-cosmos-muted hover:text-rose dark:hover:text-nebula-light" />
                    </button>
                  </div>
                  <textarea
                    placeholder="Write something private..."
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-btn border border-warm/30 dark:border-cosmos-border focus:border-rose dark:focus:border-nebula focus:outline-none text-sm font-sans bg-surface/50 dark:bg-cosmos/50 dark:text-cosmos-text resize-none mb-3 font-light"
                    autoFocus
                  />
                  <button
                    onClick={handleAdd}
                    disabled={!newNote.trim()}
                    className="px-5 py-2 rounded-btn bg-rose dark:bg-nebula text-white text-[11px] font-sans tracking-[0.1em] uppercase hover:bg-rose-dark dark:hover:bg-nebula/80 transition-colors disabled:opacity-30"
                  >
                    Save
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
