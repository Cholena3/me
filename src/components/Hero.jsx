import { motion } from 'framer-motion'
import { useApp } from '../store'

export default function Hero() {
  const { darkMode } = useApp()

  return (
    <section className="relative min-h-screen flex items-center justify-center px-8">
      <div className="text-center z-10 max-w-2xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="text-taupe dark:text-cosmos-muted text-[10px] tracking-[0.4em] uppercase font-sans mb-10"
        >
          {darkMode ? 'a celestial space' : 'a personal space'}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-serif text-6xl md:text-8xl text-slate-dark dark:text-cosmos-text leading-[1.05]"
        >
          Cholena
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 h-px w-16 bg-dusty dark:bg-nebula/40 mx-auto"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="mt-8 font-serif italic text-2xl md:text-3xl text-rose dark:text-nebula-light leading-relaxed"
        >
          Carpe diem
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="mt-4 font-sans text-taupe dark:text-cosmos-muted text-sm font-light leading-relaxed"
        >
          {darkMode ? 'somewhere between the stars and the code' : 'quietly building something meaningful'}
        </motion.p>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.3 }}
          className="inline-block mt-14 px-8 py-3 border border-dusty dark:border-nebula/30 text-dusty-dark dark:text-nebula-soft text-[11px] font-sans tracking-[0.15em] uppercase rounded-btn hover:bg-rose hover:text-white hover:border-rose dark:hover:bg-nebula dark:hover:text-white dark:hover:border-nebula transition-all duration-500"
        >
          Explore
        </motion.a>
      </div>
    </section>
  )
}
