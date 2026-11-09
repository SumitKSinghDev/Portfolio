import React, { useState } from 'react'
import {
  Folder,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Activity,
  HeartPulse,
  Brain,
  Globe,
  Sliders,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react'
import ProjectDetailDrawer from './ProjectDetailDrawer'
import { sound } from '../utils/audio'

const CURATED_PROJECTS = [
  {
    id: 'digital-twin',
    title: 'AI Student Digital Twin',
    tagline: 'Behavioral Analytics, Focus Consistency & Burnout Telemetry Platform',
    category: 'AI & Machine Learning',
    featured: true,
    github: 'https://github.com/SumitKSinghDev/DigitalTwin',
    liveUrl: 'https://digitaltwin-ai.vercel.app/',
    icon: Brain,
    accent: 'cyan',
    metrics: '800+ Student Sessions • Live Telemetry',
    summary:
      'Engineered an AI-driven behavioral telemetry platform tracking cognitive focus consistency, academic fatigue, and study burnout risk. Features real-time multi-dimensional scoring and an interactive "Talk to Twin" conversational mentor module.',
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Chart.js'],
    architecturalHighlights: [
      'Trained behavioral prediction heuristics on 800+ student study sessions for burnout detection',
      'Dynamic telemetry engine tracking daily focus ratio, cognitive fatigue, and academic velocity',
      'Integrated conversational AI mentor intervention layer providing adaptive study recommendations',
    ],
    systemFlow: [
      {
        layer: 'Client Experience',
        tech: 'React 18 + Tailwind + Chart.js',
        description: 'Real-time telemetry dashboard with reactive metric charts, study session logs, and interactive AI avatar assistant.'
      },
      {
        layer: 'Ingestion & Telemetry API',
        tech: 'Node.js + Express REST Endpoints',
        description: 'Validates and timestamps session telemetry, focus timestamps, and break interval frequency.'
      },
      {
        layer: 'Predictive Intelligence',
        tech: 'Heuristic Behavioral Models',
        description: 'Calculates cognitive fatigue index and predicts burnout trajectory before academic drop-off occurs.'
      },
      {
        layer: 'Persistence & Historical Analytics',
        tech: 'MongoDB Atlas',
        description: 'Stores indexed session archives, longitudinal trend vectors, and personalized study profile metrics.'
      }
    ],
    tradeoffs: [
      {
        decision: 'Client-side reactive charting with Chart.js over heavy D3 canvas',
        rationale: 'Delivers instantaneous 60fps telemetry graph rendering on student mobile devices with minimal bundle footprint.'
      },
      {
        decision: 'Lightweight heuristic burnout scoring instead of oversized cloud LLM calls for every log',
        rationale: 'Guarantees sub-50ms latency for real-time focus updates while reserving LLM inference strictly for conversational mentoring.'
      }
    ]
  },
  {
    id: 'jancare',
    title: 'जनCare (JanCare) — Clinical Healthcare OS',
    tagline: 'Dual-Layer Clinical Continuum for Rural Clinics & District Hospitals',
    category: 'Full-Stack Systems',
    featured: true,
    github: 'https://github.com/SumitKSinghDev/JanCare',
    liveUrl: 'https://jancare.vercel.app',
    icon: HeartPulse,
    accent: 'emerald',
    metrics: '7-Stage Continuum • Zero Data Loss Ingestion',
    summary:
      'Engineered an enterprise-grade clinical management system bridging grassroots sub-health centres and district referral hospitals. Eliminates paper registries through a 7-stage digital continuum with multi-lingual patient portals and triage classification.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Lucide'],
    architecturalHighlights: [
      'Architected end-to-end 7-stage patient lifecycle from community triage to discharge',
      'Implemented real-time doctor appointment queue with priority emergency sorting',
      'Engineered offline-resilient clinical data caching with automated conflict resolution',
    ],
    systemFlow: [
      {
        layer: 'Frontline Clinical Interface',
        tech: 'React 18 + Responsive Glass UI',
        description: 'Sub-second patient intake, vitals entry, multi-lingual symptoms checklist, and doctor queue management.'
      },
      {
        layer: 'Triage & Allocation Service',
        tech: 'Node.js Queue Orchestrator',
        description: 'Sorts patient intake by clinical acuity (Emergency, Urgent, Routine) and assigns to active doctor stations.'
      },
      {
        layer: 'Clinical Documentation & Prescription',
        tech: 'Express.js REST APIs',
        description: 'Generates standardized digital prescription cards with drug interaction checking and pharmacy routing.'
      },
      {
        layer: 'District Health Data Store',
        tech: 'MongoDB Atlas Cluster',
        description: 'Normalized patient health records, diagnostic scan metadata, and longitudinal epidemiological tracking.'
      }
    ],
    tradeoffs: [
      {
        decision: 'Normalized sub-health centre records with optimistic client cache',
        rationale: 'Guarantees rural health workers can register patients during intermittent network drops without losing vitals.'
      },
      {
        decision: 'Role-based access partitioning for ASHA workers vs District Medical Officers',
        rationale: 'Protects patient privacy while granting physicians instant access to emergency medical history.'
      }
    ]
  },
  {
    id: 'swasthyamitra',
    title: 'SwasthyaMitra Healthcare Platform',
    tagline: 'WebRTC Telemedicine & NABHA Digital Health ID for Rural India (SIH)',
    category: 'Full-Stack Systems',
    featured: true,
    github: 'https://github.com/SumitKSinghDev/SWASTHYAMITRA',
    liveUrl: 'https://swasthyamitra.vercel.app',
    icon: Activity,
    accent: 'rose',
    metrics: '6-Member Team Lead • SIH Innovation',
    summary:
      'Led a 6-member engineering team for the Smart India Hackathon. Built a rural telemedicine platform featuring QR-based NABHA Health Cards, multi-language consultations (Hindi, Punjabi, English), and low-bandwidth WebRTC video calling.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'WebRTC', 'Material-UI', 'Express.js'],
    architecturalHighlights: [
      'NABHA Health Card System: Instant QR code-based digital identity for rural citizens',
      'Engineered low-bandwidth adaptive WebRTC streaming with automatic video downgrade on 3G',
      'Designed multi-role portal supporting Patients, Doctors, ASHA workers, and Local Pharmacies',
    ],
    systemFlow: [
      {
        layer: 'Community Access Layer',
        tech: 'React.js + Multilingual Engine',
        description: 'Trilingual UI (English, Hindi, Punjabi) with voice-guided navigation for low-literacy patient empowerment.'
      },
      {
        layer: 'Identity & NABHA Generator',
        tech: 'QR Code Hash + Cryptographic IDs',
        description: 'Generates scannable NABHA cards linking patient medical history across disparate rural clinic visits.'
      },
      {
        layer: 'Real-Time Consultation Stream',
        tech: 'WebRTC Peer & SFU Media Server',
        description: 'Ultra-low latency audio/video consultation with dynamic resolution adaptation down to 64kbps.'
      },
      {
        layer: 'Prescription & Pharmacy Sync',
        tech: 'Node.js + MongoDB Store',
        description: 'Instant prescription delivery to partner village pharmacies for immediate medicine fulfillment.'
      }
    ],
    tradeoffs: [
      {
        decision: 'Adaptive bit-rate WebRTC over standard video conference protocols',
        rationale: 'Ensures tele-consultations do not disconnect when villagers have poor cellular reception in remote regions.'
      },
      {
        decision: 'Lightweight QR code tokens for patient identification',
        rationale: 'Eliminates reliance on physical paper files and prevents patient duplication across community health centres.'
      }
    ]
  },
  {
    id: 'karyaa',
    title: 'Karyaa — Study & Work Productivity Engine',
    tagline: 'Interactive Daily & Weekly Task Orchestrator with Subject Analytics',
    category: 'Productivity & Tools',
    featured: true,
    github: 'https://github.com/SumitKSinghDev/Karyaa',
    liveUrl: 'https://karyaa.streamlit.app/',
    icon: CalendarCheck,
    accent: 'purple',
    metrics: 'Daily/Weekly Planning • SQLite Engine',
    summary:
      'A comprehensive productivity and self-regulation dashboard engineered to manage academic workload, track daily task completion, visualize subject-wise study velocity, and maintain long-term goal accountability.',
    tech: ['Python 3.11', 'Streamlit', 'SQLite3', 'Pandas', 'Plotly', 'NumPy'],
    architecturalHighlights: [
      'Dual-horizon planning system with integrated Daily and 7-day Weekly task schedulers',
      'SQLite relational database schema with dedicated tables for Tasks, Goals, and Subject Progress',
      'Interactive Plotly visualizations tracking planned vs actual study hours across subjects',
    ],
    systemFlow: [
      {
        layer: 'Streamlit Reactive UI',
        tech: 'Python + Custom CSS Styling',
        description: 'Rapid-interaction dashboard with collapsible task trees, goal deadline counters, and instant state reactivity.'
      },
      {
        layer: 'Data Wrangling & Metrics Engine',
        tech: 'Pandas + NumPy',
        description: 'Calculates rolling subject completion percentages, planned-versus-spent hours, and productivity velocity.'
      },
      {
        layer: 'Relational Persistence',
        tech: 'Embedded SQLite3 Database',
        description: 'Zero-configuration transactional storage with foreign keys connecting tasks to macro academic milestones.'
      },
      {
        layer: 'Visual Telemetry',
        tech: 'Plotly Interactive Graphs',
        description: 'Dynamic burn-up charts and subject distribution donuts tracking progress against university milestones.'
      }
    ],
    tradeoffs: [
      {
        decision: 'Embedded SQLite engine over client browser LocalStorage',
        rationale: 'Guarantees full relational integrity between tasks, macro goals, and subject hours without data size caps.'
      },
      {
        decision: 'Streamlit framework for full Python scientific ecosystem integration',
        rationale: 'Enables direct computation with Pandas and NumPy for deep time-series productivity analytics.'
      }
    ]
  },
  {
    id: 'code-inspection',
    title: 'Smart Code Review & Security Analysis Agent',
    tagline: 'AST Static Analysis & Vulnerability Detection (Infosys Springboard 7.0)',
    category: 'Security & AI',
    featured: true,
    github:
      'https://github.com/SumitKSinghDev/Development-of-Smart-Code-Inspection-Platform-with-Vulnerability-Detection-System',
    liveUrl: 'https://codeguard-agent.vercel.app/',
    icon: ShieldAlert,
    accent: 'emerald',
    metrics: '85% Audit Time Cut • 10 OWASP Classes',
    summary:
      'Led the AI project during Infosys Springboard Virtual Internship 7.0. Developed an automated code inspection engine using Abstract Syntax Tree (AST) parsing and heuristics to detect security vulnerabilities across code repositories.',
    tech: ['Python', 'AST Parsing', 'Machine Learning', 'OWASP Top 10', 'Static Analysis', 'React'],
    architecturalHighlights: [
      'Detects 10 OWASP vulnerability categories including SQL Injection, insecure deserialization, and leaked secrets',
      'Cut manual code audit overhead by an estimated 85% on tested benchmark repositories',
      'Generates actionable, prioritized remediation guidance with exact source file line numbers',
    ],
    systemFlow: [
      {
        layer: 'Repository Ingestion',
        tech: 'Git Tree & File Parser',
        description: 'Scans source trees, normalizes codebases, and segments multi-language files into syntax tokens.'
      },
      {
        layer: 'Abstract Syntax Tree (AST) Engine',
        tech: 'Python ast / Tree-Sitter',
        description: 'Constructs semantic syntax graphs to trace untrusted inputs directly to sink execution points.'
      },
      {
        layer: 'Vulnerability Detection Pipeline',
        tech: 'OWASP Heuristic Classifiers',
        description: 'Matches taint-flow patterns against OWASP Top 10 rulesets for SQLi, XSS, and authorization flaws.'
      },
      {
        layer: 'Remediation & Report Dashboard',
        tech: 'React + Interactive Inspector',
        description: 'Presents line-by-line diff highlights, vulnerability severity rating (CVSS), and one-click code patches.'
      }
    ],
    tradeoffs: [
      {
        decision: 'AST graph traversal over simplistic regex pattern matching',
        rationale: 'Eliminated over 70% of false positives by understanding true variable scope and execution flow rather than keyword matching.'
      },
      {
        decision: 'Prioritized severity indexing (CVSS score weighting)',
        rationale: 'Prevents developer alert fatigue by surfacing critical remote code execution flaws first before stylistic warnings.'
      }
    ]
  }
]

