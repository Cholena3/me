import { motion } from 'framer-motion'
import { useState } from 'react'
import { useApp } from '../store'
import { FiEdit2, FiTrash2, FiPlus, FiCheck, FiX } from 'react-icons/fi'

const traits = [
  'Detail-oriented', 'Quietly ambitious', 'Self-aware',
  'Consistency-driven', 'Aesthetic-focused', 'Secretly hilarious',
]

const interests = [
  'Travelling', 'Chocolates', 'Dancing', 'Taylor Swift', 'Coffee',
  'Binge-watching', 'Curating outfits', 'Home-made food', 'Paris dreamer',
  'Clean design', 'Building projects', 'Space & cosmos',
]

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
}

function EditableFavCard({ fav, isAdmin, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(fav.items)

  const save = () => { onUpdate(fav.id, val); setEditing(false) }

  return (
    <div className="rounded-card p-6 bg-champagne-light dark:bg-cosmos-card border border-warm/20 dark:border-cosmos-border glass-card glow-border relative group">
      <p className="text-[10px] tracking-[0.2em] uppercase font-sans mb-2 text-taupe dark:text-cosmos-muted opacity-60">{fav.category}</p>
      {editing ? (
        <div>
          <input value={val} onChange={e => setVal(e.target.value)}
            className="w-full px-2 py-1.5 rounded-btn border border-warm/30 dark:border-cosmos-border text-sm font-sans bg-transparent dark:text-cosmos-text focus:outline-none focus:border-rose dark:focus:border-nebula" />
          <div className="flex gap-2 mt-2">
            <button onClick={save} className="text-emerald-500 hover:text-emerald-400"><FiCheck className="w-3.5 h-3.5" /></button>
            <button onClick={() => { setVal(fav.items); setEditing(false) }} className="text-taupe hover:text-red-400"><FiX className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      ) : (
        <p className="text-sm font-sans leading-relaxed text-slate-dark dark:text-cosmos-text">{fav.items}</p>
      )}
      {isAdmin && !editing && (
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setEditing(true)} className="p-1 rounded-btn hover:bg-warm/20 dark:hover:bg-cosmos-border/30 text-taupe dark:text-cosmos-muted"><FiEdit2 className="w-3 h-3" /></button>
          <button onClick={() => onDelete(fav.id)} className="p-1 rounded-btn hover:bg-red-50 dark:hover:bg-red-900/20 text-taupe dark:text-cosmos-muted hover:text-red-400"><FiTrash2 className="w-3 h-3" /></button>
        </div>
      )}
    </div>
  )
}

export default function AboutMe() {
  const { favorites, isAdmin, updateFavorite, addFavorite, deleteFavorite } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [newCat, setNewCat] = useState('')
  const [newItems, setNewItems] = useState('')

  const handleAdd = () => {
    if (!newCat.trim() || !newItems.trim()) return
    addFavorite(newCat.trim(), newItems.trim())
    setNewCat(''); setNewItems(''); setShowAdd(false)
  }

  return (
    <section id="about" className="py-32 px-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-20">
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-4">About</p>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-dark dark:text-cosmos-text dark:glow-text">Who I am</h2>
      </motion.div>

      {/* Bio */}
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="max-w-2xl mb-24 bg-surface/80 dark:bg-transparent rounded-card p-8 border border-warm/10 dark:border-cosmos-border/30 glass-card">
        <p className="font-sans text-[15px] leading-[2] text-slate dark:text-cosmos-muted font-light">
          I'm <span className="text-rose dark:text-nebula-light font-normal">Cho</span> — a 20-year-old B.Tech student, Aries,
          coffee enthusiast, and someone who lives by <em className="font-serif text-rose-dark dark:text-nebula-soft">carpe diem</em>.
          I care about discipline, clean systems, and doing things properly — even when no one's watching.
        </p>
        <p className="font-sans text-[15px] leading-[2] text-slate dark:text-cosmos-muted font-light mt-6">
          When I'm not coding, you'll find me dancing, watching Interstellar for the hundredth time
          (I just love space), binge-watching Bridgerton, planning my future trip to Paris, or eating
          way too much chocolate. I'm funnier than I look — just ask anyone who actually knows me.
        </p>
      </motion.div>

      {/* Quick facts */}
      <div className="mb-24">
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-8">Quick facts</p>
        <div className="flex flex-wrap gap-3">
          {['Aries ♈', 'Space enthusiast', 'Funnier than expected', 'Pinterest red aesthetic', 'Carpe diem', 'Chocolate addict'].map((f, i) => (
            <motion.span key={f} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="px-4 py-2 rounded-btn bg-champagne dark:bg-cosmos-card text-dusty-dark dark:text-cosmos-muted text-xs font-sans border border-dusty-light/50 dark:border-cosmos-border">
              {f}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Editable Favorites */}
      <div className="mb-24">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans">Favorites</p>
          {isAdmin && (
            <button onClick={() => setShowAdd(!showAdd)} className="text-[10px] font-sans text-rose dark:text-nebula-light flex items-center gap-1 hover:underline">
              <FiPlus className="w-3 h-3" /> Add
            </button>
          )}
        </div>

        {showAdd && isAdmin && (
          <div className="mb-4 p-4 rounded-card bg-surface dark:bg-cosmos-card border border-warm/20 dark:border-cosmos-border">
            <input placeholder="Category (e.g. Food)" value={newCat} onChange={e => setNewCat(e.target.value)}
              className="w-full px-3 py-2 rounded-btn border border-warm/30 dark:border-cosmos-border text-sm font-sans bg-transparent dark:text-cosmos-text focus:outline-none mb-2" />
            <input placeholder="Items (e.g. Sushi · Ramen · Pizza)" value={newItems} onChange={e => setNewItems(e.target.value)}
              className="w-full px-3 py-2 rounded-btn border border-warm/30 dark:border-cosmos-border text-sm font-sans bg-transparent dark:text-cosmos-text focus:outline-none mb-2" />
            <div className="flex gap-2">
              <button onClick={handleAdd} className="px-3 py-1.5 rounded-btn bg-rose dark:bg-nebula text-white text-xs">Save</button>
              <button onClick={() => setShowAdd(false)} className="px-3 py-1.5 rounded-btn text-taupe text-xs">Cancel</button>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((f, i) => (
            <motion.div key={f.id} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <EditableFavCard fav={f} isAdmin={isAdmin} onUpdate={updateFavorite} onDelete={deleteFavorite} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Traits */}
      <div className="mb-24">
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-8">Traits</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {traits.map((t, i) => (
            <motion.span key={t} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-serif text-lg text-slate-dark dark:text-cosmos-text">
              {t}{i < traits.length - 1 && <span className="text-dusty dark:text-cosmos-border ml-8">·</span>}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-8">Interests</p>
        <div className="flex flex-wrap gap-2">
          {interests.map((item, i) => (
            <motion.span key={item} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="px-4 py-2 rounded-btn border border-warm/40 dark:border-cosmos-border text-xs font-sans text-taupe dark:text-cosmos-muted hover:bg-rose/10 hover:text-rose-dark dark:hover:bg-nebula/10 dark:hover:text-nebula-light dark:hover:border-nebula/30 transition-all duration-300">
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
