import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../store'
import { FiShield, FiLogOut, FiX } from 'react-icons/fi'

export default function AdminToggle() {
  const { isAdmin, loginAdmin, logoutAdmin } = useApp()
  const [showLogin, setShowLogin] = useState(false)
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const handleLogin = () => {
    if (loginAdmin(pw)) { setShowLogin(false); setPw('') }
    else { setError(true); setTimeout(() => setError(false), 1500) }
  }

  if (isAdmin) {
    return (
      <button
        onClick={logoutAdmin}
        className="fixed top-20 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-btn bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-sans tracking-wide uppercase hover:bg-emerald-500/20 transition-all"
      >
        <FiShield className="w-3.5 h-3.5" /> Admin <FiLogOut className="w-3 h-3 ml-1" />
      </button>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowLogin(true)}
        className="fixed top-20 left-6 z-50 p-2.5 rounded-btn bg-surface/80 dark:bg-cosmos-card/60 backdrop-blur-md border border-warm/20 dark:border-cosmos-border/30 text-taupe dark:text-cosmos-muted hover:text-rose dark:hover:text-nebula-light transition-all opacity-30 hover:opacity-100"
        aria-label="Admin login"
      >
        <FiShield className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop bg-slate-dark/20 dark:bg-cosmos/40"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface dark:bg-cosmos-card rounded-card p-8 max-w-xs w-full shadow-2xl border border-warm/10 dark:border-cosmos-border"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-serif text-lg text-slate-dark dark:text-cosmos-text">Admin Login</h3>
                <button onClick={() => setShowLogin(false)}><FiX className="w-4 h-4 text-taupe" /></button>
              </div>
              <p className="text-xs text-taupe dark:text-cosmos-muted font-sans mb-4">Enter password to edit content.</p>
              <input
                type="password"
                placeholder="Password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className={`w-full px-4 py-2.5 rounded-btn border ${error ? 'border-red-300' : 'border-warm/30 dark:border-cosmos-border'} focus:border-rose dark:focus:border-nebula focus:outline-none text-sm font-sans bg-champagne-light/20 dark:bg-cosmos/50 dark:text-cosmos-text mb-4`}
              />
              {error && <p className="text-xs text-red-400 mb-3 font-sans">Wrong password</p>}
              <button
                onClick={handleLogin}
                className="w-full py-2.5 rounded-btn bg-slate-dark dark:bg-nebula/30 text-white text-[11px] font-sans tracking-[0.1em] uppercase hover:bg-rose dark:hover:bg-nebula transition-colors"
              >
                Login
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
