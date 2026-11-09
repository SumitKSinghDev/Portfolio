import React, { useState } from 'react'
import {
  Brain,
  HeartPulse,
  Github,
  ExternalLink,
  Sparkles,
  Layers,
  Activity,
  ArrowRight,
  ShieldCheck,
  Video,
  Database,
  MapPin,
  Cpu,
  CheckCircle2,
  Sliders,
  AlertTriangle
} from 'lucide-react'

export default function FlagshipShowcase() {
  // Simulator State for AI Digital Twin
  const [studyHours, setStudyHours] = useState(6)
  const [focusConsistency, setFocusConsistency] = useState(78)
  const [taskComplexity, setTaskComplexity] = useState('Medium')

  // Calculate dynamic telemetry based on sliders
  const complexityMultiplier = taskComplexity === 'High' ? 1.35 : taskComplexity === 'Medium' ? 1.0 : 0.75
  const rawBurnout = Math.min(
    100,
    Math.max(
      8,
      Math.round((studyHours * 8.5 * complexityMultiplier) - (focusConsistency * 0.35))
    )
  )
  const productivityScore = Math.min(
    99,
    Math.max(
      15,
      Math.round((focusConsistency * 0.7) + (studyHours * 4.5) - (rawBurnout * 0.25))
    )
  )

  let advisory = ''
  if (rawBurnout > 70) {
    advisory = 'High cognitive strain detected. Recommend 30-minute restorative break and workload pacing.'
  } else if (rawBurnout > 40) {
    advisory = 'Optimal productive resistance. Maintain periodic micro-breaks every 50 minutes.'
  } else {
    advisory = 'Deep flow state sustained with minimal fatigue index. High retention phase.'
  }

  // Interactive Stage State for JanCare
  const [activeStage, setActiveStage] = useState(2)

  const JANCARE_STAGES = [
    {
      num: '01',
      title: 'First Symptom',
      role: 'Patient / Community',
      desc: 'Early clinical distress identification reported by patient or rural community member.',
      tech: 'Mobile Web Interface',
    },
    {
      num: '02',
      title: 'ASHA Registration',
      role: 'Frontline Health Worker',
      desc: 'Offline-first intake caching on low-bandwidth field tablets with background cloud sync.',
      tech: 'IndexedDB & Firebase',
    },
    {
      num: '03',
      title: 'Gemini AI Triage',
      role: 'AI Diagnostic Engine',
      desc: 'Zero-shot clinical reasoning and urgency stratification using Google Gemini AI models.',
      tech: '@google/generative-ai',
    },
    {
      num: '04',
      title: 'Daily.co WebRTC Video',
      role: 'PHC Doctor Teleconsultation',
      desc: 'High-reliability peer/mesh video conferencing resilient to 2G/3G connectivity drops.',
      tech: '@daily-co/daily-js',
    },
    {
      num: '05',
      title: 'Clinical Decisions',
      role: 'Physician Portal',
      desc: 'Standardized digital prescription authoring and differential diagnosis verification.',
      tech: 'Next.js 16 + React 19',
    },
    {
      num: '06',
      title: 'Medicine Stock Check',
      role: 'PHC Dispensary',
      desc: 'Real-time validation against rural primary healthcare center inventory buffers.',
      tech: 'MongoDB Atlas',
    },
    {
      num: '07',
      title: 'GIS Referral & Follow-up',
      role: 'Continuity of Care',
      desc: 'Spatial patient mapping across Maharashtra rural healthcare networks for frontline visits.',
      tech: 'Leaflet GIS Maps',
    },
  ]

  return (
    <section id="flagships" className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/80">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest">Flagship Software Architectures</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Systems Engineered for Real Impact
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Deep-dive exhibits into Sumit's two primary systems: an AI cognitive behavioral telemetry twin, and an offline-first rural healthcare platform powered by Next.js 16 and Gemini AI.
        </p>
      </div>

      <div className="space-y-16">
        
        {/* ================================================================= */}
        {/* FLAGSHIP 1: AI STUDENT DIGITAL TWIN                               */}
        {/* ================================================================= */}
        <div
          id="flagship-digital-twin"
          className="rounded-[32px] bg-gradient-to-b from-zinc-900/90 via-zinc-950/90 to-black border border-white/[0.1] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                    FLAGSHIP 01
                  </span>
                  <span className="text-xs font-mono text-zinc-500">MAY 2026</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                  AI Student Digital Twin
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/SumitKSinghDev/DigitalTwin"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-white transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View Source Repository</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
            
            {/* Left Column: Architectural Dossier */}
            <div className="lg:col-span-6 space-y-4">
              <p className="text-zinc-300 text-sm leading-relaxed">
                A behavioral telemetry and cognitive analytics platform designed to solve student academic burnout before it causes failure. Trained on an empirical dataset of <strong className="text-white">800+ student learning profiles</strong>, it provides real-time focus tracking and behavioral intervention.
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Core Architectural Innovations:
                </span>
                <div className="space-y-2 text-xs text-zinc-400">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong className="text-zinc-200">Behavioral Prediction Model</strong>: Analyzes multi-factor telemetry (duration, cognitive load, consistency) to predict fatigue inflection points.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong className="text-zinc-200">"Talk to Twin" AI Module</strong>: Real-time conversational interface where students chat with their algorithmic twin for productivity coaching.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong className="text-zinc-200">Real-Time Telemetry Dashboards</strong>: High-performance Chart.js visualizers with zero-latency responsive theme switching.</span>
                  </div>
                </div>
              </div>

              {/* Stack Pills */}
              <div className="pt-4 border-t border-zinc-800/80">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                  Production Stack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Chart.js'].map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/[0.08] text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Telemetry Simulator */}
            <div className="lg:col-span-6 rounded-2xl bg-zinc-950/80 border border-white/[0.08] p-6 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Live Telemetry Model Simulator
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 animate-pulse">
                  ● MODEL ACTIVE
                </span>
              </div>

              {/* Interactive Controls */}
              <div className="space-y-4 my-5 text-xs">
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1 font-mono">
                    <span>Study Session Duration:</span>
                    <span className="text-white font-bold">{studyHours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={studyHours}
                    onChange={(e) => setStudyHours(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-1 font-mono">
                    <span>Focus Consistency:</span>
                    <span className="text-white font-bold">{focusConsistency}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={focusConsistency}
                    onChange={(e) => setFocusConsistency(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-1.5 font-mono">
                    <span>Cognitive Complexity:</span>
                    <span className="text-white font-bold">{taskComplexity}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['Low', 'Medium', 'High'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setTaskComplexity(lvl)}
                        className={`py-1.5 rounded-lg text-xs font-mono transition-all ${
                          taskComplexity === lvl
                            ? 'bg-cyan-500 text-zinc-950 font-bold'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Telemetry Calculation Output */}
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Burnout Risk</div>
                    <div className={`text-xl font-extrabold mt-0.5 ${rawBurnout > 70 ? 'text-rose-400' : rawBurnout > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {rawBurnout}%
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Productivity Index</div>
                    <div className="text-xl font-extrabold text-cyan-400 mt-0.5">
                      {productivityScore}/100
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-[11px] text-zinc-300 font-mono flex items-start space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{advisory}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================================================================= */}
        {/* FLAGSHIP 2: जनCare (JanCare) HEALTHCARE PLATFORM                  */}
        {/* ================================================================= */}
        <div
          id="flagship-jancare"
          className="rounded-[32px] bg-gradient-to-b from-zinc-900/90 via-zinc-950/90 to-black border border-white/[0.1] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    FLAGSHIP 02
                  </span>
                  <span className="text-xs font-mono text-zinc-500">NEXT.JS 16 • GEMINI AI</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                  जनCare (JanCare)
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/SumitKSinghDev/JanCare"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-white transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View Source Repository</span>
              </a>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
                An AI-assisted, offline-first healthcare coordination platform designed specifically for rural and underserved communities in Maharashtra. Engineered around the complete continuum of care: from frontline ASHA field reports to Gemini AI clinical triage and WebRTC telemedicine consultations.
              </p>
            </div>

            {/* Interactive 7-Stage Clinical Journey Visualizer */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  Interactive End-to-End Care Continuum (Click any stage):
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  Stage {activeStage + 1} of 7: {JANCARE_STAGES[activeStage].title}
                </span>
              </div>

              {/* Stage Progress Bar / Stepper */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {JANCARE_STAGES.map((stg, idx) => (
                  <button
                    key={stg.num}
                    onClick={() => setActiveStage(idx)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeStage === idx
                        ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                        : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    <div className="font-mono text-[10px] text-zinc-500">STEP {stg.num}</div>
                    <div className="text-xs font-bold truncate mt-0.5">{stg.title}</div>
                  </button>
                ))}
              </div>

              {/* Stage Detail Box */}
              <div className="mt-4 p-5 rounded-2xl bg-zinc-950/90 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold">
                    <span>ROLE: {JANCARE_STAGES[activeStage].role}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {JANCARE_STAGES[activeStage].title}
                  </h4>
                  <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
                    {JANCARE_STAGES[activeStage].desc}
                  </p>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-emerald-300 shrink-0">
                  {JANCARE_STAGES[activeStage].tech}
                </div>
              </div>
            </div>

            {/* Architecture Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.04]">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Gemini AI Triage</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
                  Integrates <code className="text-emerald-300">@google/generative-ai</code> for intelligent preliminary clinical severity assessment and referral grading.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.04]">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Daily.co WebRTC Video</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
                  Browser-based high-resilience video consultations with PHC doctors using <code className="text-cyan-300">@daily-co/daily-js</code> with offline fallback.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.04]">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Leaflet GIS Mapping</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
                  Interactive spatial mapping of primary health centers, inventory buffers, and frontline ASHA worker coverage across Maharashtra.
                </p>
              </div>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['Next.js 16', 'React 19', 'TypeScript', 'Google Gemini AI', 'Daily.co WebRTC', 'Leaflet', 'MongoDB Atlas', 'Firebase', 'Tailwind CSS v4'].map((t) => (
                <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/[0.08] text-zinc-300">
                  {t}
                </span>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
