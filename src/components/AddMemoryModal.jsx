import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useApp } from '../store'
import { FiX } from 'react-icons/fi'

export default function AddMemoryModal() {
  const { showAddMemory, setShowAddMemory, addMemory } = useApp()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = () => {
    if (!title || !text) return
    addMemory({ title, text, date }); setTitle(''); setText(''); setShowAddMemory(false)
  }

  const ic = 'w-full px-4 py-3 rounded-btn border border-warm/30 dark:border-cosmos-border focus:border-rose dark:focus:border-nebula focus:outline-none text-sm font-sans bg-champagne-light/20 dark:bg-cosmos/50 dark:text-cosmos-text font-light'

  return (
    <AnimatePresence>
      {showAddMemory && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop bg-slate-dark/20 dark:bg-cosmos/40"
          onClick={() => setShowAddMemory(false)}>
          <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }}
            className="bg-surface dark:bg-cosmos-card rounded-card p-8 max-w-md w-full shadow-2xl border border-warm/10 dark:border-cosmos-border"
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl text-slate-dark dark:text-cosmos-text">New memory</h3>
              <button onClick={() => setShowAddMemory(false)} className="p-1 rounded-btn hover:bg-champagne dark:hover:bg-cosmos-surface" aria-label="Close">
                <FiX className="w-4 h-4 text-taupe dark:text-cosmos-muted" />
              </button>
            </div>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className={`${ic} mb-3`} />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className={`${ic} mb-3`} />
            <textarea placeholder="What happened?" value={text} onChange={e => setText(e.target.value)} rows={3} className={`${ic} mb-5 resize-none`} />
            <button onClick={handleSubmit} disabled={!title || !text}
              className="w-full py-3 rounded-btn bg-slate-dark dark:bg-nebula text-white text-[11px] font-sans tracking-[0.1em] uppercase hover:bg-rose dark:hover:bg-nebula/80 transition-colors disabled:opacity-30">Save</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
