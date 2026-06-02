import { useState, useEffect } from 'react'
import './SplashScreen.css'

const SplashScreen = ({ onComplete, playerNames }) => {
  const [phase, setPhase] = useState(0)
  
  // Use custom names or defaults
  const name1 = playerNames?.player1 || 'Luis'
  const name2 = playerNames?.player2 || 'Gerard'

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => onComplete(), 4500)
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className="splash-screen">
      <div className="splash-bg"></div>
      
      <div className={`splash-content ${phase >= 1 ? 'visible' : ''}`}>
        <div className="splash-logo">
          <span className="logo-main">RETO</span>
          <span className="logo-accent">LUDAO'</span>
        </div>
        
        <div className={`splash-subtitle ${phase >= 2 ? 'visible' : ''}`}>
          <span className="troll-face">ಠ_ಠ</span>
          <span className="subtitle-text">Entrenamiento de calistenia</span>
          <span className="troll-face">ಠ_ಠ</span>
        </div>
      </div>

      <div className={`names-container ${phase >= 2 ? 'visible' : ''}`}>
        <div className="name-card name-player1">
          <div className="name-icon">😎</div>
          <div className="name-info">
            <span className="name-label">Jugador 1</span>
            <span className="name-title">{name1}</span>
            <span className="name-subtitle">¡A格斗! 💪</span>
          </div>
          <div className="name-decoration"></div>
        </div>

        <div className="vs-badge">
          <span>VS</span>
          <div className="vs-flames">🔥🔥🔥</div>
        </div>

        <div className="name-card name-player2">
          <div className="name-icon">🤙</div>
          <div className="name-info">
            <span className="name-label">Jugador 2</span>
            <span className="name-title">{name2}</span>
            <span className="name-subtitle">¡Prepárate! 🔥</span>
          </div>
          <div className="name-decoration"></div>
        </div>
      </div>

      <div className={`splash-footer ${phase >= 3 ? 'visible' : ''}`}>
        <div className="footer-text">
          <span className="blink-text">( ͡° ͜ʖ ͡°)</span>
          <span className="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>

      <div className="splash-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="splash-glitch"></div>
    </div>
  )
}

export default SplashScreen