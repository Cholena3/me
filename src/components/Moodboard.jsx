import { motion } from 'framer-motion'
import Masonry from 'react-masonry-css'
import { useApp } from '../store'

const dayItems = [
  { type: 'quote', text: 'Carpe diem — seize the day.', sub: 'life motto', bg: 'bg-rose', light: true },
  { type: 'music', title: 'On Repeat This Week', songs: ['Tum Hi Ho — Arijit Singh', 'Channa Mereya — Arijit Singh', 'Agar Tum Saath Ho — Arijit Singh'], bg: 'bg-slate-dark', light: true },
  { type: 'text', emoji: '☕', text: 'Coffee at 2am while debugging', bg: 'bg-champagne', light: false },
  { type: 'feature', title: 'Swiftie Corner', text: '"I\'m the problem, it\'s me" — but make it aesthetic', tags: ['Midnights', 'Folklore', '1989'], bg: 'bg-dusty', light: true },
  { type: 'text', emoji: '🗼', text: 'Paris is not just a city, it\'s a feeling', bg: 'bg-rose-light/30', light: false },
  { type: 'quote', text: 'The person I\'m becoming is worth the discomfort of growth.', sub: 'note to self', bg: 'bg-champagne-light', light: false },
  { type: 'feature', title: 'Current Aesthetic', text: null, tags: ['Soft glam', 'Red Pinterest', 'Warm tones', 'Golden hour', 'Vintage film'], bg: 'bg-rose-dark', light: true },
  { type: 'text', emoji: '🍫', text: 'Chocolate fixes everything. Literally everything.', bg: 'bg-dusty-light/40', light: false },
  { type: 'quote', text: 'Discipline works even when motivation doesn\'t.', sub: 'daily reminder', bg: 'bg-slate-dark', light: true },
  { type: 'text', emoji: '💃', text: 'Dance like nobody\'s watching', bg: 'bg-champagne', light: false },
  { type: 'movie', title: 'Space & Beyond', text: '"The cosmos is within us. We are made of star-stuff." — Carl Sagan', bg: 'bg-slate-dark', light: true },
  { type: 'text', emoji: '♈', text: 'Aries: passionate, bold, and always right', bg: 'bg-rose-light/20', light: false },
]

const nightItems = [
  { type: 'quote', text: 'Carpe diem — seize the day.', sub: 'life motto', bg: 'bg-nebula', light: true },
  { type: 'music', title: 'On Repeat This Week', songs: ['Tum Hi Ho — Arijit Singh', 'Channa Mereya — Arijit Singh', 'Agar Tum Saath Ho — Arijit Singh'], bg: 'bg-cosmos-card', light: true },
  { type: 'text', emoji: '☕', text: 'Coffee at 2am while debugging', bg: 'bg-cosmos-card', light: true },
  { type: 'feature', title: 'Swiftie Corner', text: '"I\'m the problem, it\'s me" — but make it aesthetic', tags: ['Midnights', 'Folklore', '1989'], bg: 'bg-indigo-900/60', light: true },
  { type: 'text', emoji: '🌌', text: 'Somewhere between the stars and the code', bg: 'bg-cosmos-card', light: true },
  { type: 'quote', text: 'The person I\'m becoming is worth the discomfort of growth.', sub: 'note to self', bg: 'bg-cosmos-card', light: true },
  { type: 'feature', title: 'Celestial Aesthetic', text: null, tags: ['Nebula glow', 'Deep space', 'Starlight', 'Cosmic dust', 'Aurora'], bg: 'bg-purple-900/50', light: true },
  { type: 'text', emoji: '🍫', text: 'Chocolate fixes everything. Even at 2am.', bg: 'bg-cosmos-card', light: true },
  { type: 'quote', text: 'Discipline works even when motivation doesn\'t.', sub: 'daily reminder', bg: 'bg-nebula/60', light: true },
  { type: 'text', emoji: '💃', text: 'Dance like nobody\'s watching', bg: 'bg-cosmos-card', light: true },
  { type: 'movie', title: 'Space & Beyond', text: '"The cosmos is within us. We are made of star-stuff." — Carl Sagan', bg: 'bg-indigo-950/80', light: true },
  { type: 'text', emoji: '♈', text: 'Aries: passionate, bold, and always right', bg: 'bg-cosmos-card', light: true },
]

const breakpoints = { default: 3, 768: 2, 500: 1 }

function Card({ item, dark }) {
  const textCls = item.light ? 'text-white' : (dark ? 'text-cosmos-text' : 'text-slate-dark')
  const subCls = item.light ? 'text-white/50' : (dark ? 'text-cosmos-muted' : 'text-taupe')
  const border = dark ? 'border border-cosmos-border' : ''

  if (item.type === 'music') {
    return (
      <div className={`${item.bg} p-7 rounded-card ${border}`}>
        <p className={`text-[10px] tracking-[0.2em] uppercase font-sans mb-5 ${subCls}`}>{item.title}</p>
        <div className="space-y-2.5">
          {item.songs.map((s, i) => (
            <div key={i} className="bg-white/10 rounded-btn px-4 py-3">
              <p className={`text-sm font-sans ${textCls}`}>{s}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (item.type === 'feature') {
    return (
      <div className={`${item.bg} p-7 rounded-card ${border}`}>
        <p className={`font-serif text-lg mb-2 ${textCls}`}>{item.title}</p>
        {item.text && <p className={`text-xs font-sans mb-4 leading-relaxed ${subCls}`}>{item.text}</p>}
        <div className="flex flex-wrap gap-2">
          {item.tags.map(t => (
            <span key={t} className="px-3 py-1.5 bg-white/15 rounded-btn text-[10px] font-sans text-white/80">{t}</span>
          ))}
        </div>
      </div>
    )
  }
  if (item.type === 'movie') {
    return (
      <div className={`${item.bg} p-7 rounded-card ${border}`}>
        <p className={`font-serif text-lg mb-3 ${textCls}`}>{item.title}</p>
        <p className={`text-xs font-sans italic leading-relaxed ${subCls}`}>{item.text}</p>
      </div>
    )
  }
  if (item.type === 'quote') {
    return (
      <div className={`${item.bg} p-7 rounded-card ${border}`}>
        <p className={`font-serif text-base leading-relaxed ${textCls}`}>"{item.text}"</p>
        <p className={`text-[10px] tracking-[0.15em] uppercase font-sans mt-4 ${subCls}`}>{item.sub}</p>
      </div>
    )
  }
  return (
    <div className={`${item.bg} p-6 rounded-card ${border}`}>
      <span className="text-2xl block mb-3">{item.emoji}</span>
      <p className={`text-sm font-sans leading-relaxed ${textCls}`}>{item.text}</p>
    </div>
  )
}

export default function Moodboard() {
  const { darkMode } = useApp()
  const items = darkMode ? nightItems : dayItems

  return (
    <section id="moodboard" className="py-32 px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-4">Vibes</p>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-dark dark:text-cosmos-text">Moodboard</h2>
        <p className="text-sm text-taupe dark:text-cosmos-muted font-sans font-light mt-4">A collage of everything that makes me, me.</p>
      </motion.div>

      <Masonry breakpointCols={breakpoints} className="masonry-grid" columnClassName="masonry-grid_column">
        {items.map((item, i) => (
          <motion.div
            key={`${darkMode}-${i}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="mb-6 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-warm/15 dark:hover:shadow-nebula/10 transition-all duration-500"
          >
            <Card item={item} dark={darkMode} />
          </motion.div>
        ))}
      </Masonry>
    </section>
  )
}
