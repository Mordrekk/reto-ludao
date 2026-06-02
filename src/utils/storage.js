const STORAGE_KEY = 'reto-ludao-progress'

export const saveProgress = (data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2)
    localStorage.setItem(STORAGE_KEY, jsonData)
    return true
  } catch (error) {
    console.error('Error guardando:', error)
    return false
  }
}

export const loadProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error cargando:', error)
    return null
  }
}

export const exportProgress = (data) => {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `reto-ludao-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const importProgress = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        resolve(data)
      } catch (error) {
        reject(new Error('Archivo JSON inválido'))
      }
    }
    reader.onerror = () => reject(new Error('Error leyendo archivo'))
    reader.readAsText(file)
  })
}

export const shareViaWhatsApp = (data) => {
  const text = encodeURIComponent(`🔥 *Reto Ludao' - Progreso* 🔥\n\n` +
    `👤 *Luis:* ${data.luis?.completedChallenges || 0} retos completados\n` +
    `🤙 *Gerard:* ${data.gerard?.completedChallenges || 0} retos completados\n\n` +
    `📊 *Nivel actual:* ${data.currentLevel || 'principiante'}\n` +
    `🎯 *Turno actual:* ${data.currentTurn || 'luis'}\n\n` +
    `¡Manda este JSON a Gerard para sincronizar!`)
  
  window.open(`https://wa.me/?text=${text}`, '_blank')
}