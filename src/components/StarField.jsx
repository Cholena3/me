import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../store'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function StarField() {
  const { darkMode } = useApp()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (e) => { await loadSlim(e) }).then(() => setReady(true))
  }, [])

  const options = useMemo(() => ({
    fullScreen: false,
    background: { color: 'transparent' },
    particles: {
      number: { value: 80, density: { enable: true, area: 1500 } },
      color: { value: ['#ffffff', '#C4B5FD', '#93C5FD', '#FCD34D'] },
      shape: { type: 'circle' },
      opacity: { value: { min: 0.15, max: 0.8 }, animation: { enable: true, speed: 0.4, minimumValue: 0.05 } },
      size: { value: { min: 0.5, max: 2 }, animation: { enable: true, speed: 0.8, minimumValue: 0.3 } },
      move: { enable: true, speed: 0.15, direction: 'none', random: true, outModes: 'out' },
      links: { enable: false },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: 'grab' } },
      modes: { grab: { distance: 120, links: { opacity: 0.2, color: '#A78BFA' } } },
    },
    detectRetina: true,
  }), [])

  if (!darkMode) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080F] via-[#0C0F22] to-[#07080F]" />

      {/* NEBULA CLOUDS — high opacity, very visible */}
      <div className="nebula-cloud absolute w-[800px] h-[800px] -top-[15%] -left-[10%] rounded-full bg-purple-600 opacity-[0.22] blur-[100px]" style={{ animation: 'nebDrift1 16s ease-in-out infinite' }} />
      <div className="nebula-cloud absolute w-[700px] h-[700px] top-[25%] -right-[15%] rounded-full bg-indigo-500 opacity-[0.15] blur-[100px]" style={{ animation: 'nebDrift2 20s ease-in-out infinite' }} />
      <div className="nebula-cloud absolute w-[600px] h-[600px] bottom-[0%] left-[15%] rounded-full bg-blue-500 opacity-[0.12] blur-[90px]" style={{ animation: 'nebDrift1 18s ease-in-out infinite', animationDelay: '4s' }} />
      <div className="nebula-cloud absolute w-[500px] h-[500px] top-[45%] left-[40%] rounded-full bg-fuchsia-600 opacity-[0.10] blur-[90px]" style={{ animation: 'nebDrift2 22s ease-in-out infinite', animationDelay: '6s' }} />
      <div className="nebula-cloud absolute w-[400px] h-[400px] top-[10%] right-[20%] rounded-full bg-emerald-500 opacity-[0.07] blur-[80px]" style={{ animation: 'nebDrift1 14s ease-in-out infinite', animationDelay: '8s' }} />

      {/* AURORA BAND */}
      <div className="absolute top-0 left-0 right-0 h-[350px]" style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(124,58,237,0.12) 30%, rgba(52,211,153,0.08) 60%, transparent 100%)',
        animation: 'auroraShift 10s ease-in-out infinite',
      }} />

      {/* tsParticles — pointer-events only on this layer */}
      {ready && (
        <div className="absolute inset-0 pointer-events-auto" style={{ zIndex: 2 }}>
          <Particles id="starfield" options={options} className="w-full h-full" />
        </div>
      )}

      {/* METEORS — falling from top-right to bottom-left */}
      <div className="meteor" style={{ top: '-5%', left: '70%', animationDelay: '0s' }} />
      <div className="meteor" style={{ top: '-5%', left: '85%', animationDelay: '3.5s' }} />
      <div className="meteor" style={{ top: '-5%', left: '50%', animationDelay: '7s' }} />
      <div className="meteor" style={{ top: '-5%', left: '90%', animationDelay: '11s' }} />
      <div className="meteor" style={{ top: '-5%', left: '30%', animationDelay: '15s' }} />
      <div className="meteor" style={{ top: '-5%', left: '60%', animationDelay: '19s' }} />
      <div className="meteor" style={{ top: '-5%', left: '40%', animationDelay: '23s', animationDuration: '3s' }} />

      {/* CONSTELLATIONS */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 3, opacity: 0.15 }}>
        {[
          [[12,15],[18,10],[25,18],[22,28],[15,25]],
          [[65,8],[72,12],[78,8],[82,15],[75,20]],
          [[40,70],[48,65],[55,72],[50,80],[42,78]],
        ].map((pts, ci) => (
          <g key={ci}>
            {pts.map((p, pi) => {
              if (pi === 0) return null
              const prev = pts[pi - 1]
              return <line key={`l${ci}${pi}`} x1={`${prev[0]}%`} y1={`${prev[1]}%`} x2={`${p[0]}%`} y2={`${p[1]}%`} stroke="#A78BFA" strokeWidth="0.6" strokeDasharray="4 4">
                <animate attributeName="opacity" values="0.15;0.5;0.15" dur="5s" begin={`${ci * 2}s`} repeatCount="indefinite" />
              </line>
            })}
            {pts.map((p, pi) => (
              <circle key={`c${ci}${pi}`} cx={`${p[0]}%`} cy={`${p[1]}%`} r="2" fill="#C4B5FD">
                <animate attributeName="r" values="1.5;3.5;1.5" dur="3s" begin={`${ci * 2 + pi * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.9;0.2" dur="3s" begin={`${ci * 2 + pi * 0.4}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        ))}
      </svg>

      {/* PLANETS with strong glow */}
      <motion.div animate={{ y: [0, -10, 0], x: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[16%] right-[10%] w-7 h-7 rounded-full" style={{ zIndex: 4, background: 'radial-gradient(circle at 30% 30%, #DDD6FE, #7C3AED)', boxShadow: '0 0 25px 8px rgba(124,58,237,0.35), 0 0 60px 15px rgba(124,58,237,0.1)' }} />
      <motion.div animate={{ y: [0, 8, 0], x: [0, -6, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-[22%] left-[7%] w-5 h-5 rounded-full" style={{ zIndex: 4, background: 'radial-gradient(circle at 30% 30%, #FEF3C7, #F59E0B)', boxShadow: '0 0 20px 6px rgba(245,158,11,0.3), 0 0 50px 12px rgba(245,158,11,0.08)' }} />
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute top-[52%] right-[28%] w-6 h-6 rounded-full" style={{ zIndex: 4, background: 'radial-gradient(circle at 30% 30%, #BFDBFE, #3B82F6)', boxShadow: '0 0 20px 6px rgba(59,130,246,0.3), 0 0 50px 12px rgba(59,130,246,0.08)' }} />
      <motion.div animate={{ y: [0, 5, 0], x: [0, -4, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        className="absolute top-[72%] left-[55%] w-4 h-4 rounded-full" style={{ zIndex: 4, background: 'radial-gradient(circle at 30% 30%, #A7F3D0, #059669)', boxShadow: '0 0 16px 5px rgba(52,211,153,0.25), 0 0 40px 10px rgba(52,211,153,0.06)' }} />
    </div>
  )
}
