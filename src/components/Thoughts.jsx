import { motion } from 'framer-motion'
import { useState } from 'react'
import { useApp } from '../store'
import { FiPlus, FiX } from 'react-icons/fi'

const accents = [
  'border-l-rose dark:border-l-nebula', 'border-l-dusty dark:border-l-stellar',
  'border-l-slate-light dark:border-l-nebula-soft', 'border-l-rose-dark dark:border-l-nebula-light',
  'border-l-dusty-dark dark:border-l-stellar', 'border-l-taupe dark:border-l-nebula-soft',
]

export default function Thoughts() {
  const { thoughts, addThought } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [text, setText] = useState('')

  const handleAdd = () => {
    if (!text.trim()) return
    addThought({ text, date: new Date().toISOString().split('T')[0] })
    setText(''); setShowForm(false)
  }

  return (
    <section id="thoughts" className="py-32 px-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-4">Reflections</p>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-dark dark:text-cosmos-text">Thoughts</h2>
      </motion.div>

      <div className="space-y-4">
        {thoughts.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`rounded-card p-6 bg-surface dark:bg-cosmos-card border border-warm/15 dark:border-cosmos-border border-l-[3px] ${accents[i % accents.length]} hover:shadow-md hover:shadow-warm/10 dark:hover:shadow-nebula/5 transition-all duration-500`}
          >
            <p className="text-sm text-slate dark:text-cosmos-text font-sans font-light leading-relaxed">{t.text}</p>
            <p className="text-[10px] text-taupe/50 dark:text-cosmos-muted/50 font-sans mt-3 tracking-wide">{t.date}</p>
          </motion.div>
        ))}

        {!showForm ? (
          <motion.button
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            onClick={() => setShowForm(true)}
            className="w-full border border-dashed border-warm/30 dark:border-cosmos-border rounded-card p-5 flex items-center justify-center gap-2 text-taupe dark:text-cosmos-muted hover:border-rose-light dark:hover:border-nebula/40 hover:text-rose dark:hover:text-nebula-light transition-all duration-300"
          >
            <FiPlus className="w-4 h-4" />
            <span className="text-[11px] font-sans tracking-[0.1em] uppercase">Write a thought</span>
          </motion.button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-card p-6 bg-surface dark:bg-cosmos-card border border-warm/20 dark:border-cosmos-border">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-sans text-taupe dark:text-cosmos-muted tracking-[0.15em] uppercase">New thought</span>
              <button onClick={() => setShowForm(false)} aria-label="Cancel"><FiX className="w-4 h-4 text-taupe dark:text-cosmos-muted hover:text-rose dark:hover:text-nebula-light" /></button>
            </div>
            <textarea placeholder="What's on your mind?" value={text} onChange={e => setText(e.target.value)} rows={2}
              className="w-full px-4 py-3 rounded-btn border border-warm/30 dark:border-cosmos-border focus:border-rose dark:focus:border-nebula focus:outline-none text-sm font-sans bg-champagne-light/30 dark:bg-cosmos/50 dark:text-cosmos-text resize-none mb-3 font-light" autoFocus />
            <button onClick={handleAdd} disabled={!text.trim()}
              className="px-5 py-2 rounded-btn bg-rose dark:bg-nebula text-white text-[11px] font-sans tracking-[0.1em] uppercase hover:bg-rose-dark dark:hover:bg-nebula/80 transition-colors disabled:opacity-30">Save</button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
