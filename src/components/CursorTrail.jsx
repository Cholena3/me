import { useEffect, useRef } from 'react'
import { useApp } from '../store'

export default function CursorTrail() {
  const { darkMode } = useApp()
  const canvasRef = useRef(null)
  const particles = useRef([])
  const raf = useRef(null)

  useEffect(() => {
    if (!darkMode) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#C4B5FD', '#A78BFA', '#818CF8', '#FCD34D', '#93C5FD', '#FFFFFF']

    const spawn = (x, y, count = 2) => {
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1,
          decay: 0.015 + Math.random() * 0.01,
          size: 1 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const onMove = (e) => spawn(e.clientX, e.clientY)
    const onTouch = (e) => {
      const t = e.touches[0]
      if (t) spawn(t.clientX, t.clientY, 4)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current = particles.current.filter(p => p.life > 0)
      for (const p of particles.current) {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay; p.size *= 0.98
        ctx.save()
        ctx.globalAlpha = p.life * 0.7
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf.current)
      particles.current = []
    }
  }, [darkMode])

  if (!darkMode) return null
  return <canvas ref={canvasRef} className="fixed inset-0 z-[60] pointer-events-none" style={{ mixBlendMode: 'screen' }} />
}
