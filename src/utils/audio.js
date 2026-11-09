// Web Audio API procedural sound synthesizer & ambient cybernetic audio engine

class SoundFX {
  constructor() {
    this.ctx = null
    this.muted = false

    // Ambient Drone Nodes
    this.isAmbientPlaying = false
    this.ambientGain = null
    this.ambientOsc1 = null
    this.ambientOsc2 = null
    this.ambientFilter = null
    this.ambientLfo = null
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        this.ctx = new AudioContext()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  toggleMute() {
    this.muted = !this.muted
    if (this.muted && this.isAmbientPlaying) {
      this.stopAmbient()
    }
    return this.muted
  }

  // Toggle Atmospheric Cybernetic Ambient Drone (Procedural Web Audio)
  toggleAmbient(onStateChange) {
    this.init()
    if (!this.ctx) return false

    if (this.isAmbientPlaying) {
      this.stopAmbient()
      if (onStateChange) onStateChange(false)
      return false
    } else {
      this.startAmbient()
      if (onStateChange) onStateChange(true)
      return true
    }
  }

  startAmbient() {
    if (this.muted || this.isAmbientPlaying || !this.ctx) return

    try {
      const now = this.ctx.currentTime

      // Master ambient gain
      this.ambientGain = this.ctx.createGain()
      this.ambientGain.gain.setValueAtTime(0.001, now)
      this.ambientGain.gain.exponentialRampToValueAtTime(0.08, now + 2.5) // Gentle fade in

      // Lowpass Filter for soft warm cinematic texture
      this.ambientFilter = this.ctx.createBiquadFilter()
      this.ambientFilter.type = 'lowpass'
      this.ambientFilter.frequency.setValueAtTime(320, now)

      // Slow LFO filter sweep (breathing effect)
      this.ambientLfo = this.ctx.createOscillator()
      this.ambientLfo.frequency.setValueAtTime(0.12, now) // 0.12 Hz slow breath
      const lfoGain = this.ctx.createGain()
      lfoGain.gain.setValueAtTime(140, now)
      this.ambientLfo.connect(lfoGain)
      lfoGain.connect(this.ambientFilter.frequency)
      this.ambientLfo.start(now)

      // Dual detuned sub oscillators (Cybernetic chord: C2 / G2)
      this.ambientOsc1 = this.ctx.createOscillator()
      this.ambientOsc1.type = 'sawtooth'
      this.ambientOsc1.frequency.setValueAtTime(65.41, now) // C2

      this.ambientOsc2 = this.ctx.createOscillator()
      this.ambientOsc2.type = 'triangle'
      this.ambientOsc2.frequency.setValueAtTime(98.0, now) // G2
      this.ambientOsc2.detune.setValueAtTime(6, now) // +6 cents shimmer

      // Connect graph
      this.ambientOsc1.connect(this.ambientFilter)
      this.ambientOsc2.connect(this.ambientFilter)
      this.ambientFilter.connect(this.ambientGain)
      this.ambientGain.connect(this.ctx.destination)

      this.ambientOsc1.start(now)
      this.ambientOsc2.start(now)

      this.isAmbientPlaying = true
    } catch {
      this.isAmbientPlaying = false
    }
  }

  stopAmbient() {
    if (!this.ctx || !this.isAmbientPlaying) return

    try {
      const now = this.ctx.currentTime
      if (this.ambientGain) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2) // smooth fade out
      }
      setTimeout(() => {
        try {
          if (this.ambientOsc1) this.ambientOsc1.stop()
          if (this.ambientOsc2) this.ambientOsc2.stop()
          if (this.ambientLfo) this.ambientLfo.stop()
        } catch {}
        this.isAmbientPlaying = false
      }, 1250)
    } catch {
      this.isAmbientPlaying = false
    }
  }

  playWhoosh() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const filter = this.ctx.createBiquadFilter()

      osc.type = 'sine'
      const now = this.ctx.currentTime

      osc.frequency.setValueAtTime(120, now)
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.12)
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.28)

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(800, now)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.28)
    } catch {}
  }

  playChime() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.05)

        gain.gain.setValueAtTime(0.04, now + idx * 0.05)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.4)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + idx * 0.05)
        osc.stop(now + idx * 0.05 + 0.45)
      })
    } catch {}
  }

  playClick() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(900, now)
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04)

      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)
    } catch {}
  }
}

export const sound = new SoundFX()
