import React from 'react'
import {
  Trophy,
  Award,
  Medal,
  ExternalLink,
  GraduationCap,
  Code2,
  CheckCircle2,
  Shield,
  Sparkles
} from 'lucide-react'

const ACHIEVEMENTS = [
  {
    title: 'Flipkart GRiD 8.0 — National Semi-Finalist',
    issuer: 'Flipkart Flagship Engineering Challenge',
    year: '2026',
    scale: '170,000+ Participants',
    highlight: 'Top Tier Nationwide',
    description:
      'Advanced to the National Semi-Finals of India’s premier campus software engineering challenge. Cleared multiple rigorous assessment rounds evaluating advanced algorithmic problem solving, software design, and distributed systems logic.',
    icon: Trophy,
    color: 'amber',
  },
  {
    title: 'Team Lead — Smart India Hackathon (SIH)',
    issuer: 'Ministry of Education / Internal Round',
    year: '2025',
    scale: 'Led 6-Member Engineering Team',
    highlight: 'Internal Round Finalist',
    description:
      'Led team Code4Sehat architecting SwasthyaMitra, owning full frontend delivery, Agora.io WebRTC video consultation integration, and technical roadmap planning for rural healthcare delivery.',
    icon: Medal,
    color: 'purple',
  },
  {
    title: 'Competitive Programming (250+ Problems Solved)',
    issuer: 'LeetCode • GeeksforGeeks • CodeChef • Codeforces',
    year: 'Continuous',
    scale: '250+ Algorithmic Problems in Java',
    highlight: 'DSA Mastery',
    description:
      'Demonstrated consistency solving complex problems spanning Dynamic Programming, Graph Theory, Binary Trees, Greedy Algorithms, and Object-Oriented design.',
    icon: Code2,
    color: 'cyan',
  },
]

const CERTIFICATIONS = [
  {
    title: 'PwC AC India Advisory Launchpad Program',
    issuer: 'PricewaterhouseCoopers (PwC)',
    topics: 'GenAI • Data Systems • Cybersecurity & GRC',
    year: '2026',
    link: 'https://www.linkedin.com/in/sumit-kumar-singh-0462b92b6/details/certifications/',
  },
  {
    title: 'Innovation by Design Certification',
    issuer: 'NPTEL (National Programme on Technology Enhanced Learning)',
    topics: 'Design Thinking • User-Centric Engineering',
    year: '2025',
    link: 'https://www.linkedin.com/in/sumit-kumar-singh-0462b92b6/details/certifications/',
  },
  {
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy (Dr. Angela Yu)',
    topics: 'MERN Stack • REST APIs • Architecture',
    year: '2025',
    link: 'https://www.linkedin.com/in/sumit-kumar-singh-0462b92b6/details/certifications/',
  },
  {
    title: 'Web Development Certification',
    issuer: 'Internshala Trainings',
    topics: 'Modern Web Engineering • Frontend Architecture',
    year: '2024',
    link: 'https://www.linkedin.com/in/sumit-kumar-singh-0462b92b6/details/certifications/',
  },
]

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-16 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">Competitive Proof & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Honors & Certifications
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mt-1">
            Proven competitive engineering standing, hackathon leadership, and verified professional certifications.
          </p>
        </div>

        <a
          href="https://www.linkedin.com/in/sumit-kumar-singh-0462b92b6/details/certifications/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] hover:border-white/[0.2] text-xs font-mono text-zinc-300 hover:text-white transition-all self-start md:self-auto"
        >
          <span>Verify on LinkedIn</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
        </a>
      </div>

      {/* Major Competitive Achievements (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {ACHIEVEMENTS.map((ach) => {
          const IconComp = ach.icon
          return (
            <div
              key={ach.title}
              className="p-6 rounded-[22px] bg-zinc-900/60 border border-white/[0.08] hover:border-white/[0.2] backdrop-blur-xl flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-white/[0.08] flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60 font-bold">
                    {ach.year}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-amber-400 font-bold tracking-wide">
                  {ach.scale}
                </div>
                <h3 className="text-base font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                  {ach.title}
                </h3>
                <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                  {ach.issuer}
                </p>

                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Verified Standing</span>
                <span className="text-emerald-400 font-semibold">{ach.highlight}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Verified Professional Certifications Bar */}
      <div className="rounded-[22px] bg-zinc-900/50 border border-white/[0.08] p-6 sm:p-7 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white tracking-tight uppercase tracking-wider">
              Verified Professional Certifications
            </h4>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">Industry Credentialing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.04] hover:border-cyan-500/30 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-cyan-400">{cert.year}</span>
                <h5 className="text-xs font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors leading-snug">
                  {cert.title}
                </h5>
                <p className="text-[10px] font-mono text-zinc-400 mt-1">
                  {cert.issuer}
                </p>
                <p className="text-[10px] text-zinc-500 mt-2">
                  {cert.topics}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-400 group-hover:text-white transition-colors">
                <span>View Credential</span>
                <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
