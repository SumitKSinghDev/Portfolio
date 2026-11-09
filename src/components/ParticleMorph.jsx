import React, { useEffect, useRef, useState } from 'react'

export default function ParticleMorph({ activeShape = 'SUMIT', isDark = true }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationFrameRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 120 })

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
      generateTargets(activeShape)
    }
    window.addEventListener('resize', handleResize)

    // Helper to generate text targets from offscreen canvas
    const sampleTextPoints = (text, fontSize, fontColor) => {
      const offCanvas = document.createElement('canvas')
      offCanvas.width = width
      offCanvas.height = height
      const offCtx = offCanvas.getContext('2d')
      offCtx.font = `900 ${fontSize}px 'Plus Jakarta Sans', system-ui, sans-serif`
      offCtx.textAlign = 'center'
      offCtx.textBaseline = 'middle'
      offCtx.fillStyle = '#ffffff'
      offCtx.fillText(text, width / 2, height / 2 - 40)

      const imgData = offCtx.getImageData(0, 0, width, height).data
      const points = []
      const step = Math.max(4, Math.floor(width / 260))

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4
          if (imgData[index + 3] > 128) {
            points.push({ x, y, color: fontColor })
          }
        }
      }
      return points
    }

    // Helper to generate Neural Graph points
    const generateNeuralPoints = () => {
      const points = []
      const centerX = width / 2
      const centerY = height / 2 - 40
      const layers = [4, 7, 9, 7, 4]
      const layerSpacing = Math.min(width * 0.7, 500) / (layers.length - 1)

      layers.forEach((nodeCount, lIndex) => {
        const lx = centerX - (layers.length - 1) * 0.5 * layerSpacing + lIndex * layerSpacing
        const vSpacing = Math.min(height * 0.5, 320) / (nodeCount + 1)
        for (let i = 1; i <= nodeCount; i++) {
          const ly = centerY - (nodeCount + 1) * 0.5 * vSpacing + i * vSpacing
          // Add main node cluster
          points.push({ x: lx, y: ly, color: '#00f0ff', isNode: true })
          // Add smaller surrounding satellites
          for (let s = 0; s < 12; s++) {
            const angle = (s / 12) * Math.PI * 2
            const r = 10 + Math.random() * 14
            points.push({
              x: lx + Math.cos(angle) * r,
              y: ly + Math.sin(angle) * r,
              color: '#9d00ff',
              isNode: false,
            })
          }
        }
      })
      return points
    }

    // Initialize or update particle target positions
    const generateTargets = (shape) => {
      let targets = []
      if (shape === 'SUMIT') {
        const fSize = Math.min(width * 0.18, 140)
        targets = sampleTextPoints('SUMIT', fSize, '#00f0ff')
      } else if (shape === 'PORTFOLIO') {
        const fSize = Math.min(width * 0.14, 110)
        targets = sampleTextPoints('PORTFOLIO', fSize, '#a855f7')
      } else if (shape === 'AI_ML') {
        const fSize = Math.min(width * 0.15, 120)
        targets = sampleTextPoints('AI • SDE', fSize, '#38bdf8')
      } else {
        targets = generateNeuralPoints()
      }

      // If particles array doesn't exist, create pool
      const poolSize = Math.max(targets.length, 1200)
      if (particlesRef.current.length < poolSize) {
        const diff = poolSize - particlesRef.current.length
        for (let i = 0; i < diff; i++) {
          particlesRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0,
            vy: 0,
            tx: width / 2,
            ty: height / 2,
            size: 1.2 + Math.random() * 1.8,
            color: '#00f0ff',
            alpha: 0.6 + Math.random() * 0.4,
            noiseOffset: Math.random() * 100,
          })
        }
      }

      // Assign targets to particles
      particlesRef.current.forEach((p, idx) => {
        if (idx < targets.length) {
          p.tx = targets[idx].x
          p.ty = targets[idx].y
          p.color = targets[idx].color || '#00f0ff'
        } else {
          // Extra particles float in background cosmos
          const angle = Math.random() * Math.PI * 2
          const dist = 180 + Math.random() * (width / 2)
          p.tx = width / 2 + Math.cos(angle) * dist
          p.ty = height / 2 + Math.sin(angle) * dist * 0.6
          p.color = isDark ? '#1e293b' : '#cbd5e1'
        }
      })
    }

    generateTargets(activeShape)

    // Animation Loop
    let time = 0
    const render = () => {
      time += 0.02
      ctx.clearRect(0, 0, width, height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mRadius = mouseRef.current.radius

      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Spring force towards target
        const dx = p.tx - p.x
        const dy = p.ty - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Mouse repulsion force
        const mdx = p.x - mx
        const mdy = p.y - my
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)

        if (mDist < mRadius) {
          const force = (1 - mDist / mRadius) * 8
          p.vx += (mdx / mDist) * force
          p.vy += (mdy / mDist) * force
        }

        // Float noise
        const noiseX = Math.sin(time + p.noiseOffset) * 0.4
        const noiseY = Math.cos(time + p.noiseOffset) * 0.4

        p.vx += dx * 0.04 + noiseX
        p.vy += dy * 0.04 + noiseY

        // Friction / dampening
        p.vx *= 0.85
        p.vy *= 0.85

        p.x += p.vx
        p.y += p.vy

        // Draw particle
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1.0
      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [activeShape, isDark])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
