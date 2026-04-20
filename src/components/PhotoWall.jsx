import { motion, AnimatePresence } from 'framer-motion'
import Masonry from 'react-masonry-css'
import { useApp } from '../store'
import { FiPlus, FiImage } from 'react-icons/fi'

const filters = ['all', 'life', 'college', 'friends', 'personal', 'achievements']
const breakpoints = { default: 3, 1024: 3, 768: 2, 500: 1 }

export default function PhotoWall() {
  const { filteredPhotos, activeFilter, setActiveFilter, setSelectedPhoto, setShowUpload } = useApp()

  return (
    <section id="photos" className="py-32 px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="text-[10px] tracking-[0.3em] text-taupe dark:text-cosmos-muted uppercase font-sans mb-4">Collection</p>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-dark dark:text-cosmos-text dark:glow-text">Photo Wall</h2>
      </motion.div>

      <div className="flex flex-wrap items-center gap-2 mb-12">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-btn text-[11px] font-sans tracking-[0.1em] uppercase transition-all duration-300 ${
              activeFilter === f
                ? 'bg-rose dark:bg-nebula text-white'
                : 'border border-warm/40 dark:border-cosmos-border text-taupe dark:text-cosmos-muted hover:border-rose-light dark:hover:border-nebula/40 hover:text-rose-dark dark:hover:text-nebula-light'
            }`}
          >
            {f}
          </button>
        ))}
        <button
          onClick={() => setShowUpload(true)}
          className="px-4 py-2 rounded-btn text-[11px] font-sans tracking-[0.1em] uppercase bg-slate-dark dark:bg-nebula/20 dark:border dark:border-nebula/30 text-white dark:text-nebula-light flex items-center gap-1.5 hover:bg-rose dark:hover:bg-nebula transition-colors duration-300"
        >
          <FiPlus className="w-3 h-3" /> Add
        </button>
      </div>

      {filteredPhotos.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
          <div className="w-20 h-20 rounded-card bg-champagne dark:bg-cosmos-card flex items-center justify-center mx-auto mb-6">
            <FiImage className="w-8 h-8 text-dusty dark:text-nebula-soft" />
          </div>
          <p className="font-serif text-xl text-slate-dark dark:text-cosmos-text mb-2">No photos yet</p>
          <p className="text-sm text-taupe dark:text-cosmos-muted font-sans mb-8 font-light">Start adding your moments</p>
          <button
            onClick={() => setShowUpload(true)}
            className="px-6 py-3 rounded-btn text-[11px] font-sans tracking-[0.1em] uppercase bg-rose dark:bg-nebula text-white hover:bg-rose-dark dark:hover:bg-nebula/80 transition-colors duration-300"
          >
            Add your first photo
          </button>
        </motion.div>
      ) : (
        <Masonry breakpointCols={breakpoints} className="masonry-grid" columnClassName="masonry-grid_column">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, i) => (
              <motion.div
                key={photo.id} layout
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="mb-6 group cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative overflow-hidden rounded-card bg-surface dark:bg-cosmos-card hover:shadow-lg hover:shadow-warm/20 dark:hover:shadow-nebula/10 transition-all duration-600 glass-card glow-border">
                  <img src={photo.src} alt={photo.caption} className="w-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/60 dark:from-cosmos/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                    <div>
                      <p className="text-white text-xs font-sans">{photo.caption}</p>
                      <p className="text-white/50 text-[10px] mt-1 font-sans">{photo.date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </Masonry>
      )}
    </section>
  )
}
