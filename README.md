# 💪 Reto Ludao'

> Retos de calistenia por niveles para Luis y Gerard ( ͡° ͜ʖ ͡°)

## 🎯 Características

- **5 niveles de dificultad**: Principiante → Leyenda
- **Sistema de turnos**: Luis y Gerard se alternan
- **Castigos épicos**: Si fallas, te toca ( ͡° ͜ʖ ͡°)
- **Persistencia local**: Tu progreso se guarda automáticamente
- **Sincronización**: Exporta/Importa JSON por WhatsApp para compartir progreso
- **Estilo minimalista deportivo** con jokes trolleurs

## 🚀 Despliegue en Cloudflare Pages

### Método automático (recomendado)

1. Sube este proyecto a un repositorio en GitHub
2. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Select **Pages** → **Create a project**
4. Conecta tu repositorio de GitHub
5. Configure:
   - **Project name**: `reto-ludao`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. ¡Deploy!

### Método manual (desde cero)

```bash
# Clonar el repositorio
git clone <tu-repo>
cd reto-ludao

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build
```

Los archivos estáticos generados en `dist/` se suben directamente a Cloudflare Pages.

## 📱 Sincronizar con Gerard

1. Haz clic en **Exportar** para descargar un archivo JSON
2. Mándalo por WhatsApp a Gerard
3. Gerard hace clic en **Importar progreso** y selecciona el JSON

## 🎮 Cómo usar

1. **Selecciona nivel**: Pulsa uno de los 5 niveles (🌱Principiante hasta 👑Leyenda)
2. **Ve el reto**: Aparecerá un ejercicio con repeticiones
3. **Completa o falla**:
   - ✅ **¡Hecho!**: Si cumples el reto
   - ❌ **No puedo**: Si fallas, te sale un castigo random
4. **Cambia turno**: Pulsa "Pasar turno" para cederle a Gerard

## 📊 Castigos disponibles

Los castigos son para ti y Gerard, e incluyen:
- Ejercicios extra 💨
- 24-48 horas sin fumar 🚭
- Retos trolleurs como "gritar tu nombre desde el balcón" 📢

## 🤡 Notas

- Los datos se guardan en tu navegador (localStorage)
- Esta app es solo para Luis y Gerard, no nos hacemos responsables de los castigos 😂
- ¡Ánimo, no se rindan! ( ͡° ͜ʖ ͡°)

---

**¿Who is the one who does the reps? ( ͡° ͜ʖ ͡°)**