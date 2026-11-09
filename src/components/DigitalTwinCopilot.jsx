import React, { useState } from 'react'
import { sound } from '../utils/audio'
import { Bot, Send, Sparkles, User, CheckCircle2 } from 'lucide-react'

const FAQ_ANSWERS = {
  'Why hire Sumit?':
    "Sumit blends high academic rigour (9.31 CGPA in CSE AI/ML) with real-world engineering impact. He advanced to the National Semi-Finals of Flipkart GRiD 8.0 out of 170,000+ competitors, led an AI code security agent at Infosys cutting review times by 85%, and has solved 250+ DSA problems across LeetCode & GFG.",
  'What is Flipkart GRiD 8.0?':
    "Flipkart GRiD is India's premier engineering campus challenge. Sumit competed against 170,000+ students across the nation, clearing rigorous algorithmic rounds and system design challenges to finish as a National Semi-Finalist.",
  'What is your Tech Stack?':
    "Languages: Java (Primary for DSA/System Design), Python (ML, FastAPI, Scikit-learn), JavaScript.\nFrontend & Backend: React.js, Node.js, Express.js, Tailwind CSS, REST APIs.\nDatabases: MongoDB, MySQL.\nCore CS: Data Structures & Algorithms, OOP, DBMS, OS, Computer Networks.",
  'Explain AI Student Digital Twin':
    "AI Student Digital Twin is a behavioral analytics platform Sumit built using React, Node.js, MongoDB, and Chart.js. Trained on 800+ student data points, it predicts burnout risk, tracks focus consistency with real-time telemetry dashboards, and features an interactive 'Talk to Twin' AI mentor.",
}

export default function DigitalTwinCopilot() {
  const [messages, setMessages] = useState([
    {
      sender: 'twin',
      text: "Hi, I'm Sumit's Digital Twin AI! Ask me anything about Sumit's projects, Flipkart GRiD 8.0 journey, or technical skills.",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const askQuestion = (questionText) => {
    sound.playClick()
    const userMsg = { sender: 'user', text: questionText }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    setTimeout(() => {
      let reply =
        FAQ_ANSWERS[questionText] ||
        "Sumit is a final-year B.Tech CSE (AI/ML) student at C. V. Raman Global University (CGPA 9.31). He specializes in Full-Stack Web Development (React/Node) and Machine Learning (Python/Scikit-learn) with strong DSA foundations in Java. Feel free to contact him at sumitksingh243@gmail.com!"

      setMessages((prev) => [...prev, { sender: 'twin', text: reply }])
      setIsTyping(false)
      sound.playChime()
    }, 600)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const q = input.trim()
    setInput('')
    askQuestion(q)
  }

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-5 backdrop-blur-xl flex flex-col h-[430px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>"Talk to Twin" AI Copilot</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-xs text-slate-400">
              Interactive clone of Sumit's AI Student Digital Twin module
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="flex flex-wrap gap-1.5 py-2.5 shrink-0">
        {Object.keys(FAQ_ANSWERS).map((q) => (
          <button
            key={q}
            onClick={() => askQuestion(q)}
            className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-purple-900/30 border border-slate-700 hover:border-purple-500/50 text-slate-300 hover:text-purple-300 transition-all text-left"
          >
            ⚡ {q}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-2 ${
              m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
                m.sender === 'user'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-purple-600/30 border border-purple-500/40 text-purple-300'
              }`}
            >
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            </div>
            <div
              className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-line leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-100 rounded-tr-none'
                  : 'bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs italic">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-purple-400" />
            <span>Sumit.AI is analyzing response...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="mt-3 pt-3 border-t border-slate-800 flex gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Sumit's experience, stack, or projects..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
