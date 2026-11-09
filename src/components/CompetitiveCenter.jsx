import React from 'react'
import {
  Code2,
  ExternalLink,
  Trophy,
  CheckCircle2,
  Sparkles,
  Flame,
  Layers,
  Terminal,
  Activity
} from 'lucide-react'
import ActivitySphere3D from './ActivitySphere3D'

const PROFILES = [
  {
    name: 'LeetCode',
    handle: 'SKSINGH243',
    url: 'https://leetcode.com/u/SKSINGH243/',
    metric: '206 Solved',
    subtext: '93 Easy • 97 Medium • 16 Hard',
    color: 'amber',
    iconText: 'LC',
  },
  {
    name: 'CodeChef',
    handle: 'sumit_x_ai_24',
    url: 'https://www.codechef.com/users/sumit_x_ai_24',
    metric: 'Active Competitor',
    subtext: 'Rated Contests & Star Division',
    color: 'orange',
    iconText: 'CC',
  },
  {
    name: 'Codolio Unified',
    handle: 'sumitxai',
    url: 'https://codolio.com/profile/sumitxai',
    metric: 'Consolidated Dossier',
    subtext: 'Aggregated Cross-Platform Telemetry',
    color: 'cyan',
    iconText: 'CO',
  },
  {
    name: 'Codeforces',
    handle: 'sumitksingh243',
    url: 'https://codeforces.com/profile/sumitksingh243',
    metric: 'Contest Participant',
    subtext: 'Algorithmic Speed & Systems Logic',
    color: 'blue',
    iconText: 'CF',
  },
]

const DSA_DOMAINS = [
  { topic: 'Dynamic Programming & Memoization', count: '45+ Solved', level: 'Advanced' },
  { topic: 'Binary Trees, BST & Trie', count: '40+ Solved', level: 'Advanced' },
  { topic: 'Graph Theory (BFS, DFS, Dijkstra)', count: '35+ Solved', level: 'Advanced' },
  { topic: 'Arrays, Two Pointers & Sliding Window', count: '60+ Solved', level: 'Mastery' },
  { topic: 'Greedy, Heaps & Priority Queues', count: '30+ Solved', level: 'Proficient' },
  { topic: 'Binary Search & Math Heuristics', count: '40+ Solved', level: 'Mastery' },
]

export default function CompetitiveCenter() {
  return (
    <section id="dsa" className="py-16 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-2">
            <Code2 className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">Algorithmic Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Competitive Programming Command Center
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mt-1">
            Over <strong className="text-white">250+ Data Structures & Algorithms problems solved</strong> primarily in Java across LeetCode, CodeChef, and Codeforces.
          </p>
        </div>

        {/* Global LeetCode Pill */}
        <div className="flex items-center space-x-2 p-2 px-3 rounded-2xl bg-zinc-900/90 border border-white/[0.08] backdrop-blur-md self-start md:self-auto font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-zinc-300">LeetCode Solved:</span>
          <span className="text-amber-400 font-bold">206 Total</span>
        </div>
      </div>

      {/* 4 Profile Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PROFILES.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-zinc-900/60 border border-white/[0.08] hover:border-white/[0.2] transition-all group backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                  {p.iconText}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              </div>

              <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {p.name}
              </h4>
              <p className="text-xs font-mono text-cyan-400 mt-0.5">
                @{p.handle}
              </p>

              <div className="mt-4 pt-3 border-t border-zinc-800/80">
                <div className="text-sm font-bold text-zinc-100">
                  {p.metric}
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5 font-mono">
                  {p.subtext}
                </div>
              </div>
            </div>

            <div className="mt-4 text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors flex items-center gap-1">
              <span>View Verified Handle</span>
              <span>→</span>
            </div>
          </a>
        ))}
      </div>

      {/* Feature 5: Interactive 3D Activity Sphere (250+ Algorithmic Problems Constellation) */}
      <div className="mb-8">
        <ActivitySphere3D />
      </div>

      {/* LeetCode Difficulty Breakdown & Core Java Domain Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LeetCode Stats Radial / Ratio Box */}
        <div className="lg:col-span-5 rounded-[24px] bg-zinc-900/80 border border-white/[0.08] p-6 backdrop-blur-xl flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono font-bold text-white">LEETCODE DIFFICULTY PROFILE</span>
              <span className="text-[10px] font-mono text-amber-400 font-bold">@SKSINGH243</span>
            </div>

            <div className="my-6 space-y-4">
              {/* Easy */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-emerald-400 font-semibold">Easy</span>
                  <span className="text-white font-bold">93 Problems</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              {/* Medium */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-amber-400 font-semibold">Medium</span>
                  <span className="text-white font-bold">97 Problems</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '47%' }} />
                </div>
              </div>

              {/* Hard */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-rose-400 font-semibold">Hard</span>
                  <span className="text-white font-bold">16 Problems</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-400 rounded-full" style={{ width: '8%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.04] text-xs text-zinc-400 font-mono flex items-center justify-between">
            <span>Primary DSA Language:</span>
            <span className="text-white font-bold font-mono">Java (JDK 21)</span>
          </div>
        </div>

        {/* Java Algorithm Mastery Breakdown */}
        <div className="lg:col-span-7 rounded-[24px] bg-zinc-900/80 border border-white/[0.08] p-6 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
            <span className="text-xs font-mono font-bold text-white">CORE DSA ARCHITECTURES & PATTERNS</span>
            <span className="text-[10px] font-mono text-cyan-400">250+ Total Problems</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DSA_DOMAINS.map((d) => (
              <div
                key={d.topic}
                className="p-3 rounded-xl bg-zinc-950/60 border border-white/[0.04] flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-white">{d.topic}</div>
                  <div className="text-[10px] font-mono text-cyan-400 mt-0.5">{d.count}</div>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                  {d.level}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[11px] text-zinc-500 font-mono">
            * Consistent problem solving across LeetCode, GeeksforGeeks, CodeChef, and Codeforces, with deep emphasis on runtime complexity analysis and space-time optimization.
          </p>
        </div>

      </div>
    </section>
  )
}
