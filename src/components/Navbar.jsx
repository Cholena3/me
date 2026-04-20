import { motion } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Photos', href: '#photos' },
  { label: 'Moodboard', href: '#moodboard' },
  { label: 'Timeline', href: '#memories' },
  { label: 'Thoughts', href: '#thoughts' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-base/85 dark:bg-cosmos/85 backdrop-blur-md border-b border-warm/30 dark:border-cosmos-border/50 transition-colors duration-700"
    >
      <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
        <a href="#" className="font-serif text-xl tracking-wide text-slate-dark dark:text-nebula-soft">
          Cho
        </a>
        <div className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-[11px] font-sans text-taupe dark:text-cosmos-muted hover:text-rose dark:hover:text-nebula-light transition-colors duration-300 tracking-[0.15em] uppercase"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
