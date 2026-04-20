import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const socials = [
  { icon: <FiLinkedin />, label: 'LinkedIn', href: '#' },
  { icon: <FiGithub />, label: 'GitHub', href: '#' },
  { icon: <FiMail />, label: 'Email', href: '#' },
]

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-8 max-w-xl mx-auto text-center">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-4">Connect</p>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-dark dark:text-cosmos-text dark:glow-text mb-4">Get in touch</h2>
        <p className="text-sm text-taupe dark:text-cosmos-muted font-sans font-light mb-12">Open to conversations about projects, ideas, or just a hello.</p>

        <div className="flex justify-center gap-4">
          {socials.map((s, i) => (
            <motion.a key={s.label} href={s.href} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="w-12 h-12 rounded-card bg-surface dark:bg-cosmos-card border border-warm/20 dark:border-cosmos-border flex items-center justify-center text-taupe dark:text-cosmos-muted hover:bg-rose hover:text-white hover:border-rose dark:hover:bg-nebula dark:hover:text-white dark:hover:border-nebula transition-all duration-300 glass-card glow-border"
              aria-label={s.label}>
              <span className="text-lg">{s.icon}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="mt-28">
        <div className="editorial-line mb-8" />
        <p className="text-[10px] text-taupe/40 dark:text-cosmos-muted/30 font-sans tracking-[0.2em] uppercase">Cho — 2025</p>
      </motion.div>
    </section>
  )
}
