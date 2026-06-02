import { useState, useEffect, useCallback, useRef } from 'react'
import { LEVELS, CHALLENGES, PUNISHMENTS, PLAYERS } from './data/challenges'
import { saveProgress, loadProgress, exportProgress, shareViaWhatsApp } from './utils/storage'
import './App.css'

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5)

function App() {
  const [gameState, setGameState] = useState({
    currentLevel: 'principiante',
    currentTurn: 'luis',
    luis: { completedChallenges: [], failedChallenges: [] },
    gerard: { completedChallenges: [], failedChallenges: [] },
    currentChallenge: null,
    showPunishment: false,
    currentPunishment: null,
    challengeHistory: [],
    consecutiveWins: { luis: 0, gerard: 0 }
  })

  const [showImportModal, setShowImportModal] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [notification, setNotification] = useState(null)
  const isProcessingRef = useRef(false)
  const isInitialized = useRef(false)

  // Cargar progreso al iniciar
  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true
    
    const saved = loadProgress()
    if (saved) {
      setGameState(prev => ({ ...prev, ...saved }))
    }
    getNewChallenge()
  }, [])

  // Guardar progreso cuando cambie
  useEffect(() => {
    if (gameState.currentChallenge !== null || isInitialized.current) {
      saveProgress(gameState)
    }
  }, [gameState])

  const getNewChallenge = useCallback(() => {
    if (isProcessingRef.current) return
    setGameState(prev => {
      const levelChallenges = CHALLENGES[prev.currentLevel] || []
      const currentPlayer = prev[prev.currentTurn]
      const availableChallenges = levelChallenges.filter(
        c => !currentPlayer.completedChallenges.includes(c.id)
      )
      
      if (availableChallenges.length === 0) {
    setNotification({
      type: 'success',
      message: `🎉 ¡${PLAYERS[prev.currentTurn].name} ha completado todos los retos de ${LEVELS[prev.currentLevel].name}!`
    })
        setTimeout(() => setNotification(null), 4000)
        return prev
      }

      const challenge = getRandomItem(shuffleArray(availableChallenges))
      return {
        ...prev,
        currentChallenge: { ...challenge, startedAt: Date.now() }
      }
    })
  }, [])

  const handleCompleteChallenge = useCallback(() => {
    if (isProcessingRef.current || !gameState.currentChallenge) return
    isProcessingRef.current = true
    
    const playerKey = gameState.currentTurn
    const challengeId = gameState.currentChallenge.id

    setGameState(prev => ({
      ...prev,
      [playerKey]: {
        ...prev[playerKey],
        completedChallenges: [...prev[playerKey].completedChallenges, challengeId]
      },
      consecutiveWins: {
        ...prev.consecutiveWins,
        [playerKey]: prev.consecutiveWins[playerKey] + 1
      },
      challengeHistory: [
        ...prev.challengeHistory,
        { 
          ...prev.currentChallenge, 
          completed: true, 
          player: playerKey, 
          completedAt: Date.now() 
        }
      ],
      currentChallenge: null
    }))

    setNotification({
      type: 'success',
      message: `💪 ¡Reto completado por ${PLAYERS[playerKey].name}! ${PLAYERS[playerKey].emoji}`
    })
    setTimeout(() => setNotification(null), 3000)

    setTimeout(() => {
      getNewChallenge()
      isProcessingRef.current = false
    }, 1500)
  }, [gameState.currentTurn, gameState.currentChallenge, getNewChallenge])

  const handleFailChallenge = useCallback(() => {
    if (isProcessingRef.current || !gameState.currentChallenge) return
    isProcessingRef.current = true
    
    const playerKey = gameState.currentTurn
    const punishment = getRandomItem(PUNISHMENTS)

    setGameState(prev => ({
      ...prev,
      [playerKey]: {
        ...prev[playerKey],
        failedChallenges: [...prev[playerKey].failedChallenges, prev.currentChallenge.id]
      },
      consecutiveWins: { ...prev.consecutiveWins, [playerKey]: 0 },
      currentPunishment: punishment,
      showPunishment: true,
      challengeHistory: [
        ...prev.challengeHistory,
        { 
          ...prev.currentChallenge, 
          completed: false, 
          player: playerKey, 
          failedAt: Date.now(),
          punishment: punishment.text
        }
      ]
    }))
    setTimeout(() => {
      isProcessingRef.current = false
    }, 500)
  }, [gameState.currentTurn, gameState.currentChallenge])

  const closePunishmentModal = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showPunishment: false,
      currentChallenge: null
    }))
    setTimeout(() => {
      getNewChallenge()
      isProcessingRef.current = false
    }, 500)
  }, [getNewChallenge])

  const handleNextTurn = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentTurn: prev.currentTurn === 'luis' ? 'gerard' : 'luis'
    }))
    setTimeout(() => getNewChallenge(), 300)
  }, [getNewChallenge])

  const handleLevelChange = useCallback((level) => {
    setGameState(prev => ({
      ...prev,
      currentLevel: level,
      currentChallenge: null
    }))
    setTimeout(() => getNewChallenge(), 300)
  }, [getNewChallenge])

  const handleResetProgress = useCallback(() => {
    if (confirm('Seguro que quieres resetear todo el progreso? ')) {
      setGameState({
        currentLevel: 'principiante',
        currentTurn: 'luis',
        luis: { completedChallenges: [], failedChallenges: [] },
        gerard: { completedChallenges: [], failedChallenges: [] },
        currentChallenge: null,
        showPunishment: false,
        currentPunishment: null,
        challengeHistory: [],
        consecutiveWins: { luis: 0, gerard: 0 }
      })
      setTimeout(() => getNewChallenge(), 300)
    }
  }, [getNewChallenge])

  const handleExport = () => {
    exportProgress(gameState)
    setNotification({ type: 'info', message: 'Progreso exportado!' })
    setTimeout(() => setNotification(null), 2000)
  }

  const handleShareWhatsApp = () => {
    shareViaWhatsApp({
      luis: gameState.luis,
      gerard: gameState.gerard,
      currentLevel: gameState.currentLevel,
      currentTurn: gameState.currentTurn
    })
  }

  const handleImport = (data) => {
    try {
      setGameState(prev => ({ ...prev, ...data }))
      setShowImportModal(false)
      setNotification({ type: 'success', message: 'Progreso importado!' })
      setTimeout(() => setNotification(null), 2000)
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al importar' })
      setTimeout(() => setNotification(null), 2000)
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-text">RETO</span>
          <span className="logo-accent">LUDAO'</span>
          <span className="logo-troll"> ( ͡° ͜ʖ ͡°)</span>
        </div>
        <div className="header-controls">
          <button className="btn btn-secondary" onClick={() => setShowStats(!showStats)}>
            📊 {showStats ? 'Ocultar' : 'Stats'}
          </button>
          <button className="btn btn-secondary" onClick={handleExport}>📤 Exportar</button>
          <button className="btn btn-secondary" onClick={handleShareWhatsApp}>📱 WhatsApp</button>
          <button className="btn btn-danger" onClick={handleResetProgress}>🔄 Reset</button>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Stats Panel */}
      {showStats && (
        <div className="stats-panel">
          <div className="stats-grid">
            <div className="stat-card stat-luis">
              <div className="stat-emoji">{PLAYERS.luis.emoji}</div>
              <div className="stat-name">{PLAYERS.luis.name}</div>
              <div className="stat-value">{gameState.luis.completedChallenges.length}</div>
              <div className="stat-label">completados</div>
              <div className="stat-fails">❌ {gameState.luis.failedChallenges.length}</div>
            </div>
            <div className="stat-card stat-gerard">
              <div className="stat-emoji">{PLAYERS.gerard.emoji}</div>
              <div className="stat-name">{PLAYERS.gerard.name}</div>
              <div className="stat-value">{gameState.gerard.completedChallenges.length}</div>
              <div className="stat-label">completados</div>
              <div className="stat-fails">❌ {gameState.gerard.failedChallenges.length}</div>
            </div>
          </div>
          <div className="stats-level">
            <span className="stats-level-label">Nivel actual:</span>
            <span className="stats-level-value" style={{ color: LEVELS[gameState.currentLevel].color }}>
              {LEVELS[gameState.currentLevel].emoji} {LEVELS[gameState.currentLevel].name}
            </span>
          </div>
        </div>
      )}

      {/* Turn Indicator */}
      <div className="turn-indicator">
        <div className={`turn-player ${gameState.currentTurn}`} style={{ '--player-color': PLAYERS[gameState.currentTurn].color }}>
          <span className="turn-emoji">{PLAYERS[gameState.currentTurn].emoji}</span>
          <span className="turn-name">Turno de {PLAYERS[gameState.currentTurn].name}</span>
          {gameState.consecutiveWins[gameState.currentTurn] > 0 && (
            <span className="turn-streak">🔥 {gameState.consecutiveWins[gameState.currentTurn]} seguidos</span>
          )}
        </div>
      </div>

      {/* Level Selector */}
      <div className="level-selector">
        {Object.entries(LEVELS).map(([key, level]) => (
          <button
            key={key}
            className={`level-btn ${gameState.currentLevel === key ? 'active' : ''}`}
            style={{ '--level-color': level.color }}
            onClick={() => handleLevelChange(key)}
          >
            <span className="level-emoji">{level.emoji}</span>
            <span className="level-name">{level.name}</span>
          </button>
        ))}
      </div>

      {/* Challenge Card */}
      {gameState.currentChallenge ? (
        <div className="challenge-container">
          <div className="challenge-card">
            <div className="challenge-level-badge" style={{ backgroundColor: LEVELS[gameState.currentLevel].color }}>
              {LEVELS[gameState.currentLevel].emoji} {LEVELS[gameState.currentLevel].name}
            </div>
            <h2 className="challenge-title">
              {gameState.currentChallenge.exercise}
            </h2>
            <div className="challenge-reps">
              <span className="challenge-reps-number">{gameState.currentChallenge.reps}</span>
              <span className="challenge-reps-unit">{gameState.currentChallenge.unit}</span>
            </div>
            <div className="challenge-meme">
              ( ͡° ͜ʖ ͡°)
            </div>
          </div>

          <div className="challenge-actions">
            <button className="btn btn-success btn-lg" onClick={handleCompleteChallenge}>
              !Hecho!
            </button>
            <button className="btn btn-danger btn-lg" onClick={handleFailChallenge}>
              No puedo
            </button>
          </div>

          <button className="btn btn-pass" onClick={handleNextTurn}>
            ⏭️ Pasar turno a {PLAYERS[gameState.currentTurn === 'luis' ? 'gerard' : 'luis'].name}
          </button>
        </div>
      ) : (
        <div className="no-challenge">
          <p className="trollface">ಠ_ಠ</p>
          <p>¿Y el reto? ¿Perdido? 🤔</p>
          <button className="btn btn-primary" onClick={getNewChallenge}>
            🎲 Sacar nuevo reto
          </button>
        </div>
      )}

      {/* Punishments Modal */}
      {gameState.showPunishment && gameState.currentPunishment && (
        <div className="modal-overlay" onClick={closePunishmentModal}>
          <div className="modal-content punishment-modal" onClick={e => e.stopPropagation()}>
            <div className="punishment-header">
              <span className="punishment-troll">╔═╗╔═╗╔═╗╔╗╔╔═╗</span>
              <h2 className="punishment-title">🎉 ¡CASTIGO! 🎉</h2>
              <span className="punishment-troll">╚═╝╚═╝╚═╝╚╝╚╚═╝</span>
            </div>
            <div className="punishment-body">
              <p className="punishment-player">
                {PLAYERS[gameState.currentTurn].emoji} {PLAYERS[gameState.currentTurn].name} falló:
              </p>
              <p className="punishment-exercise">
                {gameState.currentChallenge?.exercise}
              </p>
              <div className="punishment-card">
                <span className="punishment-emoji">{gameState.currentPunishment.emoji}</span>
                <p className="punishment-text">{gameState.currentPunishment.text}</p>
              </div>
              <p className="punishment-lore">
                ℹ️ Esto es solo entre tú y Gerard, no nos hacemos responsables 😂
              </p>
            </div>
            <button className="btn btn-primary btn-lg" onClick={closePunishmentModal}>
              Aceptarcastigo 😈
            </button>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="modal-content import-modal" onClick={e => e.stopPropagation()}>
            <h2>📥 Importar Progreso</h2>
            <p>Carga el archivo JSON que te haya enviado Gerard:</p>
            <input
              type="file"
              accept=".json"
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = (ev) => {
                    try {
                      const data = JSON.parse(ev.target.result)
                      handleImport(data)
                    } catch {
                      setNotification({ type: 'error', message: '❌ JSON inválido' })
                      setTimeout(() => setNotification(null), 2000)
                    }
                  }
                  reader.readAsText(file)
                }
              }}
            />
            <button className="btn btn-secondary" onClick={() => setShowImportModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>🤡 Reto Ludao' - Para Luis y Gerard 💪</p>
        <p className="footer-troll">( ͡° ͜ʖ ͡°) No te rindas, amigo ( ͡° ͜ʖ ͡°)</p>
        <button className="btn btn-import" onClick={() => setShowImportModal(true)}>
          📥 Importar progreso
        </button>
      </footer>
    </div>
  )
}

export default App