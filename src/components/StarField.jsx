import { useMemo } from 'react'
import { useApp } from '../store'

function randomBetween(a, b) {
  return Math.random() * (b - a) + a
}

export default function StarField() {
  const { darkMode } = useApp()

  const stars = useMemo(() => {
    const arr = []
    for (let i = 0; i < 120; i++) {
      const size = Math.random() < 0.6 ? 'star-sm' : Math.random() < 0.8 ? 'star-md' : 'star-lg'
      const isGold = Math.random() < 0.08
      arr.push({
        id: i,
        top: `${randomBetween(0, 100)}%`,
        left: `${randomBetween(0, 100)}%`,
        cls: `${size} ${isGold ? 'star-gold' : ''}`,
        delay: `${randomBetween(0, 5)}s`,
      })
    }
    return arr
  }, [])

  if (!darkMode) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Nebula blobs */}
      <div className="nebula-blob w-[500px] h-[500px] bg-purple-600/15 top-[10%] left-[5%]" />
      <div className="nebula-blob w-[400px] h-[400px] bg-indigo-500/10 top-[50%] right-[10%]" style={{ animationDelay: '3s' }} />
      <div className="nebula-blob w-[350px] h-[350px] bg-blue-500/8 bottom-[10%] left-[30%]" style={{ animationDelay: '6s' }} />
      <div className="nebula-blob w-[300px] h-[300px] bg-emerald-500/5 top-[30%] right-[30%]" style={{ animationDelay: '4s' }} />

      {/* Stars */}
      {stars.map(s => (
        <div
          key={s.id}
          className={`star ${s.cls}`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}

      {/* Shooting stars */}
      <div className="shooting-star" style={{ top: '15%', left: '20%', animationDelay: '0s', animationDuration: '2.5s' }} />
      <div className="shooting-star" style={{ top: '35%', left: '60%', animationDelay: '4s', animationDuration: '2s' }} />
      <div className="shooting-star" style={{ top: '65%', left: '10%', animationDelay: '8s', animationDuration: '3s' }} />
    </div>
  )
}
