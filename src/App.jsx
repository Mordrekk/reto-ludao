import { useState, useEffect, useCallback, useRef } from 'react'
import { LEVELS, CHALLENGES, PUNISHMENTS, PLAYERS } from './data/challenges'
import { saveProgress, loadProgress, exportProgress, shareViaWhatsApp } from './utils/storage'
import SplashScreen from './components/SplashScreen'
import Confetti from './components/Confetti'
import './App.css'

// Sound effects using Web Audio API
const playSound = (type) => {
  if (!soundEnabledRef.current) return
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    if (type === 'success') {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1)
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2)
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } else if (type === 'fail') {
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1)
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } else if (type === 'turn') {
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.05)
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }
  } catch (e) {
    // Audio not supported
  }
}

// Achievements system
const ACHIEVEMENTS = [
  { id: 'first_complete', name: 'Primer paso', description: 'Completa tu primer reto', icon: '🎯', check: (state) => state.luis.completedChallenges.length + state.gerard.completedChallenges.length >= 1 },
  { id: 'streak_3', name: 'En racha', description: '3 retos seguidos', icon: '🔥', check: (state) => Object.values(state.consecutiveWins).some(w => w >= 3) },
  { id: 'streak_5', name: 'Imparable', description: '5 retos seguidos', icon: '⚡', check: (state) => Object.values(state.consecutiveWins).some(w => w >= 5) },
  { id: 'punishment_taker', name: 'Martir', description: 'Recibe 5 castigos', icon: '😭', check: (state) => state.luis.failedChallenges.length + state.gerard.failedChallenges.length >= 5 },
  { id: 'legend_complete', name: 'Leyenda', description: 'Completa un reto de Leyenda', icon: '👑', check: (state) => {
    const legendChallenges = CHALLENGES.legend || []
    return [...state.luis.completedChallenges, ...state.gerard.completedChallenges].some(id => legendChallenges.find(c => c.id === id))
  }},
  { id: 'all_principiante', name: 'Principiante completado', description: 'Completa todos los retos de principiante', icon: '🌱', check: (state) => {
    const principianteChallenges = CHALLENGES.principiante || []
    const completed = [...state.luis.completedChallenges, ...state.gerard.completedChallenges]
    return principianteChallenges.every(c => completed.includes(c.id))
  }},
  { id: 'duo_master', name: 'Maestro del duo', description: 'Entre ambos completad 20 retos', icon: '🏆', check: (state) => state.luis.completedChallenges.length + state.gerard.completedChallenges.length >= 20 },
  { id: 'sufferer', name: 'Bien sufrido', description: 'Recibe 10 castigos entre ambos', icon: '💀', check: (state) => state.luis.failedChallenges.length + state.gerard.failedChallenges.length >= 10 }
]

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5)

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [gameState, setGameState] = useState({
    currentLevel: 'principiante',
    currentTurn: 'luis',
    luis: { completedChallenges: [], failedChallenges: [] },
    gerard: { completedChallenges: [], failedChallenges: [] },
    currentChallenge: null,
    showPunishment: false,
    currentPunishment: null,
    challengeHistory: [],
    consecutiveWins: { luis: 0, gerard: 0 },
    achievements: []
  })

  const [showImportModal, setShowImportModal] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [historyFilter, setHistoryFilter] = useState('all') // all, luis, gerard, completed, failed
  const [notification, setNotification] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [punishmentShake, setPunishmentShake] = useState(false)
  const isProcessingRef = useRef(false)
  const isInitialized = useRef(false)
  const soundEnabledRef = useRef(true)

  // Check achievements
  useEffect(() => {
    if (!isInitialized.current) return
    const newAchievements = ACHIEVEMENTS
      .filter(ach => !gameState.achievements.includes(ach.id) && ach.check(gameState))
      .map(ach => ach.id)
    
    if (newAchievements.length > 0) {
      setGameState(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements]
      }))
      const latestAch = ACHIEVEMENTS.find(a => a.id === newAchievements[0])
      setNotification({
        type: 'success',
        message: `🏆 ¡Logro desbloqueado: ${latestAch.name}! ${latestAch.icon}`
      })
      setTimeout(() => setNotification(null), 3000)
    }
  }, [gameState.luis.completedChallenges.length, gameState.gerard.completedChallenges.length, gameState.consecutiveWins])

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

    playSound('success')
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

    playSound('fail')
    setShowConfetti(true)
    setPunishmentShake(true)
    setTimeout(() => setPunishmentShake(false), 500)
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
    setShowConfetti(false)
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
    playSound('turn')
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
        consecutiveWins: { luis: 0, gerard: 0 },
        achievements: []
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

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
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
          <button className="btn btn-icon" onClick={() => setShowAchievements(!showAchievements)} title="Logros">
            🏆 {gameState.achievements.length}
          </button>
          <button className="btn btn-icon" onClick={() => setShowHistory(!showHistory)} title="Historial">
            📜 {gameState.challengeHistory.length}
          </button>
          <button className="btn btn-secondary" onClick={() => setShowStats(!showStats)}>
            📊 {showStats ? 'Ocultar' : 'Stats'}
          </button>
          <button className="btn btn-secondary" onClick={handleExport}>📤 Exportar</button>
          <button className="btn btn-secondary" onClick={handleShareWhatsApp}>📱 WhatsApp</button>
          <button className="btn btn-icon" onClick={() => { soundEnabledRef.current = !soundEnabledRef.current; setNotification({ type: 'info', message: soundEnabledRef.current ? '🔊 Sonido activado' : '🔇 Sonido desactivado' }); setTimeout(() => setNotification(null), 1500) }} title="Toggle sonido">
            {soundEnabledRef.current ? '🔊' : '🔇'}
          </button>
          <button className="btn btn-danger" onClick={handleResetProgress}>🔄 Reset</button>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Achievements Panel */}
      {showAchievements && (
        <div className="achievements-panel">
          <h2 className="achievements-title">
            <span>🏆</span> Logros <span>🏆</span>
          </h2>
          <div className="achievements-grid">
            {ACHIEVEMENTS.map(ach => {
              const unlocked = gameState.achievements.includes(ach.id)
              return (
                <div key={ach.id} className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}>
                  <div className="achievement-icon">{unlocked ? ach.icon : '🔒'}</div>
                  <div className="achievement-info">
                    <div className="achievement-name">{ach.name}</div>
                    <div className="achievement-desc">{ach.description}</div>
                  </div>
                  {unlocked && <div className="achievement-check">✓</div>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* History Panel */}
      {showHistory && (
        <div className="history-panel">
          <div className="history-header">
            <h2 className="history-title">
              <span>📜</span> Historial de Retos <span>📜</span>
            </h2>
            <div className="history-filters">
              <button 
                className={`filter-btn ${historyFilter === 'all' ? 'active' : ''}`}
                onClick={() => setHistoryFilter('all')}
              >
               Todos
              </button>
              <button 
                className={`filter-btn ${historyFilter === 'luis' ? 'active' : ''}`}
                onClick={() => setHistoryFilter('luis')}
              >
                😎 Luis
              </button>
              <button 
                className={`filter-btn ${historyFilter === 'gerard' ? 'active' : ''}`}
                onClick={() => setHistoryFilter('gerard')}
              >
                🤙 Gerard
              </button>
              <button 
                className={`filter-btn ${historyFilter === 'completed' ? 'active' : ''}`}
                onClick={() => setHistoryFilter('completed')}
              >
                ✅ Completados
              </button>
              <button 
                className={`filter-btn ${historyFilter === 'failed' ? 'active' : ''}`}
                onClick={() => setHistoryFilter('failed')}
              >
                ❌ Fallados
              </button>
            </div>
          </div>

          {/* Evolution Stats */}
          <div className="evolution-stats">
            <div className="evolution-card">
              <div className="evolution-icon">📊</div>
              <div className="evolution-info">
                <span className="evolution-value">{gameState.challengeHistory.length}</span>
                <span className="evolution-label">Total retos</span>
              </div>
            </div>
            <div className="evolution-card success">
              <div className="evolution-icon">✅</div>
              <div className="evolution-info">
                <span className="evolution-value">{gameState.challengeHistory.filter(h => h.completed).length}</span>
                <span className="evolution-label">Completados</span>
              </div>
            </div>
            <div className="evolution-card fail">
              <div className="evolution-icon">❌</div>
              <div className="evolution-info">
                <span className="evolution-value">{gameState.challengeHistory.filter(h => !h.completed).length}</span>
                <span className="evolution-label">Fallados</span>
              </div>
            </div>
            <div className="evolution-card rate">
              <div className="evolution-icon">🎯</div>
              <div className="evolution-info">
                <span className="evolution-value">
                  {gameState.challengeHistory.length > 0 
                    ? Math.round((gameState.challengeHistory.filter(h => h.completed).length / gameState.challengeHistory.length) * 100)
                    : 0}%
                </span>
                <span className="evolution-label">Tasa éxito</span>
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="history-list">
            {gameState.challengeHistory.length === 0 ? (
              <div className="history-empty">
                <p className="trollface">ಠ_ಠ</p>
                <p>No hay historial todavía</p>
                <p className="history-empty-sub">Completa tu primer reto para ver el progreso</p>
              </div>
            ) : (
              [...gameState.challengeHistory]
                .filter(h => {
                  if (historyFilter === 'all') return true
                  if (historyFilter === 'luis') return h.player === 'luis'
                  if (historyFilter === 'gerard') return h.player === 'gerard'
                  if (historyFilter === 'completed') return h.completed
                  if (historyFilter === 'failed') return !h.completed
                  return true
                })
                .reverse()
                .map((entry, index) => {
                  const levelKey = Object.keys(CHALLENGES).find(k => 
                    CHALLENGES[k].some(c => c.id === entry.id)
                  )
                  const level = levelKey ? LEVELS[levelKey] : { name: 'Unknown', emoji: '❓', color: '#888' }
                  const date = new Date(entry.completed ? entry.completedAt : entry.failedAt)
                  const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
                  const dateStr = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
                  
                  return (
                    <div 
                      key={`${entry.id}-${index}`} 
                      className={`history-entry ${entry.completed ? 'success' : 'fail'}`}
                    >
                      <div className="history-entry-left">
                        <div className="history-entry-status">
                          {entry.completed ? '✅' : '❌'}
                        </div>
                        <div className="history-entry-info">
                          <div className="history-entry-exercise">
                            {entry.exercise}
                          </div>
                          <div className="history-entry-meta">
                            <span className="history-entry-player">
                              {PLAYERS[entry.player]?.emoji} {PLAYERS[entry.player]?.name}
                            </span>
                            <span 
                              className="history-entry-level"
                              style={{ color: level.color }}
                            >
                              {level.emoji} {level.name}
                            </span>
                            {entry.punishment && (
                              <span className="history-entry-punishment">
                                🎉 {entry.punishment.length > 30 ? entry.punishment.substring(0, 30) + '...' : entry.punishment}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="history-entry-right">
                        <div className="history-entry-date">{dateStr}</div>
                        <div className="history-entry-time">{timeStr}</div>
                      </div>
                    </div>
                  )
                })
            )}
          </div>
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
      <div className="turn-indicator animate-in">
        <div className={`turn-player ${gameState.currentTurn}`} style={{ '--player-color': PLAYERS[gameState.currentTurn].color }}>
          <span className="turn-emoji">{PLAYERS[gameState.currentTurn].emoji}</span>
          <span className="turn-name">Turno de {PLAYERS[gameState.currentTurn].name}</span>
          {gameState.consecutiveWins[gameState.currentTurn] > 0 && (
            <span className="turn-streak animate-bounce">🔥 {gameState.consecutiveWins[gameState.currentTurn]} seguidos</span>
          )}
        </div>
      </div>

      {/* Level Selector */}
      <div className="level-selector animate-slide-up">
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
        <div className="challenge-container animate-fade-in">
          <div className="challenge-card animate-card-appear">
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
          </div>            <button className="btn btn-pass animate-pulse" onClick={handleNextTurn}>
              ⏭️ Pasar turno a {PLAYERS[gameState.currentTurn === 'luis' ? 'gerard' : 'luis'].name}
            </button>
        </div>
      ) : (
        <div className="no-challenge animate-fade-in">
          <p className="trollface">ಠ_ಠ</p>
          <p>¿Y el reto? ¿Perdido? 🤔</p>
          <button className="btn btn-primary" onClick={getNewChallenge}>
            🎲 Sacar nuevo reto
          </button>
        </div>
      )}

      {/* Confetti Effect */}
      <Confetti active={showConfetti} />

      {/* Punishments Modal - EPIC VERSION */}
      {gameState.showPunishment && gameState.currentPunishment && (
        <div className="modal-overlay epic-modal-overlay" onClick={closePunishmentModal}>
          <div 
            className={`modal-content punishment-modal epic-punishment ${punishmentShake ? 'shake' : ''}`} 
            onClick={e => e.stopPropagation()}
          >
            <div className="epic-glow"></div>
            <div className="punishment-header epic-header">
              <div className="epic-borders">
                <span>╔</span><span>═</span><span>╗</span><span>╔</span><span>═</span><span>╗</span>
              </div>
              <div className="epic-title-container">
                <span className="epic-skull">💀</span>
                <h2 className="punishment-title epic-title">
                  <span className="epic-letter">C</span>
                  <span className="epic-letter">A</span>
                  <span className="epic-letter">S</span>
                  <span className="epic-letter">T</span>
                  <span className="epic-letter">I</span>
                  <span className="epic-letter">G</span>
                  <span className="epic-letter">O</span>
                </h2>
                <span className="epic-skull">💀</span>
              </div>
              <div className="epic-borders">
                <span>╚</span><span>═</span><span>╝</span><span>╚</span><span>═</span><span>╝</span>
              </div>
            </div>
            
            <div className="punishment-body epic-body">
              <div className="epic-player-fail">
                <div className="epic-player-icon">{PLAYERS[gameState.currentTurn].emoji}</div>
                <div className="epic-player-name">{PLAYERS[gameState.currentTurn].name}</div>
                <div className="epic-failed-text">FALLÓ</div>
              </div>
              
              <div className="epic-exercise-failed">
                <span className="epic-cross">✖</span>
                {gameState.currentChallenge?.exercise}
              </div>
              
              <div className="punishment-card epic-punishment-card">
                <div className="epic-punishment-emoji">{gameState.currentPunishment.emoji}</div>
                <p className="punishment-text epic-punishment-text">{gameState.currentPunishment.text}</p>
                <div className="epic-punishment-type">{gameState.currentPunishment.type}</div>
              </div>
              
              <div className="epic-warning">
                <span className="epic-warning-icon">⚠️</span>
                <span>Esto es solo entre tú y Gerard</span>
                <span className="epic-warning-icon">⚠️</span>
              </div>
            </div>
            
            <button className="btn btn-epic btn-lg epic-accept-btn" onClick={closePunishmentModal}>
              <span className="epic-btn-icon">😈</span>
              <span>Aceptar Castigo</span>
              <span className="epic-btn-icon">🔥</span>
            </button>
            
            <div className="epic-particles">
              {[...Array(12)].map((_, i) => (
                <span key={i} className="epic-particle" style={{ animationDelay: `${i * 0.1}s` }}>✦</span>
              ))}
            </div>
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