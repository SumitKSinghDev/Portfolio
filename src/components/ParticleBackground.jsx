import React, { useEffect, useRef } from 'react'

export default function ParticleBackground({ activeMode = 'STARS' }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 140 })
  const animFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = canvas.parentElement.clientWidth)
    let height = (canvas.height = canvas.parentElement.clientHeight)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
      initParticles()
    }
    window.addEventListener('resize', handleResize)

    const sampleTextPoints = (text, fontSize) => {
      const off = document.createElement('canvas')
      off.width = width
      off.height = height
      const offCtx = off.getContext('2d')
      offCtx.font = `800 ${fontSize}px 'Plus Jakarta Sans', system-ui, sans-serif`
      offCtx.textAlign = 'center'
      offCtx.textBaseline = 'middle'
      offCtx.fillStyle = '#ffffff'
      offCtx.fillText(text, width / 2, height / 2 - 50)

      const data = offCtx.getImageData(0, 0, width, height).data
      const points = []
      const step = Math.max(5, Math.floor(width / 220))

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4
          if (data[idx + 3] > 140) {
            points.push({ x, y })
          }
        }
      }
      return points
    }

    const initParticles = () => {
      let targets = []
      if (activeMode === 'SUMIT') {
        targets = sampleTextPoints('SUMIT', Math.min(width * 0.16, 130))
      } else if (activeMode === 'PORTFOLIO') {
        targets = sampleTextPoints('PORTFOLIO', Math.min(width * 0.13, 105))
      }

      const total = Math.max(targets.length, 650)
      if (particlesRef.current.length < total) {
        const diff = total - particlesRef.current.length
        for (let i = 0; i < diff; i++) {
          particlesRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            tx: null,
            ty: null,
            size: Math.random() < 0.2 ? 1.8 : 0.9 + Math.random() * 0.7,
            baseAlpha: 0.25 + Math.random() * 0.45,
            glow: Math.random() < 0.15,
          })
        }
      }

      particlesRef.current.forEach((p, idx) => {
        if (targets.length > 0 && idx < targets.length) {
          p.tx = targets[idx].x
          p.ty = targets[idx].y
        } else {
          p.tx = null
          p.ty = null
        }
      })
    }

    initParticles()

    let time = 0
    const render = () => {
      time += 0.008
      ctx.clearRect(0, 0, width, height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mRad = mouseRef.current.radius

      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (p.tx !== null && p.ty !== null) {
          // Guided morph mode
          const dx = p.tx - p.x
          const dy = p.ty - p.y
          p.vx = p.vx * 0.86 + dx * 0.035
          p.vy = p.vy * 0.86 + dy * 0.035
        } else {
          // Ambient organic drift
          p.vx += Math.sin(time + i) * 0.005
          p.vy += Math.cos(time + i) * 0.005
          p.vx *= 0.98
          p.vy *= 0.98

          // Wrap edges
          if (p.x < 0) p.x = width
          if (p.x > width) p.x = 0
          if (p.y < 0) p.y = height
          if (p.y > height) p.y = 0
        }

        // Mouse gravitational interaction
        const mdx = p.x - mx
        const mdy = p.y - my
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mDist < mRad) {
          const factor = (1 - mDist / mRad) * 4
          p.vx += (mdx / mDist) * factor
          p.vy += (mdy / mDist) * factor
        }

        p.x += p.vx
        p.y += p.vy

        // Draw refined celestial particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)

        if (p.glow) {
          ctx.fillStyle = '#38bdf8'
          ctx.globalAlpha = p.baseAlpha * 1.4
        } else {
          ctx.fillStyle = '#94a3b8'
          ctx.globalAlpha = p.baseAlpha
        }
        ctx.fill()
      }

      ctx.globalAlpha = 1.0
      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [activeMode])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
