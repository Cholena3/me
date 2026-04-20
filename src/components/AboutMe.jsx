import { motion } from 'framer-motion'

const favorites = [
  { category: 'Series', items: 'Friends · Vampire Diaries · Bridgerton' },
  { category: 'Music', items: 'Taylor Swift · Arijit Singh' },
  { category: 'Comfort', items: 'Home-made food · Chocolates · Coffee' },
  { category: 'Dream', items: 'Paris — someday, definitely' },
  { category: 'Love Language', items: "Efforts — show me, don't tell me" },
  { category: 'Zodiac', items: 'Aries ♈ — passionate, bold, always right' },
]

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

export default function AboutMe() {
  return (
    <section id="about" className="py-32 px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-4">About</p>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-dark dark:text-cosmos-text">Who I am</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mb-24"
      >
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
            <motion.span
              key={f}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="px-4 py-2 rounded-btn bg-champagne dark:bg-cosmos-card text-dusty-dark dark:text-cosmos-muted text-xs font-sans border border-dusty-light/50 dark:border-cosmos-border"
            >
              {f}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Favorites */}
      <div className="mb-24">
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-8">Favorites</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((f, i) => (
            <motion.div
              key={f.category}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-card p-6 bg-champagne-light dark:bg-cosmos-card border border-warm/20 dark:border-cosmos-border"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase font-sans mb-2 text-taupe dark:text-cosmos-muted opacity-60">{f.category}</p>
              <p className="text-sm font-sans leading-relaxed text-slate-dark dark:text-cosmos-text">{f.items}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Traits */}
      <div className="mb-24">
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-8">Traits</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {traits.map((t, i) => (
            <motion.span
              key={t}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-serif text-lg text-slate-dark dark:text-cosmos-text"
            >
              {t}
              {i < traits.length - 1 && <span className="text-dusty dark:text-cosmos-border ml-8">·</span>}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-8">Interests</p>
        <div className="flex flex-wrap gap-2">
          {interests.map((item, i) => (
            <motion.span
              key={item}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="px-4 py-2 rounded-btn border border-warm/40 dark:border-cosmos-border text-xs font-sans text-taupe dark:text-cosmos-muted hover:bg-rose/10 hover:text-rose-dark dark:hover:bg-nebula/10 dark:hover:text-nebula-light dark:hover:border-nebula/30 transition-all duration-300"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
