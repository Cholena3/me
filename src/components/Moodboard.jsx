import { motion } from 'framer-motion'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import { useApp } from '../store'
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'

const staticItems = [
  { type: 'quote', text: 'Carpe diem — seize the day.', sub: 'life motto', bg: 'bg-rose', darkBg: 'bg-indigo-900/50', light: true },
  { type: 'text', emoji: '☕', text: 'Coffee at 2am while debugging', bg: 'bg-champagne', darkBg: 'bg-cosmos-card', light: false, darkLight: true },
  { type: 'feature', title: 'Swiftie Corner', text: '"I\'m the problem, it\'s me" — but make it aesthetic', tags: ['Midnights', 'Folklore', '1989'], bg: 'bg-dusty', darkBg: 'bg-indigo-900/40', light: true },
  { type: 'text', emoji: '🗼', text: 'Paris is not just a city, it\'s a feeling', bg: 'bg-rose-light/30', darkBg: 'bg-cosmos-card', light: false, darkLight: true },
  { type: 'quote', text: 'The person I\'m becoming is worth the discomfort of growth.', sub: 'note to self', bg: 'bg-champagne-light', darkBg: 'bg-cosmos-card', light: false, darkLight: true },
  { type: 'feature', title: 'Current Aesthetic', text: null, tags: ['Soft glam', 'Red Pinterest', 'Warm tones', 'Golden hour', 'Vintage film'], bg: 'bg-rose-dark', darkBg: 'bg-indigo-950/60', light: true },
  { type: 'text', emoji: '🍫', text: 'Chocolate fixes everything. Literally everything.', bg: 'bg-dusty-light/40', darkBg: 'bg-cosmos-card', light: false, darkLight: true },
  { type: 'quote', text: 'Discipline works even when motivation doesn\'t.', sub: 'daily reminder', bg: 'bg-slate-dark', darkBg: 'bg-indigo-900/50', light: true },
  { type: 'text', emoji: '💃', text: 'Dance like nobody\'s watching', bg: 'bg-champagne', darkBg: 'bg-cosmos-card', light: false, darkLight: true },
  { type: 'movie', title: 'Space & Beyond', text: '"The cosmos is within us. We are made of star-stuff." — Carl Sagan', bg: 'bg-slate-dark', darkBg: 'bg-indigo-950/70', light: true },
  { type: 'text', emoji: '♈', text: 'Aries: passionate, bold, and always right', bg: 'bg-rose-light/20', darkBg: 'bg-cosmos-card', light: false, darkLight: true },
]

const breakpoints = { default: 3, 768: 2, 500: 1 }

