import React, { useState, useEffect } from 'react'
import { voice } from '../utils/speech'
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Bot,
  Square,
  Send,
  Radio
} from 'lucide-react'

export default function FloatingVoiceWidget({ isVisible = true }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [liveTranscript, setLiveTranscript] = useState('')
  const [chatLog, setChatLog] = useState([
    {
      role: 'assistant',
      text: "Hello! Tap the mic button and speak to me directly, or click a prompt below.",
    },
  ])
  const [typedInput, setTypedInput] = useState('')

  useEffect(() => {
    voice.onStateChange = (speaking) => setIsSpeaking(speaking)
    return () => {
      voice.stop()
      voice.stopListening()
    }
  }, [])

  const handleToggleListen = () => {
    if (isListening) {
      voice.stopListening()
      setIsListening(false)
    } else {
      setLiveTranscript('Listening... Speak now!')
      voice.startListening(
        (transcript, isFinal) => {
          setLiveTranscript(transcript)
          if (isFinal && transcript.trim()) {
            handleProcessQuestion(transcript.trim())
          }
        },
        (listening) => {
          setIsListening(listening)
          if (!listening && liveTranscript === 'Listening... Speak now!') {
            setLiveTranscript('')
          }
        }
      )
    }
  }

  const handleProcessQuestion = (query) => {
    setLiveTranscript('')
    const userMsg = { role: 'user', text: query }
    setChatLog((prev) => [...prev, userMsg])

    setTimeout(() => {
      let reply = ''
      const q = query.toLowerCase()

      if (q.includes('hire') || q.includes('why')) {
        reply =
          "Sumit is an exceptional engineering candidate with a 9.31 CGPA in CSE AI/ML, and a National Semi-Finalist in Flipkart GRiD 8.0 out of 170,000 candidates. His AI security work at Infosys cut manual review time by 85%, and he has solved over 250 DSA problems in Java."
      } else if (q.includes('project') || q.includes('flagship') || q.includes('twin') || q.includes('jancare')) {
        reply =
          "Sumit's two flagship projects are: 1. AI Student Digital Twin, tracking cognitive burnout with 800+ student samples. 2. जनCare (JanCare), an offline-first rural telemedicine platform built with Next.js 16, Google Gemini AI, and Daily.co WebRTC."
      } else if (q.includes('flipkart') || q.includes('grid')) {
        reply =
          "In Flipkart GRiD 8.0, India's premier engineering challenge, Sumit advanced to the National Semi-Finals among more than 170,000 participants nationwide."
      } else if (q.includes('contact') || q.includes('email')) {
        reply =
          "You can reach Sumit directly at sumitksingh243@gmail.com, or download his resume right from the website."
      } else {
        reply =
          "Sumit specializes in Full-Stack Web Development (React, Node, TypeScript) and Machine Learning (Python, Scikit-learn), with a strong foundation in Java Data Structures and Algorithms."
      }

      setChatLog((prev) => [...prev, { role: 'assistant', text: reply }])
      voice.speak(reply)
    }, 400)
  }

  const handleSendTyped = (e) => {
    e.preventDefault()
    if (!typedInput.trim()) return
    const text = typedInput.trim()
    setTypedInput('')
    handleProcessQuestion(text)
  }

  return (
    <>
      {/* Floating Bottom-Right Launcher Orb */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-40 flex items-center space-x-2 px-4 py-3 rounded-full bg-zinc-900 border border-white/[0.15] hover:border-cyan-400 text-white shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl group transition-all duration-700 ease-out transform hover:scale-105 ${
            isVisible
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping absolute opacity-75" />
            <span className="w-3 h-3 rounded-full bg-cyan-400 relative" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wide">
            Tap & Talk to AI
          </span>
          <Mic className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Floating Voice Assistant Modal/Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[340px] sm:w-[380px] rounded-3xl bg-zinc-950/95 border border-white/[0.15] shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-fadeIn text-slate-100">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800/80 bg-zinc-900/60">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Sumit's Voice Copilot</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] font-mono text-zinc-400">Two-way voice conversation</div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {isSpeaking && (
                <button
                  onClick={() => voice.stop()}
                  title="Silence voice"
                  className="p-1.5 rounded-lg bg-zinc-800 text-rose-400 hover:bg-zinc-700 transition-colors"
                >
                  <Square className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => {
                  voice.stop()
                  voice.stopListening()
                  setIsOpen(false)
                }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat / Speech History */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 text-xs">
            {chatLog.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl max-w-[90%] leading-relaxed ${
                  m.role === 'user'
                    ? 'ml-auto bg-cyan-500/15 border border-cyan-500/30 text-cyan-100 rounded-tr-none'
                    : 'mr-auto bg-zinc-900 border border-white/[0.06] text-zinc-200 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            ))}

            {liveTranscript && (
              <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs italic animate-pulse">
                🎙️ {liveTranscript}
              </div>
            )}
          </div>

          {/* Quick Voice Chips */}
          <div className="px-3 py-1.5 flex flex-wrap gap-1 border-t border-zinc-900">
            {['Why hire Sumit?', 'Flagship Projects', 'Flipkart GRiD feat'].map((chip) => (
              <button
                key={chip}
                onClick={() => handleProcessQuestion(chip)}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.04]"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Interactive Voice Mic Controller Bottom Bar */}
          <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/40 flex items-center gap-3">
            
            {/* The Big Central Mic Button */}
            <button
              onClick={handleToggleListen}
              className={`p-3 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-[0_0_20px_#f43f5e]'
                  : 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-md'
              }`}
              title={isListening ? 'Stop listening' : 'Click and speak'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Typed Input Fallback */}
            <form onSubmit={handleSendTyped} className="flex-1 flex gap-1.5">
              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder={isListening ? 'Listening to voice...' : 'Or type a question...'}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>
      )}
    </>
  )
}
