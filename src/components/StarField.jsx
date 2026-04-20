import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../store'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function StarField() {
  const { darkMode } = useApp()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  const options = useMemo(() => ({
    fullScreen: false,
    background: { color: 'transparent' },
    particles: {
      number: { value: 100, density: { enable: true, area: 1400 } },
      color: { value: ['#ffffff', '#C4B5FD', '#93C5FD', '#FCD34D'] },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.1, max: 0.7 },
        animation: { enable: true, speed: 0.5, minimumValue: 0.05, sync: false },
      },
      size: {
        value: { min: 0.5, max: 2 },
        animation: { enable: true, speed: 1, minimumValue: 0.3, sync: false },
      },
      move: {
        enable: true, speed: 0.2, direction: 'none',
        random: true, straight: false, outModes: 'out',
      },
      links: { enable: false },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
      },
      modes: {
        grab: { distance: 130, links: { opacity: 0.15, color: '#A78BFA' } },
      },
    },
    detectRetina: true,
  }), [])

  const constellations = useMemo(() => [
    { points: [[12,15],[18,10],[25,18],[22,28],[15,25]], delay: 0 },
    { points: [[65,8],[72,12],[78,8],[82,15],[75,20]], delay: 2 },
    { points: [[40,70],[48,65],[55,72],[50,80],[42,78]], delay: 4 },
  ], [])

  if (!darkMode) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D17] via-[#0F1129] to-[#0B0D17]" />

      {/* Nebula clouds */}
      <div className="absolute w-[700px] h-[700px] top-[-10%] left-[-5%] rounded-full bg-purple-700/[0.12] blur-[120px]"
        style={{ animation: 'nebPulse1 14s ease-in-out infinite' }} />
      <div className="absolute w-[600px] h-[600px] top-[30%] right-[-10%] rounded-full bg-indigo-500/[0.08] blur-[120px]"
        style={{ animation: 'nebPulse2 18s ease-in-out infinite' }} />
      <div className="absolute w-[500px] h-[500px] bottom-[5%] left-[20%] rounded-full bg-blue-600/[0.07] blur-[100px]"
        style={{ animation: 'nebPulse1 16s ease-in-out infinite', animationDelay: '3s' }} />
      <div className="absolute w-[400px] h-[400px] top-[50%] left-[50%] -translate-x-1/2 rounded-full bg-pink-600/[0.06] blur-[100px]"
        style={{ animation: 'nebPulse2 20s ease-in-out infinite', animationDelay: '5s' }} />

      {/* Aurora wave */}
      <div className="absolute top-0 left-0 right-0 h-[300px] opacity-30"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.08), rgba(52,211,153,0.05), transparent)',
          animation: 'auroraShift 10s ease-in-out infinite',
        }} />

      {/* tsParticles — interactive stars */}
      {ready && (
        <div className="absolute inset-0 pointer-events-auto">
          <Particles id="starfield" options={options} className="w-full h-full" />
        </div>
      )}

      {/* Constellation SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }}>
        {constellations.map((c, ci) => (
          <g key={ci}>
            {c.points.map((p, pi) => {
              if (pi === 0) return null
              const prev = c.points[pi - 1]
              return (
                <line key={`l${ci}-${pi}`} x1={`${prev[0]}%`} y1={`${prev[1]}%`} x2={`${p[0]}%`} y2={`${p[1]}%`}
                  stroke="white" strokeWidth="0.5" strokeDasharray="4 4">
                  <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" begin={`${c.delay}s`} repeatCount="indefinite" />
                </line>
              )
            })}
            {c.points.map((p, pi) => (
              <circle key={`d${ci}-${pi}`} cx={`${p[0]}%`} cy={`${p[1]}%`} r="2" fill="white">
                <animate attributeName="r" values="1.5;3;1.5" dur="3s" begin={`${c.delay + pi * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" begin={`${c.delay + pi * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        ))}
      </svg>

      {/* Floating planets */}
      <motion.div animate={{ y: [0, -8, 0], x: [0, 4, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[18%] right-[12%] w-6 h-6 rounded-full"
        style={{ background: 'radial-gradient(circle at 35% 35%, #C4B5FD, #7C3AED)', boxShadow: '0 0 20px 6px rgba(124,58,237,0.3)' }} />
      <motion.div animate={{ y: [0, 6, 0], x: [0, -5, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[25%] left-[8%] w-4 h-4 rounded-full"
        style={{ background: 'radial-gradient(circle at 35% 35%, #FDE68A, #F59E0B)', boxShadow: '0 0 16px 5px rgba(245,158,11,0.25)' }} />
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[55%] right-[30%] w-5 h-5 rounded-full"
        style={{ background: 'radial-gradient(circle at 30% 30%, #93C5FD, #3B82F6)', boxShadow: '0 0 16px 5px rgba(59,130,246,0.25)' }} />
      <motion.div animate={{ y: [0, 4, 0], x: [0, -3, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute top-[75%] left-[60%] w-3 h-3 rounded-full"
        style={{ background: 'radial-gradient(circle at 35% 35%, #34D399, #059669)', boxShadow: '0 0 12px 4px rgba(52,211,153,0.2)' }} />
    </div>
  )
}
