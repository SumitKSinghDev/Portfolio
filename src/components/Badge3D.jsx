import React, { useState, useRef, useEffect } from 'react'
import {
  RotateCw,
  Sparkles,
  QrCode,
  ShieldCheck,
  Trophy,
  Cpu,
  Mail,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
  Phone,
  FileText,
  Copy,
  Check,
  Wifi
} from 'lucide-react'
import { sound } from '../utils/audio'

export default function Badge3D({ onOpenResume }) {
  const cardRef = useRef(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [copied, setCopied] = useState(false)

  // Transform states
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0.3 })

  // Damped Spring Physics
  const physicsRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    dragStartX: 0,
    dragStartY: 0,
    originX: 0,
    originY: 0,
  })

  // Mouse move tilt
  const handleMouseMove = (e) => {
    if (isDragging || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotY = ((x - centerX) / centerX) * 14
    const rotX = -((y - centerY) / centerY) * 14

    setRot({ x: rotX, y: rotY })
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.7,
    })
  }

  const handleMouseLeave = () => {
    if (isDragging) return
    setRot({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0.25 })
  }

  // Drag start (Desktop Mouse)
  const handleMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return
    e.preventDefault()
    setIsDragging(true)
    sound.playWhoosh()

    physicsRef.current.dragStartX = e.clientX
    physicsRef.current.dragStartY = e.clientY
    physicsRef.current.originX = physicsRef.current.currentX
    physicsRef.current.originY = physicsRef.current.currentY
  }

  // Drag start (Mobile Touch)
  const handleTouchStart = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return
    const touch = e.touches[0]
    if (!touch) return
    setIsDragging(true)
    sound.playWhoosh()

    physicsRef.current.dragStartX = touch.clientX
    physicsRef.current.dragStartY = touch.clientY
    physicsRef.current.originX = physicsRef.current.currentX
    physicsRef.current.originY = physicsRef.current.currentY
  }

  // Global mouse & mobile touch drag tracking
  useEffect(() => {
    const handleDragMove = (clientX, clientY) => {
      const dx = clientX - physicsRef.current.dragStartX
      const dy = clientY - physicsRef.current.dragStartY

      physicsRef.current.targetX = Math.max(-160, Math.min(160, physicsRef.current.originX + dx))
      physicsRef.current.targetY = Math.max(-20, Math.min(200, physicsRef.current.originY + dy))

      setRot({
        x: Math.max(-22, Math.min(22, -dy * 0.12)),
        y: Math.max(-22, Math.min(22, dx * 0.12)),
      })

      setGlare({
        x: Math.max(10, Math.min(90, 50 + dx * 0.15)),
        y: Math.max(10, Math.min(90, 50 + dy * 0.15)),
        opacity: 0.85,
      })
    }

    const onWindowMouseMove = (e) => {
      if (!isDragging) return
      handleDragMove(e.clientX, e.clientY)
    }

    const onWindowTouchMove = (e) => {
      if (!isDragging || !e.touches || !e.touches[0]) return
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY)
    }

    const onWindowEnd = () => {
      if (isDragging) {
        setIsDragging(false)
        physicsRef.current.targetX = 0
        physicsRef.current.targetY = 0
        sound.playChime()
      }
    }

    window.addEventListener('mousemove', onWindowMouseMove)
    window.addEventListener('mouseup', onWindowEnd)
    window.addEventListener('touchmove', onWindowTouchMove, { passive: true })
    window.addEventListener('touchend', onWindowEnd)
    window.addEventListener('touchcancel', onWindowEnd)

    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove)
      window.removeEventListener('mouseup', onWindowEnd)
      window.removeEventListener('touchmove', onWindowTouchMove)
      window.removeEventListener('touchend', onWindowEnd)
      window.removeEventListener('touchcancel', onWindowEnd)
    }
  }, [isDragging])

  // Physics animation loop (Spring Pendulum)
  useEffect(() => {
    let animId
    const springK = 0.085
    const damping = 0.82

    const updatePhysics = () => {
      const p = physicsRef.current
      const ax = (p.targetX - p.currentX) * springK
      const ay = (p.targetY - p.currentY) * springK

      p.vx = (p.vx + ax) * damping
      p.vy = (p.vy + ay) * damping

      p.currentX += p.vx
      p.currentY += p.vy

      setPos({ x: p.currentX, y: p.currentY })

      if (!isDragging) {
        setRot((prev) => ({
          x: prev.x * 0.88,
          y: prev.y * 0.88,
        }))
      }

      animId = requestAnimationFrame(updatePhysics)
    }

    animId = requestAnimationFrame(updatePhysics)
    return () => cancelAnimationFrame(animId)
  }, [isDragging])

  const toggleFlip = (e) => {
    e?.stopPropagation()
    sound.playClick()
    setIsFlipped(!isFlipped)
  }

  const copyEmail = (e) => {
    e.stopPropagation()
    sound.playClick()
    navigator.clipboard.writeText('sumitksingh243@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lanyardAngle = (pos.x / 14).toFixed(1)

  // Dynamic Stretching Lanyard Ribbon Coordinates
  const anchorX = 200
  const anchorY = 0
  const clipX = anchorX + pos.x
  const clipY = 48 + pos.y
  const ctrlX = anchorX + pos.x * 0.45
  const ctrlY = Math.max(15, clipY * 0.5)

  return (
    <div className="relative flex flex-col items-center select-none pt-1 pb-4 perspective-1500">
      
      {/* ================================================================= */}
      {/* DYNAMIC STRETCHING LANYARD & TITANIUM SWIVEL CLASP               */}
      {/* ================================================================= */}
      <svg
        className="w-[320px] sm:w-[400px] max-w-full h-[70px] pointer-events-none z-20 overflow-visible -mb-4"
        viewBox="0 0 400 70"
      >
        <defs>
          <linearGradient id="lanyardStrap" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#09090b" />
            <stop offset="25%" stopColor="#18181b" />
            <stop offset="50%" stopColor="#27272a" />
            <stop offset="75%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
          <linearGradient id="claspChrome" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f4f4f5" />
            <stop offset="50%" stopColor="#a1a1aa" />
            <stop offset="100%" stopColor="#52525b" />
          </linearGradient>
        </defs>

        {/* Dynamic Expanding Satin Ribbon Strap */}
        <path
          d={`M ${anchorX - 11} ${anchorY} Q ${ctrlX - 10} ${ctrlY} ${clipX - 8} ${clipY} L ${clipX + 8} ${clipY} Q ${ctrlX + 10} ${ctrlY} ${anchorX + 11} ${anchorY} Z`}
          fill="url(#lanyardStrap)"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="0.8"
        />

        {/* Dynamic Center Cyan Fiber Line */}
        <path
          d={`M ${anchorX} ${anchorY} Q ${ctrlX} ${ctrlY} ${clipX} ${clipY}`}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          opacity="0.85"
        />

        {/* Top Fixed Mounting Bracket */}
        <rect
          x={anchorX - 22}
          y={anchorY}
          width="44"
          height="7"
          rx="3"
          fill="url(#claspChrome)"
          stroke="#3f3f46"
          strokeWidth="0.8"
        />

        {/* Titanium Swivel Hook attached to moving badge */}
        <g transform={`translate(${clipX}, ${clipY}) rotate(${pos.x * 0.12})`}>
          {/* Swivel Ring */}
          <rect
            x="-8"
            y="-2"
            width="16"
            height="5"
            rx="2"
            fill="url(#claspChrome)"
          />
          {/* Swivel Metallic Body */}
          <path
            d="M -6 3 L 6 3 L 4 14 L -4 14 Z"
            fill="#27272a"
            stroke="url(#claspChrome)"
            strokeWidth="0.8"
          />
          {/* Snap Ring entering badge */}
          <ellipse
            cx="0"
            cy="16"
            rx="3"
            ry="4"
            fill="none"
            stroke="url(#claspChrome)"
            strokeWidth="1.5"
          />
        </g>
      </svg>

      {/* ================================================================= */}
      {/* 3D DRAGGABLE BADGE BODY (Strict Proportions & Flip Fix)            */}
      {/* ================================================================= */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative cursor-grab active:cursor-grabbing z-30 touch-none -mt-1.5"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) rotateX(${rot.x}deg) rotateY(${rot.y + (isFlipped ? 180 : 0)}deg)`,
          transition: isDragging ? 'none' : 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top Lanyard Slot Punch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-black/95 border border-zinc-600 z-50 shadow-inner flex items-center justify-center pointer-events-none">
          <div className="w-6 h-0.5 rounded-full bg-zinc-800" />
        </div>

        {/* Outer Card Shell with Preserve-3D (No overflow-hidden to preserve 3D backface) */}
        <div className="w-[280px] sm:w-[310px] h-[415px] sm:h-[420px] rounded-[26px] preserve-3d relative">

          {/* ============================================================= */}
          {/* CARD FRONT                                                    */}
          {/* ============================================================= */}
          <div
            className={`absolute inset-0 rounded-[26px] overflow-hidden p-5 flex flex-col justify-between backdrop-blur-3xl acrylic-bevel bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-black/95 shadow-2xl backface-hidden transition-all duration-300 ${
              isFlipped ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100 z-20'
            }`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Subtle Background Neural Traces */}
            <svg
              className="absolute inset-0 w-full h-full opacity-10 pointer-events-none z-0 text-cyan-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 310 420"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M 20 70 L 80 70 L 110 100 L 240 100" />
              <path d="M 30 340 L 90 340 L 130 300 L 270 300" />
              <circle cx="110" cy="100" r="2.5" fill="currentColor" />
              <circle cx="240" cy="100" r="2.5" fill="currentColor" />
              <circle cx="130" cy="300" r="2.5" fill="currentColor" />
            </svg>

            {/* Prismatic Iridescent Hologram Sheen */}
            <div
              className="absolute inset-0 pointer-events-none hologram-prismatic z-30 rounded-[26px]"
              style={{
                backgroundPosition: `${glare.x}% ${glare.y}%`,
                opacity: isDragging ? 0.75 : glare.opacity,
              }}
            />

            {/* Header: Clearance Badge, EMV Chip & Flip Button */}
            <div className="flex items-center justify-between pt-1 relative z-10">
              {/* Golden Smartcard EMV Chip */}
              <div className="w-9 h-7 rounded gold-emv-chip flex items-center justify-center p-0.5 shadow-sm">
                <div className="w-full h-full border border-amber-900/40 rounded flex flex-col justify-between py-0.5 relative">
                  <div className="w-full h-[0.5px] bg-amber-900/50" />
                  <div className="absolute inset-y-0 left-1/2 w-[0.5px] bg-amber-900/50" />
                </div>
              </div>

              {/* Status Pill: AI/ML SYSTEMS */}
              <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900/90 border border-cyan-500/30 text-[10px] font-mono text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="tracking-wide font-bold">AI/ML SYSTEMS</span>
              </div>

              {/* Flip Button */}
              <button
                onClick={toggleFlip}
                title="Click to Flip Card to Back"
                className="p-1.5 rounded-full bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white transition-all transform hover:rotate-180 duration-300 shadow-sm cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Avatar Frame with Real Studio Portrait */}
            <div className="relative my-auto flex justify-center z-10">
              <div className="relative w-24 h-24 rounded-2xl p-[1.5px] bg-gradient-to-tr from-cyan-400 via-purple-500 to-amber-400 shadow-xl">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-zinc-950 relative flex items-center justify-center">
                  <img
                    src="./sumit-badge.jpg"
                    alt="Sumit Kumar Singh"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none" />
                </div>

                <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded bg-zinc-950 border border-cyan-500/40 text-cyan-300 font-mono text-[8px] font-bold">
                  VERIFIED
                </div>
              </div>
            </div>

            {/* Identity Info */}
            <div className="text-center space-y-0.5 relative z-10">
              <h2 className="text-lg font-bold tracking-tight text-white flex items-center justify-center gap-1">
                <span>Sumit Kumar Singh</span>
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
              </h2>
              <p className="text-[11px] font-mono text-cyan-400 font-semibold">
                Software Engineer • AI/ML & Systems
              </p>
              <p className="text-[10px] text-zinc-400">
                C. V. Raman Global University (2023–2027)
              </p>

              {/* Direct Quick Badges on Front: LinkedIn & GitHub */}
              <div className="flex items-center justify-center space-x-2 pt-1">
                <a
                  href="https://www.linkedin.com/in/sumit-kumar-singh-0462b92b6"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#0a66c2]/20 hover:bg-[#0a66c2]/35 border border-[#0a66c2]/40 text-[#38bdf8] hover:text-white text-[9px] font-mono font-medium transition-colors"
                >
                  <Linkedin className="w-2.5 h-2.5 text-[#38bdf8]" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href="https://github.com/SumitKSinghDev"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white text-[9px] font-mono font-medium transition-colors"
                >
                  <Github className="w-2.5 h-2.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* National Achievement Bar: FLIPKART GRiD 8.0 ONLY (Infosys Removed Per User Request) */}
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-zinc-900/90 to-zinc-900/90 border border-amber-500/30 text-left relative z-10">
              <div className="flex items-center justify-between text-amber-400 text-[10px] font-mono font-bold">
                <div className="flex items-center space-x-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>FLIPKART GRiD 8.0</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[9px] text-amber-300 font-mono">
                  TOP 0.1%
                </span>
              </div>
              <p className="text-xs text-white font-bold mt-1">National Semi-Finalist</p>
              <p className="text-[9px] text-zinc-400 font-mono">Ranked amongst 170,000+ competitors nationwide</p>
            </div>

            {/* Compact Barcode Footer */}
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[9px] font-mono text-zinc-400 relative z-10">
              <div>
                SN: <span className="text-zinc-200 font-bold">SKS-2026-SE</span>
              </div>
              <div className="flex items-center space-x-0.5 opacity-60">
                {[2, 1, 3, 1, 4, 2, 1, 3, 2, 4, 1].map((w, i) => (
                  <div key={i} className="bg-zinc-200 h-2.5" style={{ width: `${w * 1.5}px` }} />
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================= */}
          {/* CARD BACK (High-Contrast, Fully Rendered, No Blank Glitch)    */}
          {/* ============================================================= */}
          <div
            className={`absolute inset-0 rounded-[26px] overflow-hidden p-5 flex flex-col justify-between backdrop-blur-3xl acrylic-bevel bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-black/95 border border-cyan-500/30 shadow-2xl backface-hidden transition-all duration-300 ${
              isFlipped ? 'pointer-events-auto opacity-100 z-20' : 'pointer-events-none opacity-0'
            }`}
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Subtle Background Neural Traces */}
            <svg
              className="absolute inset-0 w-full h-full opacity-10 pointer-events-none z-0 text-cyan-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 310 420"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M 40 50 L 100 50 L 130 90 L 260 90" />
              <path d="M 20 370 L 90 370 L 140 320 L 280 320" />
              <circle cx="130" cy="90" r="2.5" fill="currentColor" />
              <circle cx="260" cy="90" r="2.5" fill="currentColor" />
              <circle cx="140" cy="320" r="2.5" fill="currentColor" />
            </svg>

            {/* Prismatic Iridescent Hologram Sheen */}
            <div
              className="absolute inset-0 pointer-events-none hologram-prismatic z-30 rounded-[26px]"
              style={{
                backgroundPosition: `${glare.x}% ${glare.y}%`,
                opacity: isDragging ? 0.75 : glare.opacity,
              }}
            />

            {/* Header: Title & Flip Back Button */}
            <div className="flex items-center justify-between pt-1 relative z-10">
              <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="tracking-wider">RECRUITER ACCESS DOSSIER</span>
              </div>
              <button
                onClick={toggleFlip}
                title="Tap to Flip to Front"
                className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white transition-all transform hover:rotate-180 duration-300 shadow-sm cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Centered QR Matrix Code (100% Real Scannable High-DPI Code) */}
            <div className="flex flex-col items-center my-auto relative z-10">
              <a
                href="https://github.com/SumitKSinghDev"
                target="_blank"
                rel="noreferrer"
                title="Scan or Click to visit GitHub & Portfolio"
                className="p-2.5 bg-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
              >
                <img
                  src="./qr-github.png?v=2"
                  alt="Scannable QR Code to Sumit's GitHub & Projects"
                  className="w-24 h-24 object-contain rounded-lg select-none pointer-events-none"
                />
              </a>
              <span className="text-[9px] font-mono text-zinc-300 mt-2 font-semibold tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SCAN FOR GITHUB & PORTFOLIO
              </span>
            </div>

            {/* Direct Contact Links */}
            <div className="w-full space-y-1.5 text-xs text-left mb-1 relative z-10">
              {/* Email with copy */}
              <button
                onClick={copyEmail}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/[0.1] text-zinc-200 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate text-[11px]">sumitksingh243@gmail.com</span>
                </div>
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-zinc-500 shrink-0" />}
              </button>

              {/* LinkedIn Direct Link */}
              <a
                href="https://www.linkedin.com/in/sumit-kumar-singh-0462b92b6"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-[#0a66c2]/15 hover:bg-[#0a66c2]/25 border border-[#0a66c2]/40 text-sky-200 hover:text-white transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-2 truncate">
                  <Linkedin className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate text-[11px] font-mono">sumit-kumar-singh-0462b92b6</span>
                </div>
                <ExternalLink className="w-3 h-3 text-sky-400 shrink-0 ml-1" />
              </a>

              {/* Compact Phone & Location Row */}
              <div className="grid grid-cols-2 gap-1.5 text-[10px] text-zinc-300">
                <div className="flex items-center space-x-1.5 p-1.5 rounded-xl bg-zinc-900/90 border border-white/[0.08] truncate">
                  <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">+91 7050114544</span>
                </div>
                <div className="flex items-center space-x-1.5 p-1.5 rounded-xl bg-zinc-900/90 border border-white/[0.08] truncate">
                  <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                  <span className="truncate">Ranchi / BBSR</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Resume PDF, GitHub & LinkedIn */}
            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-zinc-800 relative z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  sound.playClick()
                  if (onOpenResume) {
                    onOpenResume()
                  } else {
                    window.open('./Sumit_Kumar_Singh_Resume.pdf', '_blank')
                  }
                }}
                className="flex items-center justify-center space-x-1 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-[11px] font-bold transition-colors shadow-md cursor-pointer"
              >
                <FileText className="w-3 h-3" />
                <span>Resume</span>
              </button>

              <a
                href="https://github.com/SumitKSinghDev"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center space-x-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-[11px] font-medium text-white transition-colors"
              >
                <Github className="w-3 h-3 text-zinc-300" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/sumit-kumar-singh-0462b92b6"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center space-x-1 py-2 rounded-xl bg-[#0a66c2]/20 hover:bg-[#0a66c2]/35 border border-[#0a66c2]/50 text-[11px] font-medium text-sky-200 hover:text-white transition-colors"
              >
                <Linkedin className="w-3 h-3 text-[#38bdf8]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Physics Tip */}
      <div className="mt-2.5 flex items-center space-x-2 text-[10px] font-mono text-zinc-500">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>Grab badge to swing • Click rotate to flip</span>
      </div>
    </div>
  )
}
