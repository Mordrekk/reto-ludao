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
  },
  dios: {
    name: 'DIOS',
    emoji: '🌀',
    color: '#ff00ff',
    description: '¿Brujo? No, esto es real ( ͡° ͜ʖ ͡°)'
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
    { id: 'p10', exercise: '20 skipping alto', reps: 20, unit: 'reps' },
    { id: 'p11', exercise: '15 zancadas caminando', reps: 15, unit: 'reps' },
    { id: 'p12', exercise: '30 segundos tabla lateral', reps: 30, unit: 'segundos' },
    { id: 'p13', exercise: '25 curl de bíceps con mochila', reps: 25, unit: 'reps' },
    { id: 'p14', exercise: '20 sumergencias en banco', reps: 20, unit: 'reps' },
    { id: 'p15', exercise: '10 flexiones explosivas', reps: 10, unit: 'reps' },
    { id: 'p16', exercise: '30 segundos sentadilla isométrica', reps: 30, unit: 'segundos' },
    { id: 'p17', exercise: '15 jumping jacks', reps: 15, unit: 'reps' },
    { id: 'p18', exercise: '20 segundos Superman hold', reps: 20, unit: 'segundos' }
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
    { id: 'm12', exercise: '20 zancadas con salto', reps: 20, unit: 'reps' },
    { id: 'm13', exercise: '15 pull-ups strict', reps: 15, unit: 'reps' },
    { id: 'm14', exercise: '30 segundos ghost hold plank', reps: 30, unit: 'segundos' },
    { id: 'm15', exercise: '20 flexiones declining', reps: 20, unit: 'reps' },
    { id: 'm16', exercise: '25 segundos handstand hold', reps: 25, unit: 'segundos' },
    { id: 'm17', exercise: '15 muscle-ups negativos', reps: 15, unit: 'reps' },
    { id: 'm18', exercise: '20 segundos flexión isométrica', reps: 20, unit: 'segundos' }
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
    { id: 'a12', exercise: '15 pseudo planche push-ups', reps: 15, unit: 'reps' },
    { id: 'a13', exercise: '12 flexiones en pino strict', reps: 12, unit: 'reps' },
    { id: 'a14', exercise: '20 segundos straddle planch', reps: 20, unit: 'segundos' },
    { id: 'a15', exercise: '10 dragon flag negativos lentos', reps: 10, unit: 'reps' },
    { id: 'a16', exercise: '15 segundos one arm dead hang', reps: 15, unit: 'segundos' },
    { id: 'a17', exercise: '25 pull-ups con 5kg extra', reps: 25, unit: 'reps' },
    { id: 'a18', exercise: '30 segundos handstand walking', reps: 30, unit: 'segundos' }
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
    { id: 'e12', exercise: '25 segundos handstand plank', reps: 25, unit: 'segundos' },
    { id: 'e13', exercise: '5 handstand push-ups strict', reps: 5, unit: 'reps' },
    { id: 'e14', exercise: '15 segundos full front lever', reps: 15, unit: 'segundos' },
    { id: 'e15', exercise: '3 muscle-ups explosivos', reps: 3, unit: 'reps' },
    { id: 'e16', exercise: '12 segundos one arm handstand', reps: 12, unit: 'segundos' },
    { id: 'e17', exercise: '20 segundos tucked iron cross', reps: 20, unit: 'segundos' },
    { id: 'e18', exercise: '5 dragon flags completos', reps: 5, unit: 'reps' }
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
    { id: 'l12', exercise: '1 one arm pull-up', reps: 1, unit: 'rep' },
    { id: 'l13', exercise: '8 handstand push-ups en pareja', reps: 8, unit: 'reps' },
    { id: 'l14', exercise: '20 segundos one arm front lever', reps: 20, unit: 'segundos' },
    { id: 'l15', exercise: '2 muscle-ups con 20kg extra', reps: 2, unit: 'reps' },
    { id: 'l16', exercise: '12 segundos straddle front lever', reps: 12, unit: 'segundos' },
    { id: 'l17', exercise: '5 back lever full con pausa', reps: 5, unit: 'reps' },
    { id: 'l18', exercise: '1 planche push-up completo', reps: 1, unit: 'rep' }
  ],
  dios: [
    { id: 'd1', exercise: '1 one arm handstand push-up', reps: 1, unit: 'rep' },
    { id: 'd2', exercise: '5 front lever pull-ups', reps: 5, unit: 'reps' },
    { id: 'd3', exercise: '10 segundos iron cross completo', reps: 10, unit: 'segundos' },
    { id: 'd4', exercise: '3 one arm muscle-ups', reps: 3, unit: 'reps' },
    { id: 'd5', exercise: '15 segundos manna perfecto', reps: 15, unit: 'segundos' },
    { id: 'd6', exercise: '2 dragon flag strict por brazo', reps: 2, unit: 'reps' },
    { id: 'd7', exercise: '1 handstand push-up con 15kg extra', reps: 1, unit: 'rep' },
    { id: 'd8', exercise: '8 segundos one arm front lever', reps: 8, unit: 'segundos' },
    { id: 'd9', exercise: '5 pseudo planche push-ups strict', reps: 5, unit: 'reps' },
    { id: 'd10', exercise: '12 segundos full planche hold', reps: 12, unit: 'segundos' },
    { id: 'd11', exercise: '3 back lever con 10kg extra', reps: 3, unit: 'reps' },
    { id: 'd12', exercise: '20 segundos handstand con una mano', reps: 20, unit: 'segundos' },
    { id: 'd13', exercise: '1 pullover en anillas desde front lever', reps: 1, unit: 'rep' },
    { id: 'd14', exercise: '6 segundos cherry picker', reps: 6, unit: 'segundos' },
    { id: 'd15', exercise: '4 muscle-ups explosivos con clap', reps: 4, unit: 'reps' },
    { id: 'd16', exercise: '10 segundos straddle back lever', reps: 10, unit: 'segundos' },
    { id: 'd17', exercise: '1 one arm pull-up con 25kg', reps: 1, unit: 'rep' },
    { id: 'd18', exercise: '3 tucked planch a full planch', reps: 3, unit: 'reps' }
  ]
}