function MusicCard({ dark }) {
  const { songs, isAdmin, addSong, deleteSong } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [name, setName] = useState('')
  const [artist, setArtist] = useState('')

  const handleAdd = () => {
    if (!name.trim()) return
    addSong(name.trim(), artist.trim())
    setName(''); setArtist(''); setShowAdd(false)
  }

  const bg = dark ? 'bg-cosmos-card border border-cosmos-border glass-card' : 'bg-slate-dark'

  return (
    <div className={`${bg} p-7 rounded-card`}>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-white/50">On Repeat This Week</p>
        {isAdmin && (
          <button onClick={() => setShowAdd(!showAdd)} className="text-white/40 hover:text-white/80">
            <FiPlus className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {showAdd && isAdmin && (
        <div className="mb-3 space-y-2">
          <input placeholder="Song name" value={name} onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-btn bg-white/10 text-white text-xs font-sans border-0 focus:outline-none placeholder:text-white/30" />
          <input placeholder="Artist" value={artist} onChange={e => setArtist(e.target.value)}
            className="w-full px-3 py-2 rounded-btn bg-white/10 text-white text-xs font-sans border-0 focus:outline-none placeholder:text-white/30" />
          <div className="flex gap-2">
            <button onClick={handleAdd} className="px-3 py-1 rounded-btn bg-white/20 text-white text-[10px]">Add</button>
            <button onClick={() => setShowAdd(false)} className="px-3 py-1 rounded-btn text-white/40 text-[10px]">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2.5">
        {songs.map(s => (
          <div key={s.id} className="bg-white/10 rounded-btn px-4 py-3 flex items-center justify-between group">
            <div>
              <p className="text-sm font-sans text-white">{s.name}</p>
              {s.artist && <p className="text-[10px] text-white/40 font-sans">{s.artist}</p>}
            </div>
            {isAdmin && (
              <button onClick={() => deleteSong(s.id)} className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all">
                <FiTrash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
        {songs.length === 0 && <p className="text-xs text-white/30 font-sans text-center py-2">No songs yet</p>}
      </div>
    </div>
  )
}

function Card({ item, dark }) {
  const isLight = dark ? item.light : item.light
  const textCls = isLight ? 'text-white' : (dark && item.darkLight ? 'text-white' : dark ? 'text-cosmos-text' : 'text-slate-dark')
  const subCls = isLight ? 'text-white/50' : (dark ? 'text-white/40' : 'text-taupe')
  const bg = dark ? (item.darkBg || item.bg) : item.bg
  const border = dark ? 'border border-cosmos-border glass-card glow-border' : ''

  if (item.type === 'feature') {
    return (
      <div className={`${bg} p-7 rounded-card ${border}`}>
        <p className={`font-serif text-lg mb-2 ${textCls}`}>{item.title}</p>
        {item.text && <p className={`text-xs font-sans mb-4 leading-relaxed ${subCls}`}>{item.text}</p>}
        <div className="flex flex-wrap gap-2">
          {item.tags.map(t => <span key={t} className="px-3 py-1.5 bg-white/15 rounded-btn text-[10px] font-sans text-white/80">{t}</span>)}
        </div>
      </div>
    )
  }
  if (item.type === 'movie') {
    return (
      <div className={`${bg} p-7 rounded-card ${border}`}>
        <p className={`font-serif text-lg mb-3 ${textCls}`}>{item.title}</p>
        <p className={`text-xs font-sans italic leading-relaxed ${subCls}`}>{item.text}</p>
      </div>
    )
  }
  if (item.type === 'quote') {
    return (
      <div className={`${bg} p-7 rounded-card ${border}`}>
        <p className={`font-serif text-base leading-relaxed ${textCls}`}>"{item.text}"</p>
        <p className={`text-[10px] tracking-[0.15em] uppercase font-sans mt-4 ${subCls}`}>{item.sub}</p>
      </div>
    )
  }
  return (
    <div className={`${bg} p-6 rounded-card ${border}`}>
      <span className="text-2xl block mb-3">{item.emoji}</span>
      <p className={`text-sm font-sans leading-relaxed ${textCls}`}>{item.text}</p>
    </div>
  )
}

export default function Moodboard() {
  const { darkMode } = useApp()

  // Insert music card at position 1
  const allItems = [
    staticItems[0],
    { type: 'music' }, // placeholder — rendered as MusicCard
    ...staticItems.slice(1),
  ]

  return (
    <section id="moodboard" className="py-32 px-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-4">Vibes</p>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-dark dark:text-cosmos-text dark:glow-text">Moodboard</h2>
        <p className="text-sm text-taupe dark:text-cosmos-muted font-sans font-light mt-4">A collage of everything that makes me, me.</p>
      </motion.div>

      <Masonry breakpointCols={breakpoints} className="masonry-grid" columnClassName="masonry-grid_column">
        {allItems.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="mb-6 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-warm/15 dark:hover:shadow-nebula/10 transition-all duration-500">
            {item.type === 'music' ? <MusicCard dark={darkMode} /> : <Card item={item} dark={darkMode} />}
          </motion.div>
        ))}
      </Masonry>
    </section>
  )
}
