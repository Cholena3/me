import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../store'
import { FiX } from 'react-icons/fi'

export default function PhotoModal() {
  const { selectedPhoto, setSelectedPhoto } = useApp()
  return (
    <AnimatePresence>
      {selectedPhoto && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 modal-backdrop bg-slate-dark/20 dark:bg-cosmos/40"
          onClick={() => setSelectedPhoto(null)}>
          <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }}
            className="bg-surface dark:bg-cosmos-card rounded-card overflow-hidden max-w-3xl w-full max-h-[90vh] shadow-2xl flex flex-col md:flex-row border border-warm/10 dark:border-cosmos-border"
            onClick={e => e.stopPropagation()}>
            <div className="md:w-3/5 flex-shrink-0 bg-champagne-light dark:bg-cosmos-surface">
              <img src={selectedPhoto.src} alt={selectedPhoto.caption} className="w-full h-64 md:h-full object-cover" />
            </div>
            <div className="p-8 flex flex-col justify-between md:w-2/5">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] tracking-[0.2em] text-taupe dark:text-cosmos-muted uppercase font-sans">{selectedPhoto.tag}</span>
                  <button onClick={() => setSelectedPhoto(null)} className="p-1 rounded-btn hover:bg-champagne dark:hover:bg-cosmos-surface transition-colors" aria-label="Close">
                    <FiX className="w-4 h-4 text-taupe dark:text-cosmos-muted" />
                  </button>
                </div>
                <h3 className="font-serif text-xl text-slate-dark dark:text-cosmos-text leading-snug mb-4">{selectedPhoto.caption}</h3>
                <p className="text-xs text-taupe dark:text-cosmos-muted font-sans mb-6">{selectedPhoto.date}</p>
                {selectedPhoto.notes && (
                  <p className="text-sm text-slate dark:text-cosmos-muted font-sans font-light leading-relaxed border-l-2 border-rose dark:border-nebula pl-4">{selectedPhoto.notes}</p>
                )}
              </div>
              <div className="mt-8 pt-5 border-t border-warm/20 dark:border-cosmos-border">
                <p className="text-[10px] text-taupe/40 dark:text-cosmos-muted/30 font-sans tracking-wide">from the collection</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
