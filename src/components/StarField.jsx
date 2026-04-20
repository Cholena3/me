import { useCallback, useMemo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../store'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

function rand(a, b) { return Math.random() * (b - a) + a }

export default function StarField() {
  const { darkMode } = useApp()
  const [engineReady, setEngineReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setEngineReady(true))
  }, [])

  const particleOptions = useMemo(() => ({
    fullScreen: false,
    background: { color: 'transparent' },
    particles: {
      number: { value: 140, density: { enable: true, area: 1200 } },
      color: {
        value: ['#ffffff', '#C4B5FD', '#93C5FD', '#FCD34D', '#A78BFA'],
      },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.1, max: 0.8 },
        animation: { enable: true, speed: 0.8, minimumValue: 0.05, sync: false },
      },
      size: {
        value: { min: 0.5, max: 2.5 },
        animation: { enable: true, speed: 1.5, minimumValue: 0.3, sync: false },
      },
      move: {
        enable: true,
        speed: 0.3,
        direction: 'none',
        random: true,
        straight: false,
        outModes: 'out',
      },
      links: {
        enable: true,
        distance: 120,
        color: '#7C3AED',
        opacity: 0.08,
        width: 0.5,
      },
      interactivity: {},
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        grab: { distance: 150, links: { opacity: 0.25, color: '#A78BFA' } },
        push: { quantity: 3 },
      },
    },
    detectRetina: true,
  }), [])

  // Constellation SVG overlay
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

      {/* tsParticles — interactive mouse-reactive stars */}
      {engineReady && (
        <div className="absolute inset-0 pointer-events-auto">
          <Particles id="starfield" options={particleOptions} className="w-full h-full" />
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

      {/* Shooting stars */}
      {[
        { top: '12%', left: '15%', delay: '0s', dur: '2.5s', angle: '35deg' },
        { top: '30%', left: '55%', delay: '5s', dur: '2s', angle: '40deg' },
        { top: '60%', left: '8%', delay: '9s', dur: '3s', angle: '30deg' },
        { top: '20%', left: '75%', delay: '13s', dur: '2.2s', angle: '45deg' },
      ].map((s, i) => (
        <div key={`shoot-${i}`} className="absolute w-[2px] h-[2px] bg-white rounded-full"
          style={{
            top: s.top, left: s.left,
            boxShadow: '-20px 0 10px 1px rgba(255,255,255,0.15), -50px 0 20px 2px rgba(255,255,255,0.05)',
            transform: `rotate(${s.angle})`,
            animation: `shootingStar ${s.dur} ease-out infinite`, animationDelay: s.delay,
          }} />
      ))}

      {/* Floating planets */}
      <motion.div animate={{ y: [0, -6, 0], x: [0, 3, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[18%] right-[12%] w-5 h-5 rounded-full"
        style={{ background: 'radial-gradient(circle at 35% 35%, #C4B5FD, #7C3AED)', boxShadow: '0 0 15px 4px rgba(124,58,237,0.25)' }} />
      <motion.div animate={{ y: [0, 5, 0], x: [0, -4, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[25%] left-[8%] w-3 h-3 rounded-full"
        style={{ background: 'radial-gradient(circle at 35% 35%, #FDE68A, #F59E0B)', boxShadow: '0 0 12px 3px rgba(245,158,11,0.2)' }} />
      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[55%] right-[30%] w-4 h-4 rounded-full"
        style={{ background: 'radial-gradient(circle at 30% 30%, #93C5FD, #3B82F6)', boxShadow: '0 0 12px 3px rgba(59,130,246,0.2)' }} />
    </div>
  )
}
