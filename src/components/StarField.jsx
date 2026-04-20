import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../store'

function rand(a, b) { return Math.random() * (b - a) + a }

export default function StarField() {
  const { darkMode } = useApp()

  const stars = useMemo(() => {
    const arr = []
    for (let i = 0; i < 180; i++) {
      const r = Math.random()
      const size = r < 0.55 ? 1 : r < 0.85 ? 2 : 3
      arr.push({
        id: i,
        top: `${rand(0, 100)}%`,
        left: `${rand(0, 100)}%`,
        size,
        gold: Math.random() < 0.07,
        blue: Math.random() < 0.05,
        delay: rand(0, 6),
        dur: rand(2, 6),
      })
    }
    return arr
  }, [])

  // Constellation points (connected dots)
  const constellations = useMemo(() => [
    { points: [[12,15],[18,10],[25,18],[22,28],[15,25]], delay: 0 },
    { points: [[65,8],[72,12],[78,8],[82,15],[75,20]], delay: 2 },
    { points: [[40,70],[48,65],[55,72],[50,80],[42,78]], delay: 4 },
  ], [])

  if (!darkMode) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep space gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D17] via-[#0F1129] to-[#0B0D17]" />

      {/* Nebula clouds — large, colorful, animated */}
      <div className="absolute w-[700px] h-[700px] top-[-10%] left-[-5%] rounded-full bg-purple-700/[0.12] blur-[120px]"
        style={{ animation: 'nebPulse1 14s ease-in-out infinite' }} />
      <div className="absolute w-[600px] h-[600px] top-[30%] right-[-10%] rounded-full bg-indigo-500/[0.08] blur-[120px]"
        style={{ animation: 'nebPulse2 18s ease-in-out infinite' }} />
      <div className="absolute w-[500px] h-[500px] bottom-[5%] left-[20%] rounded-full bg-blue-600/[0.07] blur-[100px]"
        style={{ animation: 'nebPulse1 16s ease-in-out infinite', animationDelay: '3s' }} />
      <div className="absolute w-[400px] h-[400px] top-[50%] left-[50%] -translate-x-1/2 rounded-full bg-pink-600/[0.06] blur-[100px]"
        style={{ animation: 'nebPulse2 20s ease-in-out infinite', animationDelay: '5s' }} />
      <div className="absolute w-[350px] h-[350px] top-[10%] right-[25%] rounded-full bg-emerald-500/[0.04] blur-[80px]"
        style={{ animation: 'nebPulse1 12s ease-in-out infinite', animationDelay: '7s' }} />

      {/* Aurora wave at top */}
      <div className="absolute top-0 left-0 right-0 h-[300px] opacity-30"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.08), rgba(52,211,153,0.05), transparent)',
          animation: 'auroraShift 10s ease-in-out infinite',
        }}
      />

      {/* Rotating galaxy ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.04]"
        style={{ animation: 'galaxySpin 120s linear infinite' }}>
        <div className="w-full h-full rounded-full border border-white/30"
          style={{ borderWidth: '1px 2px 1px 0.5px', borderRadius: '50%', transform: 'rotateX(70deg)' }} />
        <div className="absolute inset-[15%] rounded-full border border-white/20"
          style={{ borderWidth: '0.5px 1.5px 0.5px 0.5px', borderRadius: '50%', transform: 'rotateX(70deg)' }} />
      </div>

      {/* Stars — multi-layer */}
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.gold ? '#FCD34D' : s.blue ? '#93C5FD' : 'white',
            boxShadow: s.size === 3
              ? `0 0 ${s.gold ? '8px 2px rgba(252,211,77,0.4)' : s.blue ? '6px 2px rgba(147,197,253,0.3)' : '6px 1px rgba(255,255,255,0.3)'}`
              : 'none',
            animation: `twinkle${s.size === 1 ? 'Fast' : s.size === 2 ? 'Med' : 'Slow'} ${s.dur}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Constellations — connected glowing dots */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
        {constellations.map((c, ci) => (
          <g key={ci}>
            {/* Lines */}
            {c.points.map((p, pi) => {
              if (pi === 0) return null
              const prev = c.points[pi - 1]
              return (
                <line
                  key={`l${ci}-${pi}`}
                  x1={`${prev[0]}%`} y1={`${prev[1]}%`}
                  x2={`${p[0]}%`} y2={`${p[1]}%`}
                  stroke="white" strokeWidth="0.5" opacity="0.4"
                  strokeDasharray="4 4"
                >
                  <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" begin={`${c.delay}s`} repeatCount="indefinite" />
                </line>
              )
            })}
            {/* Dots */}
            {c.points.map((p, pi) => (
              <circle
                key={`d${ci}-${pi}`}
                cx={`${p[0]}%`} cy={`${p[1]}%`} r="2"
                fill="white" opacity="0.6"
              >
                <animate attributeName="r" values="1.5;3;1.5" dur="3s" begin={`${c.delay + pi * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" begin={`${c.delay + pi * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        ))}
      </svg>

      {/* Shooting stars — multiple with varied paths */}
      {[
        { top: '12%', left: '15%', delay: '0s', dur: '2.5s', angle: '35deg' },
        { top: '30%', left: '55%', delay: '5s', dur: '2s', angle: '40deg' },
        { top: '60%', left: '8%', delay: '9s', dur: '3s', angle: '30deg' },
        { top: '20%', left: '75%', delay: '13s', dur: '2.2s', angle: '45deg' },
        { top: '50%', left: '40%', delay: '17s', dur: '2.8s', angle: '25deg' },
      ].map((s, i) => (
        <div
          key={`shoot-${i}`}
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
          style={{
            top: s.top,
            left: s.left,
            boxShadow: '-20px 0 10px 1px rgba(255,255,255,0.15), -50px 0 20px 2px rgba(255,255,255,0.05)',
            transform: `rotate(${s.angle})`,
            animation: `shootingStar ${s.dur} ease-out infinite`,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* Floating planets */}
      <motion.div
        animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[18%] right-[12%] w-5 h-5 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #C4B5FD, #7C3AED)',
          boxShadow: '0 0 15px 4px rgba(124,58,237,0.25)',
        }}
      />
      <motion.div
        animate={{ y: [0, 5, 0], x: [0, -4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[25%] left-[8%] w-3 h-3 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #FDE68A, #F59E0B)',
          boxShadow: '0 0 12px 3px rgba(245,158,11,0.2)',
        }}
      />
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[55%] right-[30%] w-4 h-4 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #93C5FD, #3B82F6)',
          boxShadow: '0 0 12px 3px rgba(59,130,246,0.2)',
        }}
      />

      {/* Cosmic dust particles — tiny drifting dots */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`dust-${i}`}
          className="absolute w-[1px] h-[1px] bg-white/20 rounded-full"
          style={{
            top: `${rand(0, 100)}%`,
            left: `${rand(0, 100)}%`,
            animation: `dustDrift ${rand(15, 30)}s linear infinite`,
            animationDelay: `${rand(0, 10)}s`,
          }}
        />
      ))}
    </div>
  )
}