export const PUNISHMENTS = [
  // Castigos deportivos - ejercicios físicos
  { 
    id: 'pun1', 
    text: '50 flexiones', 
    type: 'exercise',
    emoji: '💪',
    difficulty: 'medium'
  },
  { 
    id: 'pun2', 
    text: '30 burpees explosivos', 
    type: 'exercise',
    emoji: '🔥',
    difficulty: 'hard'
  },
  { 
    id: 'pun3', 
    text: '100 abdominales', 
    type: 'exercise',
    emoji: '😵',
    difficulty: 'hard'
  },
  { 
    id: 'pun4', 
    text: '1 minuto plank', 
    type: 'time',
    emoji: '⏱️',
    difficulty: 'medium'
  },
  { 
    id: 'pun5', 
    text: '40 sentadillas', 
    type: 'exercise',
    emoji: '🦵',
    difficulty: 'medium'
  },
  { 
    id: 'pun6', 
    text: '20 dominadas', 
    type: 'exercise',
    emoji: '🏋️',
    difficulty: 'hard'
  },
  { 
    id: 'pun7', 
    text: '50 segundos wall sit', 
    type: 'time',
    emoji: '🧱',
    difficulty: 'medium'
  },
  { 
    id: 'pun8', 
    text: '30 fondos en banco', 
    type: 'exercise',
    emoji: '📈',
    difficulty: 'medium'
  },
  { 
    id: 'pun9', 
    text: '25 flexiones diamante', 
    type: 'exercise',
    emoji: '💎',
    difficulty: 'hard'
  },
  { 
    id: 'pun10', 
    text: '40 segundos handstand contra pared', 
    type: 'time',
    emoji: '🤸',
    difficulty: 'hard'
  },
  { 
    id: 'pun11', 
    text: '20 muscle-ups negativos', 
    type: 'exercise',
    emoji: '⬆️',
    difficulty: 'hard'
  },
  { 
    id: 'pun12', 
    text: '30 segundos L-sit en suelo', 
    type: 'time',
    emoji: '🪑',
    difficulty: 'hard'
  },
  { 
    id: 'pun13', 
    text: '60 segundos saltar a la comba', 
    type: 'time',
    emoji: '🪢',
    difficulty: 'medium'
  },
  { 
    id: 'pun14', 
    text: '15 flexiones explosivas con clap', 
    type: 'exercise',
    emoji: '👏',
    difficulty: 'hard'
  },
  { 
    id: 'pun15', 
    text: '50 segundos sentadilla isométrica', 
    type: 'time',
    emoji: '🦿',
    difficulty: 'hard'
  },
  { 
    id: 'pun16', 
    text: '20 zancadas caminando por pierna', 
    type: 'exercise',
    emoji: '🚶',
    difficulty: 'medium'
  },
  { 
    id: 'pun17', 
    text: '30 segundos tabla lateral por lado', 
    type: 'time',
    emoji: '📏',
    difficulty: 'medium'
  },
  { 
    id: 'pun18', 
    text: '25 elevaciones de talón', 
    type: 'exercise',
    emoji: '🦶',
    difficulty: 'easy'
  },
  { 
    id: 'pun19', 
    text: '40 segundos plank con toque de hombro', 
    type: 'time',
    emoji: '👋',
    difficulty: 'medium'
  },
  { 
    id: 'pun20', 
    text: '15 pike push-ups', 
    type: 'exercise',
    emoji: '🔺',
    difficulty: 'hard'
  }
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