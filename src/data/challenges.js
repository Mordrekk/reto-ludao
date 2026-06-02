export const LEVELS = {
  principiante: {
    name: 'Principiante',
    emoji: '🌱',
    color: '#00d26a',
    description: 'Para los que están empezando en esto del mundo'
  },
  medio: {
    name: 'Medio',
    emoji: '💪',
    color: '#ffc107',
    description: 'Ya te estás moviendo bien, pero aún te falta'
  },
  avanzado: {
    name: 'Avanzado',
    emoji: '🔥',
    color: '#ff6b35',
    description: 'Nivel de tío que entrena de verdad'
  },
  elite: {
    name: 'Elite',
    emoji: '⚡',
    color: '#e94560',
    description: 'Casi ná, pero casi todo'
  },
  leyenda: {
    name: 'Leyenda',
    emoji: '👑',
    color: '#9b59b6',
    description: '¿Pero quién narices eres tú?'
  }
}

export const CHALLENGES = {
  principiante: [
    { id: 'p1', exercise: '20 flexiones clásicas', reps: 20, unit: 'reps' },
    { id: 'p2', exercise: '30 sentadillas', reps: 30, unit: 'reps' },
    { id: 'p3', exercise: '10 flexiones diamante', reps: 10, unit: 'reps' },
    { id: 'p4', exercise: '40 segundos plank', reps: 40, unit: 'segundos' },
    { id: 'p5', exercise: '15 burpees', reps: 15, unit: 'reps' },
    { id: 'p6', exercise: '20 fondos en banco', reps: 20, unit: 'reps' },
    { id: 'p7', exercise: '30 segundos wall sit', reps: 30, unit: 'segundos' },
    { id: 'p8', exercise: '25 elevaciones de talón', reps: 25, unit: 'reps' },
    { id: 'p9', exercise: '10 flexiones con pausa', reps: 10, unit: 'reps' },
    { id: 'p10', exercise: '20 skiping alto', reps: 20, unit: 'reps' },
    { id: 'p11', exercise: '15 zancadas caminando', reps: 15, unit: 'reps' },
    { id: 'p12', exercise: '30 segundos tabla lateral', reps: 30, unit: 'segundos' }
  ],
  medio: [
    { id: 'm1', exercise: '30 flexiones archer', reps: 30, unit: 'reps' },
    { id: 'm2', exercise: '20 flexiones clap', reps: 20, unit: 'reps' },
    { id: 'm3', exercise: '40 segundos handstand contra pared', reps: 40, unit: 'segundos' },
    { id: 'm4', exercise: '15 dominadas', reps: 15, unit: 'reps' },
    { id: 'm5', exercise: '25 fondos en paralelas', reps: 25, unit: 'reps' },
    { id: 'm6', exercise: '50 segundos plank con toque de hombro', reps: 50, unit: 'segundos' },
    { id: 'm7', exercise: '20 pike push-ups', reps: 20, unit: 'reps' },
    { id: 'm8', exercise: '30 burpees con clap', reps: 30, unit: 'reps' },
    { id: 'm9', exercise: '15 muscle-ups falsos', reps: 15, unit: 'reps' },
    { id: 'm10', exercise: '40 segundos L-sit en suelo', reps: 40, unit: 'segundos' },
    { id: 'm11', exercise: '25 elevaciones de piernas colgado', reps: 25, unit: 'reps' },
    { id: 'm12', exercise: '20 zancadas con salto', reps: 20, unit: 'reps' }
  ],
  avanzado: [
    { id: 'a1', exercise: '10 flexiones en pino', reps: 10, unit: 'reps' },
    { id: 'a2', exercise: '15 muscle-ups', reps: 15, unit: 'reps' },
    { id: 'a3', exercise: '20 segundos handstand libre', reps: 20, unit: 'segundos' },
    { id: 'a4', exercise: '30 dominadas explosivas', reps: 30, unit: 'reps' },
    { id: 'a5', exercise: '25 flexiones con leva', reps: 25, unit: 'reps' },
    { id: 'a6', exercise: '40 segundos L-sit en paralelas', reps: 40, unit: 'segundos' },
    { id: 'a7', exercise: '15 front lever negatives', reps: 15, unit: 'reps' },
    { id: 'a8', exercise: '20 burpees con salto vertical', reps: 20, unit: 'reps' },
    { id: 'a9', exercise: '10 handstand push-ups negativos', reps: 10, unit: 'reps' },
    { id: 'a10', exercise: '25 pull-ups con pausa arriba', reps: 25, unit: 'reps' },
    { id: 'a11', exercise: '30 segundos tuck planch', reps: 30, unit: 'segundos' },
    { id: 'a12', exercise: '15 pseudo planche push-ups', reps: 15, unit: 'reps' }
  ],
  elite: [
    { id: 'e1', exercise: '5 handstand push-ups completos', reps: 5, unit: 'reps' },
    { id: 'e2', exercise: '10 muscle-ups consecutivos', reps: 10, unit: 'reps' },
    { id: 'e3', exercise: '15 segundos handstand libre estable', reps: 15, unit: 'segundos' },
    { id: 'e4', exercise: '20 segundos front lever', reps: 20, unit: 'segundos' },
    { id: 'e5', exercise: '12 planche lean push-ups', reps: 12, unit: 'reps' },
    { id: 'e6', exercise: '8 back lever negatives', reps: 8, unit: 'reps' },
    { id: 'e7', exercise: '30 segundos L-sit avanzado', reps: 30, unit: 'segundos' },
    { id: 'e8', exercise: '15 pull-ups con 10kg extra', reps: 15, unit: 'reps' },
    { id: 'e9', exercise: '10 dragon flag negatives', reps: 10, unit: 'reps' },
    { id: 'e10', exercise: '20 segundos one arm flexión', reps: 20, unit: 'segundos' },
    { id: 'e11', exercise: '7 muscle-ups en anillas', reps: 7, unit: 'reps' },
    { id: 'e12', exercise: '25 segundos handstand plank', reps: 25, unit: 'segundos' }
  ],
  leyenda: [
    { id: 'l1', exercise: '1 handstand push-up completo sin apoyo', reps: 1, unit: 'rep' },
    { id: 'l2', exercise: '5 muscle-ups consecutivos en barra', reps: 5, unit: 'reps' },
    { id: 'l3', exercise: '10 segundos front lever perfecto', reps: 10, unit: 'segundos' },
    { id: 'l4', exercise: '3 back lever full', reps: 3, unit: 'reps' },
    { id: 'l5', exercise: '5 dragon flag completos', reps: 5, unit: 'reps' },
    { id: 'l6', exercise: '15 segundos one arm handstand', reps: 15, unit: 'segundos' },
    { id: 'l7', exercise: '20 segundos manna progressiva', reps: 20, unit: 'segundos' },
    { id: 'l8', exercise: '3 pseudo planche push-ups por brazo', reps: 3, unit: 'reps' },
    { id: 'l9', exercise: '10 segundos tucked planch', reps: 10, unit: 'segundos' },
    { id: 'l10', exercise: '5 iron cross negatives en anillas', reps: 5, unit: 'reps' },
    { id: 'l11', exercise: '30 segundos full planch', reps: 30, unit: 'segundos' },
    { id: 'l12', exercise: '1 one arm pull-up', reps: 1, unit: 'rep' }
  ]
}

