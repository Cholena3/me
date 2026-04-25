import { motion } from 'framer-motion'
import { useApp } from '../store'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

export default function MemoryTimeline() {
  const { memories, setShowAddMemory, deleteMemory, isAdmin } = useApp()

  return (
    <section id="memories" className="py-32 px-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex items-end justify-between mb-20"
      >
        <div>
          <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-4">Journal</p>
          <h2 className="font-serif text-4xl md:text-5xl text-slate-dark dark:text-cosmos-text dark:glow-text">Timeline</h2>
        </div>
        <button
          onClick={() => setShowAddMemory(true)}
          className="px-4 py-2 rounded-btn text-[11px] font-sans tracking-[0.1em] uppercase bg-slate-dark dark:bg-nebula/20 dark:border dark:border-nebula/30 text-white dark:text-nebula-light flex items-center gap-1.5 hover:bg-rose dark:hover:bg-nebula transition-colors duration-300"
        >
          <FiPlus className="w-3 h-3" /> Add
        </button>
      </motion.div>

      <div className="relative">
        <div className="absolute left-[5px] top-3 bottom-3 w-px bg-warm/50 dark:bg-cosmos-border" />
        <div className="space-y-12">
          {memories.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative pl-12"
            >
              <div className="absolute left-0 top-2 w-[11px] h-[11px] rounded-full border-2 border-rose dark:border-nebula bg-base dark:bg-cosmos dark:glow-accent" />
              <div className="bg-surface dark:bg-transparent rounded-card p-5 border border-warm/10 dark:border-transparent glass-card glow-border relative group">
                <p className="text-[10px] tracking-[0.2em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-3">{m.date}</p>
                <h3 className="font-serif text-lg text-slate-dark dark:text-cosmos-text mb-2">{m.title}</h3>
                <p className="text-sm text-slate dark:text-cosmos-muted font-sans font-light leading-relaxed">{m.text}</p>
                {isAdmin && (
                  <button onClick={() => deleteMemory(m.id)} className="absolute top-3 right-3 p-1 rounded-btn opacity-0 group-hover:opacity-100 text-taupe/30 hover:text-red-400 transition-all">
                    <FiTrash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
