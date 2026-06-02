import { useState } from 'react'
import './NameSetup.css'

const NameSetup = ({ defaultNames, onComplete }) => {
  const [player1Name, setPlayer1Name] = useState(defaultNames?.player1 || '')
  const [player2Name, setPlayer2Name] = useState(defaultNames?.player2 || '')
  const [step, setStep] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const name1 = player1Name.trim() || 'Jugador 1'
    const name2 = player2Name.trim() || 'Jugador 2'
    
    onComplete({ player1: name1, player2: name2 })
  }

  return (
    <div className="name-setup">
      <div className="name-setup-bg"></div>
      
      <div className="name-setup-content">
        <div className="name-setup-header">
          <h1 className="name-setup-title">
            <span className="title-reto">RETO</span>
            <span className="title-luis">LUDAO'</span>
          </h1>
          <p className="name-setup-subtitle">Configuremos a los competidores 👊</p>
        </div>

        {step === 1 && (
          <form className="name-form" onSubmit={(e) => { e.preventDefault(); setStep(2) }}>
            <div className="name-input-group">
              <label className="name-label">
                <span className="player-number">1</span>
                <span className="player-emoji">😎</span>
                ¿Cómo te llamas?
              </label>
              <input
                type="text"
                className="name-input"
                placeholder="Nombre del jugador 1"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                maxLength={20}
                autoFocus
              />
              <span className="name-hint">Máximo 20 caracteres</span>
            </div>

            <button type="submit" className="btn btn-primary btn-lg name-next-btn">
              Siguiente →
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="name-form" onSubmit={handleSubmit}>
            <div className="name-input-group">
              <label className="name-label">
                <span className="player-number">2</span>
                <span className="player-emoji">🤙</span>
                ¿Cómo se llama tu contrincante?
              </label>
              <input
                type="text"
                className="name-input"
                placeholder="Nombre del jugador 2"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                maxLength={20}
                autoFocus
              />
              <span className="name-hint">Máximo 20 caracteres</span>
            </div>

            <div className="name-form-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setStep(1)}
              >
                ← Atrás
              </button>
              <button type="submit" className="btn btn-success btn-lg">
                🚀 ¡Comenzar!
              </button>
            </div>
          </form>
        )}

        <div className="name-setup-footer">
          <span className="troll-face">ಠ_ಠ</span>
          <span>¿Listos para el dolor?</span>
          <span className="troll-face">ಠ_ಠ</span>
        </div>
      </div>

      <div className="name-setup-particles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default NameSetup