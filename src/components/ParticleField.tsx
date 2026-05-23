import { useId } from 'react'

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: 2 + (i % 3) * 2,
  left: 5 + (i * 7) % 90,
  top: 10 + (i * 13) % 80,
  delay: (i * 1.7) % 6,
  duration: 6 + (i % 5) * 2,
  color: i % 3 === 0 ? 'rgba(46, 196, 90,' :
         i % 3 === 1 ? 'rgba(61, 212, 206,' :
                       'rgba(250, 140, 77,',
  blur: i % 2 === 0 ? 'blur(0px)' : 'blur(1px)',
}))

export function ParticleField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: `${p.color} 0.8)`,
            boxShadow: `0 0 ${p.size * 4}px ${p.color} 0.6), 0 0 ${p.size * 8}px ${p.color} 0.3)`,
            animation: `firefly-${(p.id % 5) + 1} ${p.duration}s ease-in-out ${p.delay}s infinite`,
            filter: p.blur,
          }}
        />
      ))}
    </div>
  )
}
