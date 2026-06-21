interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

export class ParticleSystem {
  private particles: Particle[] = []

  emit(x: number, y: number, color: string, count: number = 3) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 1.5 - 0.5,
        life: 1, maxLife: 1,
        color,
        size: Math.random() * 3 + 1,
      })
    }
    if (this.particles.length > 300) this.particles.splice(0, 50)
  }

  update() {
    this.particles = this.particles.filter(p => {
      p.x += p.vx
      p.y += p.vy
      p.life -= 0.02
      return p.life > 0
    })
  }

  render(ctx: CanvasRenderingContext2D, camX: number, camY: number) {
    for (const p of this.particles) {
      ctx.globalAlpha = p.life
      ctx.fillStyle = p.color
      ctx.fillRect(p.x - camX, p.y - camY, p.size, p.size)
    }
    ctx.globalAlpha = 1
  }
}