const CATEGORIES = ['All', 'AI & Machine Learning', 'Full-Stack Systems', 'Productivity & Tools', 'Security & AI']

export default function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeProject, setActiveProject] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const filteredProjects =
    selectedCategory === 'All'
      ? CURATED_PROJECTS
      : CURATED_PROJECTS.filter((p) => p.category === selectedCategory)

  const handleOpenDrawer = (project) => {
    sound.playWhoosh()
    setActiveProject(project)
    setIsDrawerOpen(true)
  }

  return (
    <section id="projects" className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-2">
            <Folder className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">Flagship Software Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Curated High-Impact Projects
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl mt-1">
            Engineered with deep architecture, production robustness, and real-world domain application. Every system features both a live deployed website and open-source GitHub repository.
          </p>
        </div>

        {/* Total Curated Pill */}
        <div className="flex items-center space-x-2 p-2 px-3 rounded-2xl bg-zinc-900/90 border border-white/[0.08] backdrop-blur-md self-start md:self-auto font-mono text-xs text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Curated Flagships:</span>
          <span className="text-white font-bold">5 Systems</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick()
              setSelectedCategory(cat)
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-white text-zinc-950 font-bold shadow-lg shadow-white/10'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/[0.06] hover:border-white/[0.12]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const Icon = project.icon || Layers

          return (
            <div
              key={project.id}
              className="group relative rounded-3xl bg-zinc-900/60 border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-xl shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1"
            >
              {/* Card Accent Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />

              {/* Card Content Top */}
              <div className="p-6 space-y-4">
                
                {/* Meta Top Bar */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-zinc-800/80 border border-white/[0.08] flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-500/30 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-800/60 px-2.5 py-1 rounded-lg border border-white/[0.04]">
                    {project.category}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {project.tagline}
                  </p>
                </div>

                {/* Key Metrics Pill */}
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/40 border border-white/[0.06] text-[11px] font-mono text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{project.metrics}</span>
                </div>

                {/* Summary */}
                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-950/80 text-zinc-400 border border-white/[0.04]"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-950/80 text-zinc-500">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

              </div>

              {/* Card Actions Bottom: Both View Website & View Source & Architecture Drawer */}
              <div className="p-4 px-6 bg-zinc-950/60 border-t border-white/[0.06] space-y-2">
                
                {/* Two Primary Action Buttons: View Website + View Source */}
                <div className="grid grid-cols-2 gap-2">
                  {/* View Website Button */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playChime()}
                    className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-all shadow-sm group/btn"
                  >
                    <Globe className="w-3.5 h-3.5 text-zinc-900" />
                    <span>View Website</span>
                    <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>

                  {/* View Source Button */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/[0.1] text-zinc-300 hover:text-white font-medium text-xs transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Source</span>
                  </a>
                </div>

                {/* System Architecture Drawer Trigger */}
                <button
                  onClick={() => handleOpenDrawer(project)}
                  className="w-full flex items-center justify-center space-x-1.5 py-1.5 text-[11px] font-mono text-zinc-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-zinc-900/60"
                >
                  <Layers className="w-3 h-3" />
                  <span>Inspect System Architecture & Flow</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>

              </div>

            </div>
          )
        })}
      </div>

      {/* Deep Architecture Drawer Modal */}
      <ProjectDetailDrawer
        project={activeProject}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

    </section>
  )
}
