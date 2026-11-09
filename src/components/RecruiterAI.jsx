import React, { useState, useEffect, useRef } from 'react'
import { voice } from '../utils/speech'
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  Send,
  Sparkles,
  Bot,
  User,
  Radio,
  Mic,
  MicOff,
  ArrowRight
} from 'lucide-react'

const EXECUTIVE_PITCH =
  "Hello and welcome. I am Sumit's AI Executive Assistant. Sumit Kumar Singh is a final-year Computer Science and Engineering undergraduate specializing in Artificial Intelligence and Machine Learning at C. V. Raman Global University, maintaining an exceptional 9.31 CGPA. Most notably, he advanced to the National Semi-Finals of Flipkart GRiD 8.0 out of more than 170,000 participants across India. His flagship systems include the AI Student Digital Twin, tracking cognitive burnout with 800+ student profiles, and JanCare, an offline-first rural telemedicine platform built with Next.js 16, Google Gemini AI, and Daily.co WebRTC. With over 250 Data Structures and Algorithms problems solved in Java, Sumit is ready to deliver impact to high-performing engineering teams."

const KNOWLEDGE_BASE = {
  'Why hire Sumit?': {
    voice:
      "Sumit combines high academic rigor with national competitive engineering proof. With a 9.31 CGPA, reaching the National Semi-Finals of Flipkart GRiD 8.0 among 170,000 candidates, leading an AI code security agent at Infosys, and solving 250+ DSA problems, he brings deep execution speed and systems depth.",
    text: `### Executive Summary for Recruiters & Hiring Managers:
- **Top 0.1% National Standing**: National Semi-Finalist in **Flipkart GRiD 8.0** (Top tier out of 170,000+ applicants nationwide).
- **Academic Distinction**: **9.31 CGPA** in B.Tech CSE (AI/ML) at C. V. Raman Global University.
- **Industry Impact (Infosys Springboard 7.0)**: AI Intern & Project Lead. Built an ML security agent flagging 10 OWASP categories, reducing review overhead by 85%.
- **Algorithmic Mastery**: Solved **250+ DSA problems** across LeetCode, CodeChef, and Codeforces primarily in Java.
- **Flagship Production Systems**: Shipped **AI Student Digital Twin** (telemetry prediction) and **जनCare (JanCare)** (Next.js 16 + Gemini AI + Daily.co WebRTC).`,
  },
  'What is Flipkart GRiD 8.0?': {
    voice:
      "Flipkart GRiD is India's premier engineering campus challenge. Out of over 170,000 candidates across top colleges, Sumit cleared consecutive algorithmic and systems engineering rounds to advance to the National Semi-Finals.",
    text: `### Flipkart GRiD 8.0 — National Semi-Finalist (2026)
- **Competition Scale**: Over **170,000+ registered engineering candidates** from top institutes across India.
- **Track**: Software Engineering (Real-world system design, advanced algorithmic problem solving, scalable distributed architecture).
- **Sumit's Performance**: Successfully cleared consecutive competitive assessment rounds to qualify into the **National Semi-Finals**, ranking in the top echelon of student software engineers in the country.`,
  },
  'Explain Flagship Projects': {
    voice:
      "Sumit's two flagship projects are the AI Student Digital Twin with real-time burnout telemetry, and JanCare, an offline-first rural telemedicine platform built with Next.js 16 and Gemini AI.",
    text: `### Flagship Projects (@SumitKSinghDev):
1. **AI Student Digital Twin** (\`DigitalTwin\`):
   - Behavioral analytics engine trained on 800+ student data points.
   - Real-time telemetry dashboards tracking burnout index, focus consistency, and interactive "Talk to Twin" AI mentor.
   - *Stack*: React.js, Tailwind, Node.js, Express, MongoDB, Chart.js.
2. **जनCare (JanCare)** (\`JanCare\`):
   - AI-assisted rural healthcare coordination platform for underserved communities in Maharashtra.
   - Features Google Gemini AI clinical triage, Daily.co WebRTC video consultations, and Leaflet GIS mapping.
   - *Stack*: Next.js 16, React 19, TypeScript, Google Gemini AI, Daily.co WebRTC, MongoDB Atlas.`,
  },
  'What is your DSA & Tech Stack?': {
    voice:
      "Sumit's primary algorithmic language is Java, with more than 250 problems solved covering dynamic programming, graph theory, and trees. For web systems, he specializes in React, Next.js, and TypeScript, paired with Python for machine learning and security heuristics.",
    text: `### Technical Capabilities & Core Stack:
- **Core Languages**: Java (Primary for DSA & OOP), Python (ML, FastAPI, Scikit-learn), TypeScript, JavaScript.
- **Frontend Architecture**: React.js, Next.js 16, Tailwind CSS, State Management, Responsive Design Systems.
- **Backend & Real-Time**: Node.js, Express.js, REST APIs, Daily.co / Agora WebRTC, Role-Based Access Control (RBAC).
- **Databases**: MongoDB Atlas, MySQL, PostgreSQL.
- **Competitive Profiles**: LeetCode (@SKSINGH243 - 206 solved), CodeChef (@sumit_x_ai_24), Codolio (@sumitxai), Codeforces (@sumitksingh243).`,
  },
}

