import React, { useState } from 'react'
import {
  Mail,
  Copy,
  Check,
  FileText,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ArrowUpRight,
  Sparkles
} from 'lucide-react'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sumitksingh243@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="contact" className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="rounded-[32px] bg-gradient-to-b from-zinc-900/90 via-zinc-950/90 to-black border border-white/[0.1] p-8 sm:p-14 relative overflow-hidden shadow-2xl backdrop-blur-2xl">
        
        {/* Ambient Top Light Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-gradient-to-b from-cyan-500/10 to-transparent blur-2xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-800/80 border border-white/[0.1] text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPEN TO FULL-STACK & AI/ML ROLES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let’s Build High-Assurance Software Together.
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Whether you are scouting for an SDE Intern, an AI Systems Engineer, or looking to collaborate on complex distributed problems, Sumit is ready to connect.
          </p>

          {/* Action Hub */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4 text-zinc-950" />
              <span>{copied ? 'Email Copied to Clipboard!' : 'Copy sumitksingh243@gmail.com'}</span>
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-zinc-500" />}
            </button>

            {/* Resume Download */}
            <a
              href="./Sumit_Kumar_Singh_Resume.pdf"
              download="Sumit_Kumar_Singh_Resume.pdf"
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/[0.1] text-white font-medium text-sm transition-all"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download Official Resume PDF</span>
            </a>
          </div>

          {/* Details Row */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-800/80 text-left text-xs text-zinc-400">
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04]">
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">DIRECT CONTACT</span>
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 7050114544</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04]">
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">LOCATION & UNIVERSITY</span>
              <div className="font-semibold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Ranchi / Bhubaneswar, India</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block mb-1">ONLINE NETWORKS</span>
                <div className="font-semibold text-white">GitHub & LinkedIn</div>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href="https://github.com/SumitKSinghDev"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-white hover:text-zinc-950 text-white transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sumit-kumar-singh-0462b92b6"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-cyan-500 hover:text-zinc-950 text-white transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Clean Aesthetic Footer */}
      <footer className="mt-12 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div>
          Sumit Kumar Singh • B.Tech CSE (AI/ML) • C. V. Raman Global University
        </div>
        <div className="flex items-center space-x-4">
          <a href="#hero" className="hover:text-white transition-colors">Back to Top</a>
          <span>•</span>
          <a href="https://github.com/SumitKSinghDev" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            github.com/SumitKSinghDev
          </a>
        </div>
      </footer>
    </section>
  )
}
