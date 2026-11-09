// Web Audio API procedural sound synthesizer & ambient cybernetic audio engine

class SoundFX {
  constructor() {
    this.ctx = null
    this.muted = false
    this.noiseBuffers = []
    this.counterSoundMode = 'keyboard' // 'keyboard' | 'watch'

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
        this._generateNoiseBuffers()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  _generateNoiseBuffers() {
    if (!this.ctx) return
    const sampleRate = this.ctx.sampleRate
    this.noiseBuffers = []

    // Pre-cache 4 distinct natural micro-noise profiles (zero allocation during typing)
    for (let b = 0; b < 4; b++) {
      const length = Math.floor(sampleRate * 0.02) // 20ms
      const buffer = this.ctx.createBuffer(1, length, sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < length; i++) {
        const decay = Math.exp(-i / (sampleRate * 0.0035))
        data[i] = (Math.random() * 2 - 1) * decay
      }
      this.noiseBuffers.push(buffer)
    }
  }

  setCounterSoundMode(mode) {
    if (mode === 'keyboard' || mode === 'watch') {
      this.counterSoundMode = mode
    }
  }

  getCounterSoundMode() {
    return this.counterSoundMode
  }

  // Play counter decode sound according to active mode (Mechanical Keyboard or Watch Dialer)
  playCounterSound() {
    if (this.counterSoundMode === 'watch') {
      this.playWatchTick()
    } else {
      this.playKeystroke()
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

  // Authentic Mechanical Keyboard Keystroke (Tactile keycap snap + damped switch bottom-out)
  playKeystroke() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime

      // 1. Keycap tactile impact click (filtered white noise burst)
      if (this.noiseBuffers && this.noiseBuffers.length > 0) {
        const randBuffer = this.noiseBuffers[Math.floor(Math.random() * this.noiseBuffers.length)]
        const noiseSource = this.ctx.createBufferSource()
        noiseSource.buffer = randBuffer

        // Randomize bandpass filter slightly (2400Hz - 3200Hz) for natural per-key acoustic variance
        const clickFilter = this.ctx.createBiquadFilter()
        clickFilter.type = 'bandpass'
        const centerFreq = 2700 + (Math.random() * 600 - 300)
        clickFilter.frequency.setValueAtTime(centerFreq, now)
        clickFilter.Q.setValueAtTime(3.6, now)

        const noiseGain = this.ctx.createGain()
        noiseGain.gain.setValueAtTime(0.18, now)
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.016)

        noiseSource.connect(clickFilter)
        clickFilter.connect(noiseGain)
        noiseGain.connect(this.ctx.destination)
        noiseSource.start(now)
      }

      // 2. Switch bottom-out thump (case resonance, not beep)
      const thumpOsc = this.ctx.createOscillator()
      const thumpGain = this.ctx.createGain()
      const thumpFilter = this.ctx.createBiquadFilter()

      thumpOsc.type = 'triangle'
      // Natural pitch variance per key (280Hz - 340Hz)
      const thumpPitch = 300 + (Math.random() * 60 - 30)
      thumpOsc.frequency.setValueAtTime(thumpPitch, now)
      thumpOsc.frequency.exponentialRampToValueAtTime(120, now + 0.022)

      thumpFilter.type = 'lowpass'
      thumpFilter.frequency.setValueAtTime(520, now)

      thumpGain.gain.setValueAtTime(0.11, now)
      thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022)

      thumpOsc.connect(thumpFilter)
      thumpFilter.connect(thumpGain)
      thumpGain.connect(this.ctx.destination)

      thumpOsc.start(now)
      thumpOsc.stop(now + 0.022)
    } catch {}
  }

  // Precision Mechanical Watch Escapement / Stopwatch Dialer Tick
  playWatchTick() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime

      // Strike 1: Escapement tooth notch strike (~3200Hz, crisp metallic tick)
      const osc1 = this.ctx.createOscillator()
      const gain1 = this.ctx.createGain()
      const filter1 = this.ctx.createBiquadFilter()

      osc1.type = 'sine'
      const tickFreq = 3400 + (Math.random() * 300 - 150)
      osc1.frequency.setValueAtTime(tickFreq, now)
      osc1.frequency.exponentialRampToValueAtTime(1900, now + 0.010)

      filter1.type = 'bandpass'
      filter1.frequency.setValueAtTime(3000, now)
      filter1.Q.setValueAtTime(6.0, now)

      gain1.gain.setValueAtTime(0.14, now)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.010)

      osc1.connect(filter1)
      filter1.connect(gain1)
      gain1.connect(this.ctx.destination)

      osc1.start(now)
      osc1.stop(now + 0.010)

      // Strike 2: Micro-rebound of pallet jewel (3.5ms later)
      const osc2 = this.ctx.createOscillator()
      const gain2 = this.ctx.createGain()

      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(4600, now + 0.0035)
      osc2.frequency.exponentialRampToValueAtTime(2600, now + 0.012)

      gain2.gain.setValueAtTime(0.07, now + 0.0035)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.012)

      osc2.connect(gain2)
      gain2.connect(this.ctx.destination)

      osc2.start(now + 0.0035)
      osc2.stop(now + 0.013)
    } catch {}
  }

  // Tactile Haptic UI Click (clean mechanical tick for buttons and tabs, no electronic beep)
  playClick() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const filter = this.ctx.createBiquadFilter()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1400, now)
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.018)

      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(1600, now)
      filter.Q.setValueAtTime(2.5, now)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.018)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.018)
    } catch {}
  }
}

export const sound = new SoundFX()

// Auto-unlock Web Audio on first user interaction in browser
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    sound.init()
    window.removeEventListener('click', unlockAudio)
    window.removeEventListener('keydown', unlockAudio)
    window.removeEventListener('touchstart', unlockAudio)
  }
  window.addEventListener('click', unlockAudio)
  window.addEventListener('keydown', unlockAudio)
  window.addEventListener('touchstart', unlockAudio)
}