export default function RecruiterAI() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Welcome! I am Sumit's AI Executive Assistant. You can listen to Sumit's spoken executive pitch aloud, click the microphone button to ask questions with your voice, or chat freely below.",
    },
  ])
  const [input, setInput] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const chatBottomRef = useRef(null)

  useEffect(() => {
    voice.onStateChange = (speaking) => setIsSpeaking(speaking)
    return () => {
      voice.stop()
      voice.stopListening()
    }
  }, [])

  useEffect(() => {
    // Only scroll if there are user messages to avoid auto-scrolling on initial page load
    if (messages.length > 1) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handlePlayExecutivePitch = () => {
    if (isSpeaking) {
      voice.stop()
    } else {
      voice.speak(EXECUTIVE_PITCH)
    }
  }

  const handleStopVoice = () => {
    voice.stop()
  }

  const askQuestion = (query) => {
    const userMsg = { role: 'user', content: query }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    setTimeout(() => {
      let match = KNOWLEDGE_BASE[query]
      let replyText = ''
      let speechText = ''

      if (match) {
        replyText = match.text
        speechText = match.voice
      } else {
        const lower = query.toLowerCase()
        if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) {
          replyText =
            "Sumit is open for SDE and AI/ML Engineering roles. You can contact him directly at **sumitksingh243@gmail.com** or call **+91 7050114544**. His resume PDF is available for instant download in the badge above."
          speechText =
            "Sumit is actively open to Software Engineering and AI opportunities. You can email him at sumitksingh243@gmail.com."
        } else if (lower.includes('cgpa') || lower.includes('college') || lower.includes('education')) {
          replyText =
            "Sumit is pursuing B.Tech in CSE (AI/ML) at C. V. Raman Global University, Bhubaneswar (2023–2027), holding a stellar **9.31 CGPA** through the 6th semester."
          speechText =
            "Sumit is studying at C. V. Raman Global University in Computer Science and AI, maintaining a 9.31 CGPA."
        } else {
          replyText =
            "Sumit Kumar Singh is a Full-Stack Engineer and AI researcher (CGPA 9.31) with a national semi-final finish at Flipkart GRiD 8.0. He has solved 250+ DSA problems in Java and authored systems on GitHub including JanCare and the AI Student Digital Twin."
          speechText =
            "Sumit is a Full-Stack and AI engineer with a 9.31 CGPA and Flipkart GRiD Semi-Finalist standing. Ask me about his projects, stack, or experience."
        }
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: replyText }])
      setIsTyping(false)

      if (voiceEnabled) {
        voice.speak(speechText)
      }
    }, 500)
  }

  const handleToggleMic = () => {
    if (isListening) {
      voice.stopListening()
      setIsListening(false)
    } else {
      voice.startListening(
        (transcript, isFinal) => {
          setInput(transcript)
          if (isFinal && transcript.trim()) {
            askQuestion(transcript.trim())
            setInput('')
          }
        },
        (listening) => setIsListening(listening)
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const text = input.trim()
    setInput('')
    askQuestion(text)
  }

  return (
    <div className="w-full rounded-[28px] bg-zinc-900/60 border border-white/[0.08] backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Subtle ambient spotlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80 relative z-10">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Sumit's AI Executive Recruiter</span>
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>MIC & VOICE ACTIVE</span>
                </span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Speak via microphone or listen to audio answers to evaluate candidate fit
              </p>
            </div>
          </div>
        </div>

        {/* Audio Speech Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={handlePlayExecutivePitch}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              isSpeaking
                ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 shadow-md shadow-rose-500/10'
                : 'bg-white hover:bg-zinc-200 text-zinc-950 shadow-md shadow-white/10'
            }`}
          >
            {isSpeaking ? (
              <>
                <Square className="w-3.5 h-3.5 fill-rose-300" />
                <span>Stop Voice Audio</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-zinc-950" />
                <span>Play Spoken Overview (30s)</span>
              </>
            )}
          </button>

          {/* Voice Output Toggle */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            title={voiceEnabled ? 'Voice reads answers aloud' : 'Text only (Muted)'}
            className={`p-2 rounded-xl border text-xs flex items-center space-x-1.5 transition-colors ${
              voiceEnabled
                ? 'bg-zinc-800 border-zinc-700 text-cyan-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            }`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-mono text-[11px]">
              {voiceEnabled ? 'Voice ON' : 'Muted'}
            </span>
          </button>
        </div>
      </div>

      {/* Voice Speaking Real-time Waveform Bar */}
      {isSpeaking && (
        <div className="my-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300">
            <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
            <span>AI Voice is currently speaking...</span>
          </div>

          <div className="flex items-center space-x-1">
            {[16, 24, 12, 28, 20, 32, 14, 22, 18, 30, 16].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-cyan-400 rounded-full animate-pulse"
                style={{
                  height: `${h}px`,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>

          <button
            onClick={handleStopVoice}
            className="text-[11px] font-mono text-zinc-400 hover:text-white underline ml-3"
          >
            Silence
          </button>
        </div>
      )}

      {/* Quick Recruiter Prompt Chips */}
      <div className="mt-4 pt-2">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
          Click to Query Candidate Profile:
        </span>
        <div className="flex flex-wrap gap-2">
          {Object.keys(KNOWLEDGE_BASE).map((prompt) => (
            <button
              key={prompt}
              onClick={() => askQuestion(prompt)}
              className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/[0.08] hover:border-white/[0.2] text-zinc-300 hover:text-white transition-all flex items-center space-x-1.5"
            >
              <span>{prompt}</span>
              <ArrowRight className="w-3 h-3 text-zinc-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="mt-5 h-[320px] overflow-y-auto space-y-3.5 pr-2 rounded-2xl bg-black/40 border border-white/[0.04] p-4 text-xs font-sans">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-2.5 ${
              m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                m.role === 'user'
                  ? 'bg-white text-zinc-950 font-bold'
                  : 'bg-zinc-800 border border-zinc-700 text-cyan-400'
              }`}
            >
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-4 rounded-2xl max-w-[85%] leading-relaxed ${
                m.role === 'user'
                  ? 'bg-zinc-800 text-zinc-100 rounded-tr-none border border-zinc-700'
                  : 'bg-zinc-900/90 text-zinc-200 rounded-tl-none border border-white/[0.06] shadow-sm'
              }`}
            >
              <div className="prose prose-invert prose-xs max-w-none whitespace-pre-line">
                {m.content}
              </div>

              {m.role === 'assistant' && (
                <button
                  onClick={() => voice.speak(m.content)}
                  className="mt-2.5 pt-2 border-t border-zinc-800/60 flex items-center space-x-1.5 text-[10px] font-mono text-zinc-400 hover:text-cyan-400 transition-colors"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>Listen to this response</span>
                </button>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-zinc-500 text-xs italic pl-9">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            <span>Processing response...</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Form with MIC BUTTON */}
      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
        
        {/* Microphone Button */}
        <button
          type="button"
          onClick={handleToggleMic}
          title={isListening ? 'Stop listening' : 'Speak via microphone'}
          className={`p-3 rounded-xl border transition-all ${
            isListening
              ? 'bg-rose-500 border-rose-400 text-white animate-pulse shadow-[0_0_15px_#f43f5e]'
              : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300 hover:text-white'
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? 'Listening to your voice... Speak now!' : "Ask a recruiter question or click the mic button..."}
          className="flex-1 bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center space-x-1.5 shadow-md transition-colors"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  )
}
