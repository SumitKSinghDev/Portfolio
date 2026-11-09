import React, { useEffect } from 'react'
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Trophy,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Briefcase
} from 'lucide-react'
import { sound } from '../utils/audio'

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => {
          sound.playClick()
          onClose()
        }}
      />

      {/* Modal Dialog Window (Full Height 90vh) */}
      <div className="relative w-full max-w-5xl h-[88vh] sm:h-[90vh] bg-zinc-950/95 border border-white/[0.12] rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 backdrop-blur-2xl">
        
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-zinc-900/60 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Sumit Kumar Singh — Official Dossier
                </h3>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Verified 2026
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                B.Tech CSE (AI/ML) • C. V. Raman Global University • Flipkart GRiD 8.0 Semi-Finalist
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center space-x-2">
            <a
              href="/Sumit_Kumar_Singh_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              title="Open PDF in new tab"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white transition-colors flex items-center space-x-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Tab</span>
            </a>

            <a
              href="/Sumit_Kumar_Singh_Resume.pdf"
              download="Sumit_Kumar_Singh_Resume.pdf"
              onClick={() => sound.playChime()}
              title="Download official PDF copy"
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            <button
              onClick={() => {
                sound.playClick()
                onClose()
              }}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] text-zinc-400 hover:text-white transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Quick Dossier Bar (Flipkart GRiD Highlight, No Infosys) */}
        <div className="px-5 py-2.5 bg-zinc-900/30 border-b border-white/[0.04] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center space-x-2 text-zinc-400">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic Standing: <strong className="text-white">9.31 / 10 CGPA</strong></span>
          </div>
          <div className="flex items-center space-x-2 text-zinc-400">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Flipkart GRiD 8.0: <strong className="text-white">National Semi-Finalist (Top 0.1%)</strong></span>
          </div>
          <div className="flex items-center space-x-2 text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Algorithms: <strong className="text-white">250+ Solved in Java</strong></span>
          </div>
        </div>

        {/* Embedded PDF Viewer (Expands to 100% Full Height) */}
        <div className="relative flex-1 w-full bg-zinc-950 p-2 sm:p-4 flex flex-col min-h-0">
          <iframe
            src="/Sumit_Kumar_Singh_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
            title="Sumit Kumar Singh Official Resume"
            className="w-full h-full flex-1 min-h-0 rounded-2xl border border-white/[0.08] bg-white shadow-2xl"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-white/[0.08] bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-500 font-mono">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sumit_Kumar_Singh_Resume.pdf (SHA-256 Verified)</span>
          </div>
          <span className="hidden sm:inline">Press ESC to dismiss</span>
        </div>

      </div>
    </div>
  )
}
