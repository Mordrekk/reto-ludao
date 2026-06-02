import { useEffect, useState } from 'react'
import './Confetti.css'

const Confetti = ({ active }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (active) {
      const colors = ['#e94560', '#ffc107', '#00d26a', '#ff6b35', '#9b59b6', '#3498db', '#ff00ff', '#00ffff']
      const newParticles = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        size: 5 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        rotation: Math.random() * 360,
        drift: (Math.random() - 0.5) * 30,
        type: Math.random() > 0.5 ? 'square' : 'circle'
      }))
      setParticles(newParticles)
      
      const timeout = setTimeout(() => setParticles([]), 4000)
      return () => clearTimeout(timeout)
    }
  }, [active])

  if (!active || particles.length === 0) return null

  return (
    <div className="confetti-container">
      {particles.map(p => (
        <div
          key={p.id}
          className={`confetti-particle confetti-${p.type}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
            '--rotation': `${p.rotation}deg`,
            transform: `rotate(${p.rotation}deg)`
          }}
        />
      ))}
    </div>
  )
}

export default Confetti