export const PUNISHMENTS = [
  // Castigos "serios" (ejercicio)
  { 
    id: 'pun1', 
    text: '50 flexiones fumado 💨', 
    type: 'exercise',
    emoji: '💨',
    difficulty: 'medium'
  },
  { 
    id: 'pun2', 
    text: '30 burpees fumado', 
    type: 'exercise',
    emoji: '🔥',
    difficulty: 'hard'
  },
  { 
    id: 'pun3', 
    text: '100 abdominales fumados', 
    type: 'exercise',
    emoji: '😵',
    difficulty: 'hard'
  },
  { 
    id: 'pun4', 
    text: '1 minuto plank fumado', 
    type: 'time',
    emoji: '⏱️',
    difficulty: 'medium'
  },
  // Castigos "serios" sin fumar
  { 
    id: 'pun5', 
    text: '24 horas sin fumar 🚭', 
    type: 'abstinence',
    emoji: '🚭',
    difficulty: 'extreme'
  },
  { 
    id: 'pun6', 
    text: '48 horas sin fumar', 
    type: 'abstinence',
    emoji: '😤',
    difficulty: 'extreme'
  },
  { 
    id: 'pun7', 
    text: '1 día sin hachís', 
    type: 'abstinence',
    emoji: '🌿',
    difficulty: 'extreme'
  },
  // Castigos troll
  { 
    id: 'pun8', 
    text: 'Hacer 20 flexiones mirando al suelo como Gerard 😏', 
    type: 'troll',
    emoji: '🤡',
    difficulty: 'easy'
  },{ id: 'pun9', text: 'gritar "¡SOY LUIS!" 10 veces en el balcón', type: 'troll', emoji: '📢', difficulty: 'easy' },{ id: 'pun10', text: 'Enviar un audio de 30 segundos a Gerard sobre por que eres el mejor', type: 'troll', emoji: '🎤', difficulty: 'medium' },
  { 
    id: 'pun11', 
    text: 'Hacer 10 flexiones imitanto a tu yo de 16 años', 
    type: 'troll',
    emoji: '👶',
    difficulty: 'easy'
  },
  { 
    id: 'pun12', 
    text: 'Llamar a tu madre y decirle que quieres ser payaso', 
    type: 'troll',
    emoji: '📞',
    difficulty: 'medium'
  },
  // Castigos húmedos
  { 
    id: 'pun13', 
    text: '10 burpees Y después explicar qué es el mango', 
    type: 'troll',
    emoji: '🥭',
    difficulty: 'medium'
  },
  { 
    id: 'pun14', 
    text: '30 segundos de handstand Y luego hablar español neutral 10 segundos', 
    type: 'troll',
    emoji: '🤡',
    difficulty: 'hard'
  },{ id: 'pun15', text: '50 burpees mientras cuentas del 1 al 20 en japones', type: 'troll', emoji: '🇯🇵', difficulty: 'hard' }
]

export const PLAYERS = {
  luis: {
    name: 'Luis',
    emoji: '😎',
    color: '#e94560'
  },
  gerard: {
    name: 'Gerard',
    emoji: '🤙',
    color: '#0f3460'
  }
}