import React, { useState } from 'react'
import {
  Code2,
  Cpu,
  Layers,
  Database,
  Terminal,
  Server,
  Sparkles,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Boxes
} from 'lucide-react'

const TECH_ITEMS = [
  {
    name: 'Java',
    category: 'Languages & DSA',
    role: 'Primary Language for DSA & Object-Oriented Systems',
    level: 'Advanced • 250+ Problems Solved',
    application:
      'Core language used for competitive programming across LeetCode, GFG, and CodeChef. Deep expertise in memory models, collections, dynamic programming, and tree/graph algorithms.',
    projects: ['Flipkart GRiD 8.0', '250+ DSA Solutions', 'System Design'],
  },
  {
    name: 'Python',
    category: 'AI / ML & Security',
    role: 'Machine Learning, AST Security Analysis & Backend Services',
    level: 'Production & Research',
    application:
      'Engineered the Infosys AI Code Review Agent using AST parsing and ML heuristics to detect 10 OWASP vulnerabilities. Built time-series predictive models with Scikit-learn and Pandas.',
    projects: ['Infosys AI Security Agent', 'Stock Predictor', 'Karyaa'],
  },
  {
    name: 'TypeScript',
    category: 'Languages & DSA',
    role: 'Type-Safe Full-Stack Architecture',
    level: 'Proficient',
    application:
      'Architected type-safe client dashboards and medical intelligence pipelines. Prevents runtime regressions and maintains clear domain interface contracts.',
    projects: ['Stroke Rehab Analysis', 'NLP Healthcare Intelligence', 'India Growth'],
  },
  {
    name: 'React.js',
    category: 'Frontend & Frameworks',
    role: 'Component Architecture, Dashboards & WebRTC Integration',
    level: 'Production-Grade',
    application:
      'Crafted high-fidelity patient/ASHA portals for SwasthyaMitra, behavioral telemetry dashboards with dark/light themes for AI Digital Twin, and interactive visualizers.',
    projects: ['SwasthyaMitra', 'AI Digital Twin', 'India Growth Dashboard'],
  },
  {
    name: 'Node.js & Express',
    category: 'Backend & Databases',
    role: 'RESTful Microservices & Real-Time Coordination',
    level: 'Production-Grade',
    application:
      'Engineered asynchronous backends handling authentication, session state, telemetric data ingestion, and role-based access control (RBAC).',
    projects: ['SwasthyaMitra Backend', 'Digital Twin API', 'Finance RBAC Backend'],
  },
  {
    name: 'MongoDB',
    category: 'Backend & Databases',
    role: 'Document Stores & Time-Series Event Ingestion',
    level: 'Production-Grade',
    application:
      'Designed flexible document schemas, indexing strategies, and aggregation pipelines for high-throughput behavioral telemetry and patient consultation records.',
    projects: ['AI Student Digital Twin', 'SwasthyaMitra DB', 'Finance RBAC'],
  },
  {
    name: 'Agora.io WebRTC',
    category: 'Backend & Databases',
    role: 'Real-Time Low-Latency Video & Audio Telephony',
    level: 'Production Integration',
    application:
      'Integrated Agora RTC SDK for reliable peer-to-peer and relayed clinical video consultations resilient to fluctuating bandwidth conditions in rural India.',
    projects: ['SwasthyaMitra Telemedicine'],
  },
  {
    name: 'Scikit-learn & ML',
    category: 'AI / ML & Security',
    role: 'Supervised Learning, Feature Engineering & Heuristics',
    level: 'Advanced',
    application:
      'Trained behavioral prediction models on 800+ student records; developed regression and classification pipelines using NumPy, Pandas, and Matplotlib.',
    projects: ['AI Student Digital Twin', 'Infosys Security Heuristics', 'Stock Prediction'],
  },
  {
    name: 'MySQL & PostgreSQL',
    category: 'Backend & Databases',
    role: 'Relational Schema Design & ACID Transactions',
    level: 'Proficient',
    application:
      'Complex joins, normalization, transactional integrity, and data analysis in PwC Launchpad and enterprise systems.',
    projects: ['PwC Launchpad Trainee', 'Enterprise DBMS'],
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend & Frameworks',
    role: 'Modern Utility-First Styling & Design Systems',
    level: 'Advanced',
    application:
      'Engineered responsive, accessible dark/light mode interfaces, micro-interactions, and glassmorphic aesthetics.',
    projects: ['AI Digital Twin', 'Portfolio 3D', 'SwasthyaMitra UI'],
  },
  {
    name: 'Git & GitHub',
    category: 'Core CS & Systems',
    role: 'Version Control, CI/CD & Collaborative Open-Source',
    level: 'Daily Driver',
    application:
      'Maintained 20+ public repositories, pull request reviews, feature branching, and team leadership during hackathons.',
    projects: ['Smart India Hackathon', 'Infosys Team Lead'],
  },
  {
    name: 'Core CS Foundations',
    category: 'Core CS & Systems',
    role: 'DSA, Operating Systems, Computer Networks, DBMS & OOP',
    level: '9.31 CGPA Distinction',
    application:
      'Rigorous academic mastery of memory management, process scheduling, TCP/IP networking, concurrency, and object-oriented software engineering principles.',
    projects: ['C. V. Raman Global Univ.', 'Flipkart GRiD 8.0'],
  },
]

