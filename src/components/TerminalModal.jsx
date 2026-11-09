import React, { useState, useRef, useEffect } from 'react'
import {
  Terminal as TerminalIcon,
  X,
  Minus,
  Maximize2,
  CornerDownLeft,
  Sparkles,
  ExternalLink,
  Download
} from 'lucide-react'
import { sound } from '../utils/audio'

const INITIAL_WELCOME = [
  '═══════════════════════════════════════════════════════════════',
  '  SUMIT KUMAR SINGH — ARCHITECTURAL DEVELOPER TERMINAL [sks-cli]',
  '  B.Tech CSE (AI/ML) • C. V. Raman Global University • CGPA: 9.31',
  '  Flipkart GRiD 8.0 National Semi-Finalist (Top 0.1% of 170k+)',
  '═══════════════════════════════════════════════════════════════',
  'Type "help" to display available commands. Try "projects", "dsa", "resume", or "grid8".',
  ''
]

const COMMANDS = {
  help: `Available Commands:
  • help       - Display this list of interactive commands
  • whoami     - Developer dossier, education, and credentials
  • projects   - Curated flagship software systems & live demos
  • dsa        - Competitive programming telemetry (LeetCode, CodeChef)
  • skills     - Technical architecture competencies & tooling
  • grid8      - Flipkart GRiD 8.0 National Semi-Finalist debrief
  • resume     - Open official PDF dossier modal
  • contact    - Direct communication channels & social handles
  • theme      - Cycle terminal cybernetic theme [cyan | emerald | amber]
  • clear      - Clear terminal output
  • exit       - Close developer terminal session`,

  whoami: `DEVELOPER DOSSIER:
  Name       : Sumit Kumar Singh
  Role       : AI/ML & Full-Stack Systems Engineer
  Education  : B.Tech in Computer Science & Engineering (AI/ML)
  Institute  : C. V. Raman Global University, Bhubaneswar (2023 - 2027)
  Academic   : 9.31 / 10 CGPA (Consistent First Class with Distinction)
  Key Honors : Flipkart GRiD 8.0 National Semi-Finalist (Top 0.1% of 170k+ Candidates)
  Location   : Bhubaneswar / Jamshedpur, India`,

  grid8: `FLIPKART GRiD 8.0 NATIONAL SEMI-FINALIST:
  • Scale        : Selected among top semi-finalists out of 170,000+ national candidates
  • Percentile   : Top 0.1% nation-wide
  • Domain       : Enterprise autonomous systems & intelligent logistics
  • Problem Solved: Real-time inventory routing heuristics under extreme edge cases`,

  dsa: `COMPETITIVE PROGRAMMING TELEMETRY:
  • Total Solved : 250+ Algorithmic Challenges (Java Primary)
  • LeetCode     : 206 Solved (@SKSINGH243)
                   - Easy   : 93
                   - Medium : 97
                   - Hard   : 16
  • CodeChef     : @sumit_x_ai_24 (Division 3 Competitor)
  • Codolio      : @sumitxai (Consolidated Dossier)
  • Codeforces   : @sumitksingh243`,

  skills: `ARCHITECTURAL TECH STACK:
  • Languages  : Java (Core DSA), Python (ML/Data), JavaScript (ESNext), SQL
  • Frameworks : React.js, Vite, Node.js, Express.js, Tailwind CSS, Streamlit
  • AI & ML    : PyTorch, Scikit-Learn, AST Static Analysis, NLP, Heuristics
  • Systems    : WebRTC (Agora/PeerJS), REST APIs, Git, Linux, Docker, SQLite
  • Cloud & DB : MongoDB Atlas, Vercel, Supabase, SQLite3`,

  contact: `DIRECT CONTACT CHANNELS:
  • Email    : sumitksingh243@gmail.com
  • GitHub   : https://github.com/SumitKSinghDev
  • LinkedIn : https://www.linkedin.com/in/sumit-kumar-singh-0462b92b6
  • LeetCode : https://leetcode.com/u/SKSINGH243/`
}

