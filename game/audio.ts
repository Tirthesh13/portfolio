class AudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private bgLoop: ReturnType<typeof setTimeout> | null = null
  muted: boolean = false
  private initialized: boolean = false

  init() {
    if (this.initialized) return
    this.initialized = true
    try {
      this.ctx = new AudioContext()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = 0.15
      this.masterGain.connect(this.ctx.destination)
    } catch {
      // AudioContext not available
    }
  }

  private playNote(
    freq: number,
    duration: number,
    type: OscillatorType = 'square',
    volume = 0.3
  ) {
    if (!this.ctx || !this.masterGain || this.muted) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = type
      osc.frequency.value = freq
      gain.gain.setValueAtTime(volume, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration)
      osc.connect(gain)
      gain.connect(this.masterGain)
      osc.start()
      osc.stop(this.ctx.currentTime + duration)
    } catch {
      // ignore audio errors
    }
  }

  playOverworld() {
    if (this.bgLoop) clearTimeout(this.bgLoop)
    const melody = [261, 329, 392, 440, 523, 440, 392, 329]
    let i = 0
    const step = () => {
      if (!this.ctx) return
      if (!this.muted) {
        this.playNote(melody[i % melody.length], 0.25, 'square', 0.12)
      }
      i++
      this.bgLoop = setTimeout(step, 300)
    }
    step()
  }

  stopBg() {
    if (this.bgLoop) {
      clearTimeout(this.bgLoop)
      this.bgLoop = null
    }
  }

  sfxStep() {
    this.playNote(220, 0.05, 'square', 0.05)
  }

  sfxFootstep() {
    this.playNote(180 + Math.random() * 40, 0.04, 'square', 0.04)
  }

  sfxDialogueOpen() {
    this.playNote(440, 0.1, 'square', 0.2)
    setTimeout(() => this.playNote(660, 0.15, 'square', 0.2), 100)
  }

  sfxDialogueBlip() {
    this.playNote(880, 0.03, 'square', 0.08)
  }

  sfxQuestComplete() {
    ;[261, 329, 392, 523].forEach((f, i) =>
      setTimeout(() => this.playNote(f, 0.2, 'square', 0.25), i * 120)
    )
  }

  sfxItemCollect() {
    this.playNote(1046, 0.08, 'sine', 0.3)
    setTimeout(() => this.playNote(1318, 0.15, 'sine', 0.3), 80)
  }

  toggleMute() {
    this.muted = !this.muted
    if (this.masterGain) {
      this.masterGain.gain.value = this.muted ? 0 : 0.15
    }
  }

  resume() {
    if (this.ctx?.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
  }

  destroy() {
    this.stopBg()
    this.ctx?.close().catch(() => {})
  }
}

export const audioEngine = new AudioEngine()