const CATEGORIES = [
  'All',
  'Languages & DSA',
  'Frontend & Frameworks',
  'Backend & Databases',
  'AI / ML & Security',
  'Core CS & Systems',
]

export default function TechStackExplorer() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedTech, setSelectedTech] = useState(TECH_ITEMS[0])

  const filtered =
    activeCategory === 'All'
      ? TECH_ITEMS
      : TECH_ITEMS.filter((t) => t.category === activeCategory)

  return (
    <section id="tech-stack" className="py-16 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">Architectural Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tech Stack & Capabilities
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mt-1">
            Click on any technology to inspect Sumit's production usage, depth, and the specific projects where it was deployed.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-900/90 border border-white/[0.08] backdrop-blur-md">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-white text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Tech Grid Pills */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((item) => {
            const isSelected = selectedTech.name === item.name
            return (
              <button
                key={item.name}
                onClick={() => setSelectedTech(item)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-800/90 border-white/[0.25] shadow-lg shadow-white/5 ring-1 ring-white/10'
                    : 'bg-zinc-900/60 border-white/[0.06] hover:bg-zinc-800/50 hover:border-white/[0.12]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white tracking-tight">
                      {item.name}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                    )}
                  </div>
                  <p className="text-[10px] font-mono text-zinc-400 line-clamp-1">
                    {item.role}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[9px] font-mono text-zinc-500">
                  <span className="truncate">{item.level}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right Column: Deep Architectural Inspector Panel */}
        <div className="lg:col-span-5 rounded-[24px] bg-zinc-900/80 border border-white/[0.1] p-6 sm:p-7 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Inspector Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                {selectedTech.category}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">
                {selectedTech.name}
              </h3>
            </div>
            <div className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono text-xs font-semibold">
              {selectedTech.level}
            </div>
          </div>

          {/* Core Role */}
          <div className="mt-5 space-y-1">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              Engineering Focus
            </span>
            <p className="text-sm font-semibold text-zinc-200">
              {selectedTech.role}
            </p>
          </div>

          {/* Implementation & Application Details */}
          <div className="mt-5 space-y-1">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              Real-World Application & Architecture
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/[0.04]">
              {selectedTech.application}
            </p>
          </div>

          {/* Deployed In Projects */}
          <div className="mt-5 pt-4 border-t border-zinc-800">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
              Implemented in Key Projects:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedTech.projects.map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/80 text-xs text-cyan-300 font-mono"
                >
                  ✓ {p}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
