import React, { useState, useEffect } from 'react'
import {
  Search,
  Command,
  FileText,
  Mail,
  Copy,
  ExternalLink,
  Volume2,
  Trophy,
  Code2,
  Sparkles,
  X,
  ArrowRight,
  Terminal as TerminalIcon,
  Globe
} from 'lucide-react'
import { voice } from '../utils/speech'
import { sound } from '../utils/audio'

export default function CommandPalette({ isOpen, setIsOpen, onOpenResume, onOpenTerminal }) {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setIsOpen])

  if (!isOpen) return null

  const actions = [
    {
      category: 'Flagship Systems & Projects',
      items: [
        {
          name: 'AI Student Digital Twin',
          desc: 'Behavioral telemetry & burnout prediction platform (Live Demo)',
          action: () => {
            window.location.hash = 'projects'
            setIsOpen(false)
          },
        },
        {
          name: 'जनCare (JanCare)',
          desc: '7-stage rural clinical care continuum & triage OS (Live Demo)',
          action: () => {
            window.location.hash = 'projects'
            setIsOpen(false)
          },
        },
        {
          name: 'SwasthyaMitra',
          desc: 'WebRTC telemedicine & NABHA health cards for rural India (Live Demo)',
          action: () => {
            window.location.hash = 'projects'
            setIsOpen(false)
          },
        },
        {
          name: 'Karyaa Study & Work Tracker',
          desc: 'Interactive Python & SQLite task orchestration engine (Live Demo)',
          action: () => {
            window.location.hash = 'projects'
            setIsOpen(false)
          },
        },
        {
          name: 'Smart Code Security Scanner',
          desc: 'Infosys Springboard AST static analysis & OWASP detection (Live Demo)',
          action: () => {
            window.location.hash = 'projects'
            setIsOpen(false)
          },
        },
      ],
    },
    {
      category: 'Developer Tools & Terminals',
      items: [
        {
          name: 'Launch Developer CLI (sks-cli)',
          desc: 'Open interactive bash/zsh command terminal',
          action: () => {
            setIsOpen(false)
            if (onOpenTerminal) onOpenTerminal()
          },
        },
        {
          name: 'View Official Resume Dossier',
          desc: 'In-browser verified PDF reader & verified credentials',
          action: () => {
            setIsOpen(false)
            if (onOpenResume) onOpenResume()
          },
        },
      ],
    },
    {
      category: 'Competitive Programming Profiles',
      items: [
        {
          name: 'LeetCode (SKSINGH243)',
          desc: '206 solved: 93 Easy, 97 Medium, 16 Hard',
          url: 'https://leetcode.com/u/SKSINGH243/',
        },
        {
          name: 'CodeChef (sumit_x_ai_24)',
          desc: 'Rated competitive problem solving',
          url: 'https://www.codechef.com/users/sumit_x_ai_24',
        },
        {
          name: 'Codolio Unified Portfolio (sumitxai)',
          desc: 'Multi-platform aggregated algorithmic metrics',
          url: 'https://codolio.com/profile/sumitxai',
        },
        {
          name: 'Codeforces (sumitksingh243)',
          desc: 'Contest participant handle',
          url: 'https://codeforces.com/profile/sumitksingh243',
        },
      ],
    },
    {
      category: 'Executive Actions',
      items: [
        {
          name: 'Play Spoken AI Overview',
          desc: 'Listen to AI speech engine introducing Sumit',
          action: () => {
            voice.speak(
              "Sumit Kumar Singh is a final-year Computer Science and Engineering undergraduate specializing in AI and Machine Learning with a 9.31 CGPA, and a National Semi-Finalist in Flipkart GRiD 8.0 out of 170,000 candidates. His flagship projects include the AI Student Digital Twin, JanCare, SwasthyaMitra, and Karyaa."
            )
            setIsOpen(false)
          },
        },
        {
          name: 'Copy Email Address',
          desc: 'sumitksingh243@gmail.com',
          action: () => {
            navigator.clipboard.writeText('sumitksingh243@gmail.com')
            setCopied(true)
            setTimeout(() => {
              setCopied(false)
              setIsOpen(false)
            }, 1200)
          },
        },
      ],
    },
  ]

  const filtered = actions
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (i) =>
          i.name.toLowerCase().includes(query.toLowerCase()) ||
          i.desc.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0)

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-2xl bg-zinc-900 border border-white/[0.12] shadow-2xl overflow-hidden text-slate-100">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800">
          <Search className="w-4 h-4 text-zinc-400 mr-2.5" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tools, leetcode, resume, terminal..."
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-zinc-800/50">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-zinc-500">
              No results found for "{query}".
            </div>
          ) : (
            filtered.map((section) => (
              <div key={section.category} className="py-2">
                <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {section.category}
                </div>
                <div className="space-y-0.5 mt-1">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => {
                        sound.playClick()
                        if (item.action) {
                          item.action()
                        } else if (item.url) {
                          window.open(item.url, '_blank')
                          setIsOpen(false)
                        }
                      }}
                      className="px-3 py-2 rounded-xl hover:bg-zinc-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <div className="text-xs font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          {item.desc}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-zinc-950/60 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Navigate with mouse or keyboard</span>
          <span>ESC to close</span>
        </div>

      </div>
    </div>
  )
}
