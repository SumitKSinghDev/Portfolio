import React, { useEffect } from 'react'
import {
  X,
  ExternalLink,
  Github,
  Layers,
  Cpu,
  Database,
  ArrowRight,
  ShieldAlert,
  Activity,
  Sparkles,
  CheckCircle2,
  Server,
  Zap,
  Globe,
  Radio
} from 'lucide-react'
import { sound } from '../utils/audio'

export default function ProjectDetailDrawer({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  const Icon = project.icon || Layers

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => {
          sound.playClick()
          onClose()
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer Panel */}
        <div className="w-screen max-w-2xl bg-zinc-950/95 border-l border-white/[0.12] shadow-2xl backdrop-blur-2xl flex flex-col justify-between overflow-y-auto">
          
          {/* Header */}
          <div className="p-6 border-b border-white/[0.08] bg-zinc-900/50 sticky top-0 z-20 backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                      {project.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {project.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick()
                  onClose()
                }}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
              {project.tagline}
            </p>

            {/* Top Primary CTAs: Both Website & GitHub */}
            <div className="flex flex-wrap gap-2.5 mt-4 pt-3 border-t border-white/[0.06]">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playChime()}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>Launch Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/[0.12] text-zinc-200 hover:text-white font-medium text-xs transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Source Repository</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-8 flex-1">
            
            {/* System Overview */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Executive Summary & Impact</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/40 p-4 rounded-2xl border border-white/[0.06]">
                {project.summary}
              </p>
            </div>

            {/* Architectural System Topology Flow */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  <span>System Architecture Topology Flow</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">End-to-End Pipeline</span>
              </div>

              {/* Topology Stages */}
              <div className="space-y-3">
                {project.systemFlow ? (
                  project.systemFlow.map((stage, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-zinc-900/60 border border-white/[0.06] flex items-start space-x-4 relative group hover:border-cyan-500/30 transition-all"
                    >
                      <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-white/[0.08] flex items-center justify-center font-mono font-bold text-xs text-cyan-400 shrink-0">
                        0{idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            {stage.layer}
                          </h4>
                          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-md border border-white/[0.04]">
                            {stage.tech}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/[0.06] text-xs text-zinc-400">
                    Client ➔ API Gateway ➔ Processing Pipeline ➔ Database Layer
                  </div>
                )}
              </div>
            </div>

            {/* Engineering Trade-Offs & Key Decisions */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
                <Zap className="w-3.5 h-3.5" />
                <span>Key Engineering Decisions & Trade-Offs</span>
              </div>

              <div className="space-y-2.5">
                {project.tradeoffs ? (
                  project.tradeoffs.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-zinc-900/40 border border-white/[0.06] text-xs space-y-1"
                    >
                      <div className="font-semibold text-white flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item.decision}</span>
                      </div>
                      <p className="text-zinc-400 pl-5 leading-relaxed">
                        {item.rationale}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-white/[0.06] text-xs text-zinc-400">
                    Architected for zero-downtime, horizontal scaling, and ultra-low latency response.
                  </div>
                )}
              </div>
            </div>

            {/* Architectural Highlights */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Milestones & Capabilities</span>
              </div>

              <ul className="space-y-2">
                {project.architecturalHighlights.map((hl, i) => (
                  <li
                    key={i}
                    className="flex items-start space-x-2 text-xs text-zinc-300 bg-zinc-900/30 p-2.5 rounded-xl border border-white/[0.04]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Used */}
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Stack Components
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/[0.08] text-xs font-mono text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-white/[0.08] bg-zinc-900/60 sticky bottom-0 z-20 backdrop-blur-xl flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500">
              ID: {project.id} • Sumit Kumar Singh Architecture
            </span>

            <div className="flex items-center space-x-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playChime()}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow"
                >
                  <span>Open Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
