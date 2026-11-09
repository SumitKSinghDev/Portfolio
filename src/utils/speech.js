// Web Speech API: Voice Synthesis (TTS) and Voice Recognition (STT)

class SpeechEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null
    this.isSpeaking = false
    this.onStateChange = null

    // Recognition
    this.recognition = null
    this.isListening = false
    this.onTranscript = null
    this.onListeningChange = null

    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition()
        this.recognition.continuous = false
        this.recognition.interimResults = true
        this.recognition.lang = 'en-US'

        this.recognition.onstart = () => {
          this.isListening = true
          if (this.onListeningChange) this.onListeningChange(true)
        }

        this.recognition.onresult = (event) => {
          let transcript = ''
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript
          }
          if (this.onTranscript) this.onTranscript(transcript, event.results[0].isFinal)
        }

        this.recognition.onerror = () => {
          this.isListening = false
          if (this.onListeningChange) this.onListeningChange(false)
        }

        this.recognition.onend = () => {
          this.isListening = false
          if (this.onListeningChange) this.onListeningChange(false)
        }
      }
    }
  }

  getBestVoice() {
    if (!this.synth) return null
    const voices = this.synth.getVoices()
    const preferred = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Google') ||
          v.name.includes('Natural') ||
          v.name.includes('Enhanced') ||
          v.name.includes('Samantha') ||
          v.name.includes('Daniel') ||
          v.name.includes('David'))
    )
    return preferred || voices.find((v) => v.lang.startsWith('en')) || voices[0] || null
  }

  speak(text, onEnd) {
    if (!this.synth) return
    this.stop()

    const cleanText = text
      .replace(/[*_#`~\[\]\(\)]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .trim()

    const utterance = new SpeechSynthesisUtterance(cleanText)
    const voice = this.getBestVoice()
    if (voice) {
      utterance.voice = voice
    }
    utterance.rate = 1.02
    utterance.pitch = 1.0

    utterance.onstart = () => {
      this.isSpeaking = true
      if (this.onStateChange) this.onStateChange(true)
    }

    utterance.onend = () => {
      this.isSpeaking = false
      if (this.onStateChange) this.onStateChange(false)
      if (onEnd) onEnd()
    }

    utterance.onerror = () => {
      this.isSpeaking = false
      if (this.onStateChange) this.onStateChange(false)
    }

    this.synth.speak(utterance)
  }

  stop() {
    if (this.synth) {
      this.synth.cancel()
    }
    this.isSpeaking = false
    if (this.onStateChange) this.onStateChange(false)
  }

  startListening(onTranscript, onListeningChange) {
    if (!this.recognition) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.')
      return false
    }
    this.stop() // stop any existing speech before listening
    this.onTranscript = onTranscript
    this.onListeningChange = onListeningChange
    try {
      this.recognition.start()
      return true
    } catch {
      return false
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
    }
  }
}

export const voice = new SpeechEngine()
