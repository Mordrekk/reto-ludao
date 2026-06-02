import { useState, useEffect, useRef, useCallback } from 'react'
import './MusicPlayer.css'

const YOUTUBE_VIDEO_ID = '0QjHiah9Z3I'

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const playerRef = useRef(null)
  const playerContainerRef = useRef(null)

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initializePlayer()
      return
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(tag, firstScript)

    window.onYouTubeIframeAPIReady = () => {
      initializePlayer()
    }

    return () => {
      window.onYouTubeIframeAPIReady = undefined
    }
  }, [])

  const initializePlayer = useCallback(() => {
    if (!playerContainerRef.current || playerRef.current) return

    const player = new window.YT.Player(playerContainerRef.current, {
      height: '0',
      width: '0',
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 0,
        loop: 1,
        modestbranding: 1,
        playlist: YOUTUBE_VIDEO_ID,
        rel: 0,
        showinfo: 0,
      },
      events: {
        onReady: (event) => {
          playerRef.current = event.target
          setIsReady(true)
          player.setVolume(volume)
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            player.playVideo()
          }
        }
      }
    })
  }, [volume])

  const togglePlay = useCallback(() => {
    if (!playerRef.current || !isReady) return
    
    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, isReady])

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume)
    const shouldBeMuted = newVolume === 0
    setIsMuted(shouldBeMuted)
    
    if (playerRef.current && isReady) {
      playerRef.current.setVolume(newVolume)
      if (shouldBeMuted) {
        playerRef.current.mute()
      } else {
        playerRef.current.unMute()
      }
    }
  }, [isReady])

  const toggleMute = useCallback(() => {
    if (!playerRef.current || !isReady) return
    
    if (isMuted) {
      playerRef.current.unMute()
      const volToSet = volume === 0 ? 50 : volume
      playerRef.current.setVolume(volToSet)
      setIsMuted(false)
      setVolume(volToSet)
    } else {
      playerRef.current.mute()
      setIsMuted(true)
    }
  }, [isMuted, volume, isReady])

  const increaseVolume = useCallback(() => {
    const newVolume = Math.min(100, volume + 10)
    handleVolumeChange(newVolume)
  }, [volume, handleVolumeChange])

  const decreaseVolume = useCallback(() => {
    const newVolume = Math.max(0, volume - 10)
    handleVolumeChange(newVolume)
  }, [volume, handleVolumeChange])

  return (
    <div className="music-player">
      <div className="music-info">
        <span className="music-icon">🎵</span>
        <span className="music-title">BGM Calistenia</span>
        {!isReady && <span className="music-loading">Cargando...</span>}
      </div>
      
      <div className="music-controls">
        <button 
          className={`music-btn play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlay}
          disabled={!isReady}
          title={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="volume-controls">
          <button 
            className="music-btn volume-btn"
            onClick={toggleMute}
            disabled={!isReady}
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted || volume === 0 ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : volume < 50 ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>

          <button 
            className="music-btn volume-adjust"
            onClick={decreaseVolume}
            disabled={!isReady}
            title="Bajar volumen"
          >
            −
          </button>

          <div className="volume-bar-container">
            <div 
              className="volume-bar-fill"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="volume-slider"
              disabled={!isReady}
            />
          </div>

          <button 
            className="music-btn volume-adjust"
            onClick={increaseVolume}
            disabled={!isReady}
            title="Subir volumen"
          >
            +
          </button>
        </div>
      </div>

      {/* Hidden YouTube player */}
      <div ref={playerContainerRef} className="youtube-player" />
    </div>
  )
}

export default MusicPlayer