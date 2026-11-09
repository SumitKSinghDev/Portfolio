import React, { useEffect, useRef, useState } from 'react'
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  RotateCw,
  ShieldCheck,
  Cpu,
  Brain,
  Activity,
  Zap,
  CheckCircle2
} from 'lucide-react'
import { sound } from '../utils/audio'

const GLYPHS = '0123456789ABCDEF!@#$%&*?><'
const FULL_NAME = 'SUMIT KUMAR SINGH'

export default function HeroIntroLanding({ onEnter, onIntroComplete }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  const [revealedIndex, setRevealedIndex] = useState(-1)
  const [completeNameShown, setCompleteNameShown] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const [backgroundVisible, setBackgroundVisible] = useState(false)
  const [displayChars, setDisplayChars] = useState(
    Array(FULL_NAME.length).fill('')
  )

  // Start letter-by-letter counter sequence immediately on load
  const runSequence = () => {
    setRevealedIndex(-1)
    setCompleteNameShown(false)
    setImageVisible(false)
    setBackgroundVisible(false)

    let currentIndex = 0
    const totalChars = FULL_NAME.length

    // Scramble effect for the currently rolling character
    const scrambleInterval = setInterval(() => {
      setDisplayChars((prev) => {
        return FULL_NAME.split('').map((targetChar, idx) => {
          if (idx < currentIndex) {
            return targetChar // locked
          }
          if (idx === currentIndex) {
            return targetChar === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          }
          return '' // future
        })
      })
    }, 40)

    // Measured slower counter: ~125ms per letter for deliberate, dramatic rhythm
    const revealInterval = setInterval(() => {
      while (currentIndex < totalChars && FULL_NAME[currentIndex] === ' ') {
        currentIndex++
      }

      if (currentIndex < totalChars) {
        sound.playClick()
        setRevealedIndex(currentIndex)
        currentIndex++
      } else {
        clearInterval(scrambleInterval)
        clearInterval(revealInterval)
        setDisplayChars(FULL_NAME.split(''))
        setCompleteNameShown(true)

        // Step 1: Slide in AI Cybernetic Portrait immediately after name completes
        setTimeout(() => {
          setImageVisible(true)
          sound.playChime()
        }, 120)

        // Step 2: Background cosmic starfield, telemetry bloom, and widget reveal
        setTimeout(() => {
          setBackgroundVisible(true)
          if (onIntroComplete) {
            onIntroComplete()
          }
        }, 450)
      }
    }, 125)

    return () => {
      clearInterval(scrambleInterval)
      clearInterval(revealInterval)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      runSequence()
    }, 250)
    return () => clearTimeout(timer)
  }, [])

  // 3D Cosmic Starfield Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const stars = Array.from({ length: 220 }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 1000 + 100,
      size: Math.random() * 1.6 + 0.6,
      color: Math.random() < 0.25 ? '#38bdf8' : Math.random() < 0.1 ? '#a855f7' : '#e2e8f0',
    }))

    let animId
    let time = 0

    const render = () => {
      time += 0.015
      ctx.fillStyle = '#07080c'
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      // Central Volumetric Core Glow
      const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.min(width, height) * 0.5)
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.1)')
      grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.04)')
      grad.addColorStop(1, 'rgba(7, 8, 12, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      const mx = (mouseRef.current.x - 0.5) * 80
      const my = (mouseRef.current.y - 0.5) * 80

      // 3D Starfield Warp
      ctx.save()
      ctx.translate(cx + mx * 0.4, cy + my * 0.4)

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        star.z -= 1.8
        if (star.z <= 0) star.z = 1000

        const k = 400 / star.z
        const px = star.x * k
        const py = star.y * k

        if (px >= -cx && px <= cx && py >= -cy && py <= cy) {
          const alpha = (1 - star.z / 1000) * 0.85
          ctx.beginPath()
          ctx.arc(px, py, star.size * k * 0.8, 0, Math.PI * 2)
          ctx.fillStyle = star.color
          ctx.globalAlpha = alpha
          ctx.fill()
        }
      }
      ctx.restore()

      // Concentric 3D Orbit Rings
      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(1, 0.38)
      ctx.rotate(time * 0.2)

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.arc(0, 0, Math.min(width, height) * 0.38, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)'
      ctx.beginPath()
      ctx.arc(0, 0, Math.min(width, height) * 0.26, 0, Math.PI * 2)
      ctx.stroke()

      ctx.restore()

      ctx.globalAlpha = 1.0
      animId = requestAnimationFrame(render)
    }

    render()

    const onMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  // Words breakdown for clean typography without awkward whitespace gaps
  const sumitChars = displayChars.slice(0, 5) // "SUMIT"
  const kumarChars = displayChars.slice(6, 11) // "KUMAR"
  const singhChars = displayChars.slice(12, 17) // "SINGH"

  return (
    <div className="relative w-full min-h-screen lg:h-screen lg:max-h-screen bg-[#07080c] flex flex-col justify-between overflow-hidden select-none z-30 px-4 sm:px-8 pt-3 sm:pt-4 pb-3 sm:pb-5">
      
      {/* Dynamic Cosmic Background: FADES IN ONCE COMPLETE NAME IS SHOWN */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none z-0"
        style={{ opacity: backgroundVisible ? 1 : 0 }}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Top Dossier Bar */}
      <div
        className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono transition-opacity duration-700"
        style={{ opacity: backgroundVisible ? 1 : 0 }}
      >
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/[0.1] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
          <span className="text-zinc-300 font-semibold tracking-wider">
            PORTFOLIO V2.0 • IDENTITY DECODED
          </span>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-zinc-400">
          <span className="text-cyan-400 font-bold">250+ DSA</span>
          <span>•</span>
          <span className="text-amber-400 font-bold">FLIPKART GRiD 8.0</span>
          <span>•</span>
          <span className="text-zinc-300">9.31 CGPA</span>
        </div>
      </div>

      {/* ============================================================= */}
      {/* MAIN KEYNOTE HERO: BALANCED 12-COL ASYMMETRIC GRID             */}
      {/* ============================================================= */}
      <div className="relative z-10 my-auto w-full max-w-7xl mx-auto py-2 sm:py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Clean Typography, Decoded Name & Dossier */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3.5 sm:space-y-4">
            
            {/* Category Pill */}
            <div
              className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-white/[0.15] text-[11px] font-mono text-cyan-300 shadow-xl backdrop-blur-xl transition-opacity duration-700"
              style={{ opacity: backgroundVisible ? 1 : 0 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="tracking-widest uppercase">COMPUTER SCIENCE & ENGINEERING (AI/ML)</span>
            </div>

            {/* PROGRESSIVE LETTER-BY-LETTER COUNTER NAME */}
            <div className="select-none w-full">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-none uppercase font-mono flex flex-col items-center lg:items-start">
                
                {/* ROW 1: "SUMIT KUMAR" (Clean inline, no awkward gaps) */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 sm:gap-x-4">
                  {/* SUMIT */}
                  <span className="inline-flex">
                    {sumitChars.map((char, i) => {
                      const isLocked = completeNameShown || i < revealedIndex
                      const isCurrentlyRolling = i === revealedIndex
                      return (
                        <span
                          key={i}
                          className={`inline-block transition-colors duration-100 ${
                            isLocked
                              ? 'bg-gradient-to-b from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent'
                              : isCurrentlyRolling
                              ? 'text-cyan-400 font-bold scale-110 drop-shadow-[0_0_12px_#38bdf8]'
                              : 'opacity-0'
                          }`}
                        >
                          {char || '\u00A0'}
                        </span>
                      )
                    })}
                  </span>

                  {/* KUMAR */}
                  <span className="inline-flex">
                    {kumarChars.map((char, i) => {
                      const globalIdx = 6 + i
                      const isLocked = completeNameShown || globalIdx < revealedIndex
                      const isCurrentlyRolling = globalIdx === revealedIndex
                      return (
                        <span
                          key={i}
                          className={`inline-block transition-colors duration-100 ${
                            isLocked
                              ? 'bg-gradient-to-b from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent'
                              : isCurrentlyRolling
                              ? 'text-cyan-400 font-bold scale-110 drop-shadow-[0_0_12px_#38bdf8]'
                              : 'opacity-0'
                          }`}
                        >
                          {char || '\u00A0'}
                        </span>
                      )
                    })}
                  </span>
                </div>

                {/* ROW 2: "SINGH" (Cybernetic gradient bloom) */}
                <div className="mt-1.5 sm:mt-2">
                  <span className="inline-flex">
                    {singhChars.map((char, i) => {
                      const globalIdx = 12 + i
                      const isLocked = completeNameShown || globalIdx < revealedIndex
                      const isCurrentlyRolling = globalIdx === revealedIndex
                      return (
                        <span
                          key={i}
                          className={`inline-block transition-colors duration-100 ${
                            isLocked
                              ? 'bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 bg-clip-text text-transparent font-black drop-shadow-[0_10px_35px_rgba(56,189,248,0.3)]'
                              : isCurrentlyRolling
                              ? 'text-cyan-400 font-bold scale-110 drop-shadow-[0_0_12px_#38bdf8]'
                              : 'opacity-0'
                          }`}
                        >
                          {char || '\u00A0'}
                        </span>
                      )
                    })}
                  </span>
                </div>

              </h1>
            </div>

            {/* Subtitle */}
            <p
              className="text-sm sm:text-base text-zinc-400 max-w-xl font-sans font-light leading-relaxed transition-all duration-700"
              style={{
                opacity: backgroundVisible ? 1 : 0,
                transform: backgroundVisible ? 'translateY(0px)' : 'translateY(10px)',
              }}
            >
              Architecting High-Assurance Full-Stack Systems & Applied Machine Learning Models. Creator of <strong className="text-white font-medium">JanCare</strong>, <strong className="text-white font-medium">DigitalTwin</strong>, and <strong className="text-white font-medium">SwasthyaMitra</strong>.
            </p>

            {/* 3 Telemetry Pillars */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-2xl text-left transition-all duration-700 pt-0.5"
              style={{
                opacity: backgroundVisible ? 1 : 0,
                transform: backgroundVisible ? 'translateY(0px)' : 'translateY(16px)',
              }}
            >
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-900/80 border border-white/[0.08] backdrop-blur-xl hover:border-amber-500/30 transition-colors">
                <div className="text-[10px] font-mono text-amber-400 font-bold">ACHIEVEMENT</div>
                <div className="text-xs font-bold text-white mt-0.5">Flipkart GRiD 8.0</div>
                <div className="text-[10px] text-zinc-500 font-mono">National Semi-Finalist (Top 170k+)</div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-900/80 border border-white/[0.08] backdrop-blur-xl hover:border-cyan-500/30 transition-colors">
                <div className="text-[10px] font-mono text-cyan-400 font-bold">FLAGSHIP SYSTEMS</div>
                <div className="text-xs font-bold text-white mt-0.5">5 Curated Platforms</div>
                <div className="text-[10px] text-zinc-500 font-mono">Next.js • Gemini AI • WebRTC</div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-900/80 border border-white/[0.08] backdrop-blur-xl hover:border-emerald-500/30 transition-colors">
                <div className="text-[10px] font-mono text-emerald-400 font-bold">ALGORITHMS</div>
                <div className="text-xs font-bold text-white mt-0.5">250+ Solved in Java</div>
                <div className="text-[10px] text-zinc-500 font-mono">LeetCode • CodeChef • Codeforces</div>
              </div>
            </div>

            {/* CTAs */}
            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1.5 transition-all duration-700"
              style={{
                opacity: backgroundVisible ? 1 : 0,
                transform: backgroundVisible ? 'translateY(0px)' : 'translateY(12px)',
              }}
            >
              <button
                onClick={onEnter}
                className="group relative flex items-center space-x-2 px-6 py-2.5 sm:py-3 rounded-2xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs sm:text-sm shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Enter Portfolio Experience</span>
                <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#flagships"
                onClick={onEnter}
                className="flex items-center space-x-2 px-5 py-2.5 sm:py-3 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/[0.1] text-zinc-300 hover:text-white font-medium text-xs sm:text-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Explore Flagship Systems</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: AI-Blended Cybernetic Hologram Portrait */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Hologram Stage Container */}
            <div
              className="relative w-[320px] sm:w-[420px] xl:w-[440px] h-[390px] sm:h-[470px] xl:h-[500px] flex items-center justify-center transition-all duration-1000 ease-out"
              style={{
                opacity: imageVisible ? 1 : 0,
                transform: imageVisible ? 'translateX(0px) scale(1)' : 'translateX(60px) scale(0.95)',
              }}
            >

              {/* ========================================================= */}
              {/* AI HOLOGRAPHIC ENVIRONMENT BEHIND PORTRAIT                */}
              {/* ========================================================= */}
              
              {/* Ambient Cybernetic Nebula Aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-600/15 to-purple-600/25 blur-3xl pointer-events-none animate-pulse" />

              {/* Outer Rotating Holographic HUD Circle */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-60 animate-[spin_45s_linear_infinite]"
                viewBox="0 0 300 300"
              >
                {/* Outer Dashed Orbit Ring */}
                <circle
                  cx="150"
                  cy="150"
                  r="138"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="0.8"
                  strokeDasharray="10 8 3 8"
                />
                {/* Secondary Thin Orbit */}
                <circle
                  cx="150"
                  cy="150"
                  r="122"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="0.5"
                  strokeOpacity="0.4"
                />
                {/* Purple Inner Pulse Ring */}
                <circle
                  cx="150"
                  cy="150"
                  r="105"
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="1"
                  strokeDasharray="25 15 5 15"
                />
                {/* Crosshair Marks */}
                <path
                  d="M 150 6 L 150 16 M 150 284 L 150 294 M 6 150 L 16 150 M 284 150 L 294 150"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Counter-Rotating Inner Telemetry Arc */}
              <svg
                className="absolute inset-4 w-[90%] h-[90%] m-auto pointer-events-none opacity-50 animate-[spin_30s_linear_infinite_reverse]"
                viewBox="0 0 240 240"
              >
                <circle
                  cx="120"
                  cy="120"
                  r="98"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1.2"
                  strokeDasharray="50 180"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="86"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="0.8"
                  strokeDasharray="25 60 10 40"
                />
              </svg>

              {/* ========================================================= */}
              {/* THE SHADOW MONOLITH PORTRAIT (The Iconic "Shadow One")  */}
              {/* ========================================================= */}
              <div className="relative w-full h-full flex items-end justify-center z-10">
                <img
                  src="./sumit-hero-shadow.png?v=2"
                  alt="Sumit Kumar Singh"
                  className="w-full h-full object-contain object-bottom select-none pointer-events-none filter brightness-105 contrast-105 drop-shadow-[0_0_35px_rgba(6,182,212,0.35)]"
                />

                {/* Deep Soft Bottom Gradient Dissolve into void */}
                <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#07080c] via-[#07080c]/90 via-[#07080c]/40 to-transparent pointer-events-none" />
              </div>

              {/* ========================================================= */}
              {/* FLOATING AI TELEMETRY HUD CHIPS                           */}
              {/* ========================================================= */}

              {/* Chip 1: Top Right - Cognitive Core */}
              <div
                className="absolute -top-3 right-4 z-20 hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-zinc-950/85 border border-cyan-500/40 backdrop-blur-xl shadow-xl transition-all duration-700"
                style={{ opacity: backgroundVisible ? 1 : 0 }}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] font-mono text-cyan-300 font-semibold tracking-wider">
                  AI COGNITION: ONLINE
                </span>
              </div>

              {/* Chip 2: Mid Right - Model Spec */}
              <div
                className="absolute top-1/4 -right-4 z-20 hidden sm:flex flex-col p-2.5 px-3 rounded-xl bg-zinc-950/85 border border-white/[0.1] backdrop-blur-xl shadow-xl transition-all duration-700"
                style={{ opacity: backgroundVisible ? 1 : 0 }}
              >
                <div className="flex items-center space-x-1.5 text-[9px] font-mono text-zinc-400">
                  <Cpu className="w-3 h-3 text-purple-400" />
                  <span>SKS-NEURAL-AGENT</span>
                </div>
                <span className="text-[11px] font-bold font-mono text-white mt-0.5">
                  Top 0.1% GRiD 8.0
                </span>
              </div>

              {/* Chip 3: Bottom Left - Algorithms */}
              <div
                className="absolute bottom-6 -left-8 z-20 hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-zinc-950/85 border border-white/[0.1] backdrop-blur-xl shadow-xl transition-all duration-700"
                style={{ opacity: backgroundVisible ? 1 : 0 }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-mono text-zinc-200">
                  250+ DSA • Java Primary
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Bottom Scroll Prompt (Clearly Visible Pill, Elevated Above Edge) */}
      <div
        className="relative z-20 w-full max-w-md mx-auto flex items-center justify-center pt-1 pb-1 cursor-pointer transition-all duration-700 select-none group"
        onClick={onEnter}
        style={{ opacity: backgroundVisible ? 1 : 0 }}
      >
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-zinc-900/95 border border-white/[0.15] hover:border-cyan-400/50 text-[11px] font-mono text-zinc-300 hover:text-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <span className="tracking-widest uppercase">SCROLL DOWN TO EXPLORE</span>
          <ChevronDown className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform animate-bounce" />
        </div>
      </div>

    </div>
  )
}