export default function TerminalModal({ isOpen, onClose, onOpenResume }) {
  const [history, setHistory] = useState(INITIAL_WELCOME)
  const [inputVal, setInputVal] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [theme, setTheme] = useState('cyan') // cyan | emerald | amber

  const inputRef = useRef(null)
  const terminalEndRef = useRef(null)

  // Auto focus input on modal open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Scroll to bottom when history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  // Toggle with keyboard backtick (`) or ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          sound.playClick()
          // Open triggered by parent state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase()
    sound.playClick()

    if (!cmd) return

    setCmdHistory((prev) => [...prev, rawCmd])
    setHistoryIdx(-1)

    const newHistory = [...history, `sumit@cloud:~$ ${rawCmd}`]

    if (cmd === 'clear') {
      setHistory([])
      setInputVal('')
      return
    }

    if (cmd === 'exit') {
      onClose()
      return
    }

    if (cmd === 'resume') {
      newHistory.push('→ Opening Sumit Kumar Singh Official Resume Dossier...')
      setHistory(newHistory)
      setInputVal('')
      if (onOpenResume) {
        setTimeout(onOpenResume, 300)
      }
      return
    }

    if (cmd === 'theme') {
      const themes = ['cyan', 'emerald', 'amber']
      const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length]
      setTheme(nextTheme)
      newHistory.push(`→ Switched terminal theme palette to: [${nextTheme.toUpperCase()}]`)
      setHistory(newHistory)
      setInputVal('')
      return
    }

    if (cmd === 'projects') {
      newHistory.push(`CURATED FLAGSHIP SYSTEMS:
  1. AI Student Digital Twin
     Live Demo : https://digitaltwin-ai.vercel.app/
     Source    : https://github.com/SumitKSinghDev/DigitalTwin
  2. जनCare (JanCare) — Clinical Healthcare OS
     Live Demo : https://jancare.vercel.app
     Source    : https://github.com/SumitKSinghDev/JanCare
  3. SwasthyaMitra — Rural Telemedicine & NABHA Cards
     Live Demo : https://swasthyamitra.vercel.app
     Source    : https://github.com/SumitKSinghDev/SWASTHYAMITRA
  4. Karyaa — Study & Work Productivity Engine
     Live Demo : https://karyaa.streamlit.app/
     Source    : https://github.com/SumitKSinghDev/Karyaa
  5. Smart Code Inspection & Vulnerability Detection Agent
     Live Demo : https://codeguard-agent.vercel.app/
     Source    : https://github.com/SumitKSinghDev/Development-of-Smart-Code-Inspection-Platform-with-Vulnerability-Detection-System`)
      setHistory(newHistory)
      setInputVal('')
      return
    }

    if (COMMANDS[cmd]) {
      newHistory.push(COMMANDS[cmd])
    } else {
      newHistory.push(`command not found: "${cmd}". Type "help" for a list of executable commands.`)
    }

    setHistory(newHistory)
    setInputVal('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1)
      setHistoryIdx(nextIdx)
      setInputVal(cmdHistory[nextIdx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx === -1) return
      const nextIdx = historyIdx + 1
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1)
        setInputVal('')
      } else {
        setHistoryIdx(nextIdx)
        setInputVal(cmdHistory[nextIdx])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const available = ['help', 'whoami', 'projects', 'dsa', 'skills', 'grid8', 'resume', 'contact', 'theme', 'clear', 'exit']
      const match = available.find((c) => c.startsWith(inputVal.trim().toLowerCase()))
      if (match) setInputVal(match)
    }
  }

  // Theme palettes
  const themeColors = {
    cyan: {
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      prompt: 'text-cyan-300',
      glow: 'shadow-cyan-500/10'
    },
    emerald: {
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      prompt: 'text-emerald-300',
      glow: 'shadow-emerald-500/10'
    },
    amber: {
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      prompt: 'text-amber-300',
      glow: 'shadow-amber-500/10'
    }
  }

  const activeTheme = themeColors[theme]

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

      {/* Terminal Window */}
      <div
        className={`relative w-full max-w-4xl h-[78vh] bg-zinc-950/95 border ${activeTheme.border} rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 backdrop-blur-2xl ${activeTheme.glow}`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Window Title Bar */}
        <div className="px-4 py-3 bg-zinc-900/90 border-b border-white/[0.08] flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                sound.playClick()
                onClose()
              }}
              className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-400 transition-colors"
              title="Close (ESC)"
            />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-zinc-400 ml-3 flex items-center space-x-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-zinc-500" />
              <span>sumit@portfolio: ~ (sks-cli v2.4.0)</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCommand('theme')}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.06] transition-colors"
            >
              theme: {theme}
            </button>
            <button
              onClick={() => {
                sound.playClick()
                onClose()
              }}
              className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Screen & History */}
        <div className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-y-auto space-y-1.5 bg-black/70 text-zinc-300">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap leading-relaxed ${
                line.startsWith('sumit@cloud:~$')
                  ? `${activeTheme.prompt} font-semibold`
                  : line.startsWith('═')
                  ? 'text-zinc-600'
                  : line.startsWith('  SUMIT')
                  ? `${activeTheme.text} font-bold`
                  : line.startsWith('→')
                  ? 'text-cyan-300'
                  : line.startsWith('command not found')
                  ? 'text-rose-400'
                  : 'text-zinc-300'
              }`}
            >
              {line}
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="flex items-center space-x-2 pt-1">
            <span className={`${activeTheme.prompt} font-semibold shrink-0`}>
              sumit@cloud:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white font-mono text-xs sm:text-sm caret-cyan-400"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer Quick Bar */}
        <div className="px-4 py-2 border-t border-white/[0.06] bg-zinc-900/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center space-x-3">
            <span>Quick:</span>
            {['projects', 'dsa', 'whoami', 'resume', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="hover:text-cyan-300 transition-colors underline decoration-dotted"
              >
                {cmd}
              </button>
            ))}
          </div>
          <span className="hidden sm:inline">Press TAB to autocomplete • ` key to toggle</span>
        </div>
      </div>
    </div>
  )
}
