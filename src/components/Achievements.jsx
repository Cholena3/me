import { motion } from 'framer-motion'

const achievements = [
  { title: 'B.Tech — 3rd Year', desc: 'Computer Science. Building real technical depth.', accent: 'border-l-rose dark:border-l-nebula' },
  { title: 'GPA: 8.52', desc: 'Consistent effort, not perfection. Steady improvement.', accent: 'border-l-dusty dark:border-l-stellar' },
  { title: 'Hackathon Participation', desc: 'CTF events and competitive problem-solving under pressure.', accent: 'border-l-slate-light dark:border-l-nebula-soft' },
  { title: 'ITDA System', desc: 'Building a structured platform for project workflow management.', accent: 'border-l-rose-dark dark:border-l-nebula-light' },
]

export default function Achievements() {
  return (
    <section className="py-32 px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-4">Progress</p>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-dark dark:text-cosmos-text">Achievements</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`rounded-card p-7 border border-warm/20 dark:border-cosmos-border border-l-[3px] ${a.accent} bg-surface dark:bg-cosmos-card hover:shadow-md hover:shadow-warm/10 dark:hover:shadow-nebula/5 transition-all duration-500`}
          >
            <h3 className="font-serif text-base text-slate-dark dark:text-cosmos-text mb-2">{a.title}</h3>
            <p className="text-xs text-taupe dark:text-cosmos-muted font-sans font-light leading-relaxed">{a.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 rounded-card p-8 bg-slate-dark dark:bg-nebula/20 dark:border dark:border-nebula/20 text-white"
      >
        <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-sans mb-4">Currently building</p>
        <h3 className="font-serif text-xl mb-3">Work Management System for ITDA</h3>
        <p className="text-sm font-sans font-light leading-relaxed text-white/60 max-w-xl">
          A structured platform to track and manage project workflows across multiple levels.
        </p>
      </motion.div>
    </section>
  )
}
