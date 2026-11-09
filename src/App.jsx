import React, { useState, useRef, useEffect } from 'react'
import HeroIntroLanding from './components/HeroIntroLanding'
import FloatingVoiceWidget from './components/FloatingVoiceWidget'
import ParticleBackground from './components/ParticleBackground'
import Badge3D from './components/Badge3D'
import CommandPalette from './components/CommandPalette'
import ResumeModal from './components/ResumeModal'
import TerminalModal from './components/TerminalModal'
import FlagshipShowcase from './components/FlagshipShowcase'
import CompetitiveCenter from './components/CompetitiveCenter'
import ProjectGallery from './components/ProjectGallery'
import TechStackExplorer from './components/TechStackExplorer'
import AchievementsSection from './components/AchievementsSection'
import ContactSection from './components/ContactSection'
import { sound } from './utils/audio'
import {
  Sparkles,
  Trophy,
  Github,
  Linkedin,
  Mail,
  FileText,
  ArrowRight,
  Cpu,
  Layers,
  GraduationCap,
  Command,
  Search,
  Code2,
  Terminal
} from 'lucide-react'

export default function App() {
  const [particleMode, setParticleMode] = useState('STARS')
  const [isCmdOpen, setIsCmdOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const mainWorkspaceRef = useRef(null)

  // Ensure page always starts at the top landing page on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleEnterWorkspace = () => {
    mainWorkspaceRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300 font-sans antialiased overflow-x-hidden relative">
      
      {/* Cinematic Full-Screen Landing Page Intro */}
      <HeroIntroLanding
        onEnter={handleEnterWorkspace}
        onIntroComplete={() => setIsIntroComplete(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Floating Bottom-Right Tap & Talk AI Widget (Appears only after name & picture load) */}
      <FloatingVoiceWidget isVisible={isIntroComplete} />

      {/* Global Command Palette (Ctrl + K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        setIsOpen={setIsCmdOpen}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Feature 3: In-Browser Interactive Resume Dossier Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Feature 2: Embedded Interactive Developer Terminal (sks-cli) */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Workspace Reference Point */}
      <div ref={mainWorkspaceRef} id="main-workspace" className="relative z-10">
        
        {/* Celestial Starfield Background Layer */}
        <ParticleBackground activeMode={particleMode} />

        {/* Ambient Top Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

        {/* ==================== CLEAN UNCLUTTERED NAVIGATION ==================== */}
        <header className="sticky top-0 z-40 backdrop-blur-2xl bg-zinc-950/80 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            
            {/* Identity (Clean, No CGPA clutter in header) */}
            <a href="#hero" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.12] flex items-center justify-center font-mono font-bold text-xs text-white group-hover:border-cyan-400/50 transition-colors">
                SS
              </div>
              <div>
                <div className="text-sm font-bold tracking-tight text-white">
                  Sumit Kumar Singh
                </div>
              </div>
            </a>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium text-zinc-400">
              <a href="#flagships" className="hover:text-white transition-colors">Flagship Systems</a>
              <a href="#dsa" className="hover:text-white transition-colors">Competitive DSA</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#tech-stack" className="hover:text-white transition-colors">Tech Stack</a>
              <a href="#achievements" className="hover:text-white transition-colors">Achievements</a>
            </nav>

            {/* Direct Actions & Interactive Controls */}
            <div className="flex items-center space-x-2">
              
              {/* Feature 2: Terminal Launcher */}
              <button
                onClick={() => {
                  sound.playClick()
                  setIsTerminalOpen(true)
                }}
                title="Developer Terminal (sks-cli) — Shortcut: `"
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden md:inline">CLI</span>
              </button>

              {/* Spotlight Command Button */}
              <button
                onClick={() => {
                  sound.playClick()
                  setIsCmdOpen(true)
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/[0.08] text-xs font-mono text-zinc-400 hover:text-white transition-colors shadow-sm"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-400">
                  ⌘K
                </kbd>
              </button>

              <a
                href="https://github.com/SumitKSinghDev"
                target="_blank"
                rel="noreferrer"
                title="GitHub Profile"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] text-zinc-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* Feature 3: In-Browser Resume Modal Trigger */}
              <button
                onClick={() => {
                  sound.playClick()
                  setIsResumeOpen(true)
                }}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold transition-all shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            </div>

          </div>
        </header>

        {/* ==================== HERO SECTION ==================== */}
        <section id="hero" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Dossier */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* National Achievement Chip */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/[0.1] text-xs font-mono text-zinc-300 shadow-sm">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-white">Flipkart GRiD 8.0 National Semi-Finalist</span>
                <span className="text-zinc-500 hidden sm:inline">| Top 0.1% of 170,000+</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">Intelligent</span> Full-Stack Systems.
              </h1>

              {/* Subtitle */}
              <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                B.Tech in Computer Science & Engineering (AI/ML) at C. V. Raman Global University. Creator of <strong className="text-white font-medium">AI Student Digital Twin</strong>, <strong className="text-white font-medium">जनCare</strong>, and <strong className="text-white font-medium">SwasthyaMitra</strong>, with <strong className="text-cyan-400 font-semibold">250+ solved algorithmic problems</strong> across LeetCode & CodeChef.
              </p>

              {/* Quick Key Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-xl">
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/[0.06] backdrop-blur-md">
                  <div className="text-xl sm:text-2xl font-extrabold text-white">5</div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Flagship Systems</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/[0.06] backdrop-blur-md">
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-400">170k+</div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">GRiD 8.0 Scale</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/[0.06] backdrop-blur-md">
                  <div className="text-xl sm:text-2xl font-extrabold text-cyan-400">206</div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">LeetCode Solved</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#projects"
                  onClick={() => sound.playWhoosh()}
                  className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs sm:text-sm shadow-xl transition-all"
                >
                  <span>Explore 5 Flagship Systems</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    sound.playClick()
                    setIsTerminalOpen(true)
                  }}
                  className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/[0.1] text-zinc-300 hover:text-white font-medium text-xs sm:text-sm transition-all"
                >
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Launch CLI Terminal (` key)</span>
                </button>
              </div>

            </div>

            {/* Right Column: Refined 3D Interactive Badge */}
            <div className="lg:col-span-5 flex justify-center">
              <Badge3D onOpenResume={() => setIsResumeOpen(true)} />
            </div>

          </div>
        </section>

        {/* ==================== FLAGSHIP SHOWCASE ==================== */}
        <FlagshipShowcase />

        {/* ==================== COMPETITIVE PROGRAMMING CENTER ==================== */}
        <CompetitiveCenter />

        {/* ==================== ALL GITHUB REPOSITORIES (Curated 5 Flagships) ==================== */}
        <ProjectGallery />

        {/* ==================== ARCHITECTURAL TECH STACK ==================== */}
        <TechStackExplorer />

        {/* ==================== HONORS & CERTIFICATIONS ==================== */}
        <AchievementsSection />

        {/* ==================== CONTACT & FOOTER ==================== */}
        <ContactSection />

      </div>

    </div>
  )
}
