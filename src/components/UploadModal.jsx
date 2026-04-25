import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { useApp } from '../store'
import { uploadImage } from '../supabase'
import { FiX, FiUpload, FiImage, FiLoader } from 'react-icons/fi'

const tags = ['life', 'college', 'friends', 'personal', 'achievements']

export default function UploadModal() {
  const { showUpload, setShowUpload, addPhoto } = useApp()
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [tag, setTag] = useState('life')
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (f) {
      setFile(f)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(f)
    }
  }

  const handleSubmit = async () => {
    if (!preview || !caption) return
    setUploading(true)

    let src = preview // fallback to base64
    try {
      // Try Supabase upload first
      if (file) {
        src = await uploadImage(file)
      }
    } catch (e) {
      // Supabase not configured or failed — use base64 fallback
      console.warn('Supabase upload failed, using local storage:', e.message)
    }

    addPhoto({ src, caption, tag, notes, date })
    setPreview(null); setFile(null); setCaption(''); setNotes(''); setTag('life')
    setUploading(false)
    setShowUpload(false)
  }

  const ic = 'w-full px-4 py-3 rounded-btn border border-warm/30 dark:border-cosmos-border focus:border-rose dark:focus:border-nebula focus:outline-none text-sm font-sans bg-champagne-light/20 dark:bg-cosmos/50 dark:text-cosmos-text font-light transition-colors'

  return (
    <AnimatePresence>
      {showUpload && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop bg-slate-dark/20 dark:bg-cosmos/40"
          onClick={() => setShowUpload(false)}>
          <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }}
            className="bg-surface dark:bg-cosmos-card rounded-card p-8 max-w-md w-full shadow-2xl border border-warm/10 dark:border-cosmos-border"
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl text-slate-dark dark:text-cosmos-text">Add a moment</h3>
              <button onClick={() => setShowUpload(false)} className="p-1 rounded-btn hover:bg-champagne dark:hover:bg-cosmos-surface" aria-label="Close">
                <FiX className="w-4 h-4 text-taupe dark:text-cosmos-muted" />
              </button>
            </div>
            <div onClick={() => fileRef.current?.click()} className="border border-dashed border-warm/40 dark:border-cosmos-border rounded-card p-6 text-center cursor-pointer hover:border-rose-light dark:hover:border-nebula/40 transition-all duration-300 mb-4">
              {preview ? <img src={preview} alt="Preview" className="w-full h-44 object-cover rounded-btn" /> : (
                <div className="flex flex-col items-center gap-2 text-taupe dark:text-cosmos-muted py-4">
                  <FiImage className="w-6 h-6" /><p className="text-xs font-sans">Click to upload</p>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </div>
            <input type="text" placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} className={`${ic} mb-3`} />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className={`${ic} mb-3`} />
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(t => (
                <button key={t} onClick={() => setTag(t)}
                  className={`px-3 py-1.5 rounded-btn text-[11px] font-sans tracking-[0.05em] uppercase transition-all ${
                    tag === t ? 'bg-rose dark:bg-nebula text-white' : 'border border-warm/30 dark:border-cosmos-border text-taupe dark:text-cosmos-muted hover:text-rose-dark dark:hover:text-nebula-light'
                  }`}>{t}</button>
              ))}
            </div>
            <textarea placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} rows={2} className={`${ic} mb-5 resize-none`} />
            <button onClick={handleSubmit} disabled={!preview || !caption || uploading}
              className="w-full py-3 rounded-btn bg-slate-dark dark:bg-nebula text-white text-[11px] font-sans tracking-[0.1em] uppercase hover:bg-rose dark:hover:bg-nebula/80 transition-colors disabled:opacity-30 flex items-center justify-center gap-2">
              {uploading ? <><FiLoader className="w-3.5 h-3.5 animate-spin" /> Uploading...</> : <><FiUpload className="w-3.5 h-3.5" /> Add to wall</>}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
