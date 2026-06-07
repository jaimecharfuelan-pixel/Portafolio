# 🚀 Portafolio — Jaime Charfuelan

Portfolio personal de **Jaime Andrés Charfuelan Sarria**, Backend Developer.

---

## 📁 Estructura de archivos

```
portfolio/
├── index.html                  ← Página principal (todo el portafolio)
├── CV_Jaime_Charfuelan.pdf     ← Tu CV en PDF (para descarga desde la web)
├── README.md                   ← Este archivo
│
├── assets/
│   ├── css/
│   │   └── style.css           ← Estilos completos + animaciones
│   │
│   ├── js/
│   │   └── main.js             ← Lógica, partículas, cursor, efectos
│   │
│   └── videos/                 ← ⚠️ AQUÍ debes poner los videos demo
│       ├── piedra-azul-demo.mp4    ← Demo del Proyecto Piedra Azul
│       ├── bancario-demo.mp4       ← Demo del Sistema Bancario
│       └── cinegold-demo.mp4       ← Demo de CineGold
```

---

## 🎥 Videos de proyectos

Los videos se muestran en la sección de proyectos con expansión al hacer scroll.

### Cómo agregar tus videos:

1. Graba o exporta una demo de tu proyecto (recomendado: **1920×1080, H.264, < 20 MB**)
2. Nómbralos exactamente así y colócalos en `assets/videos/`:

| Archivo                        | Proyecto                       |
|-------------------------------|-------------------------------|
| `piedra-azul-demo.mp4`        | Sistema de Gestión Médica      |
| `bancario-demo.mp4`           | Sistema Bancario Oracle        |
| `cinegold-demo.mp4`           | Motor de Recomendación CineGold|

3. Si el video no existe, se muestra automáticamente un **diagrama de arquitectura animado** como placeholder visual.

### Tips para grabar:
- Usa **OBS Studio** (gratuito) para grabar la pantalla
- Resolución: 1280×720 o superior
- Duración: 20–60 segundos en loop es ideal
- Exporta sin audio (ya están en `muted`)

---

## 📄 CV descargable

El botón **"Descargar CV"** (en hero y en contacto) descarga automáticamente el archivo:

```
portfolio/CV_Jaime_Charfuelan.pdf
```

Si actualizas tu CV, simplemente reemplaza ese archivo con el mismo nombre.

---

## 🌐 Cómo publicar (despliegue)

### Opción 1 — GitHub Pages (gratis)
1. Sube la carpeta `portfolio/` a un repositorio de GitHub
2. Ve a **Settings → Pages → Source → main branch / root**
3. Tu portafolio estará en `https://tu-usuario.github.io/portfolio/`

### Opción 2 — Netlify (gratis, drag & drop)
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `portfolio/` al dashboard
3. Obtienes una URL instantánea como `jaime-charfuelan.netlify.app`

### Opción 3 — Vercel (gratis)
```bash
npm i -g vercel
cd portfolio
vercel
```

---

## 🎨 Diseño y animaciones incluidas

| Feature                    | Descripción                                          |
|---------------------------|------------------------------------------------------|
| **Cursor personalizado**   | Cursor circular con ring que sigue el mouse          |
| **Canvas de partículas**   | Fondo animado con nodos y conexiones                 |
| **Dock de navegación**     | Nav flotante tipo macOS con tooltips                 |
| **Animación de nombre**    | Letras con stagger reveal + hover bounce por letra   |
| **Typewriter**             | El stack tecnológico se escribe solo                 |
| **Scroll reveal**          | Elementos aparecen con fade+slide al entrar al viewport|
| **Project tilt**           | Cards de proyectos con efecto 3D parallax           |
| **Media expansion**        | Las secciones de video se expanden al hacer scroll   |
| **Particle burst**         | Explosion de partículas al hacer click en "Descargar CV"|
| **Counter animation**      | Estadísticas se animan numéricamente                |
| **Contact micro-particles**| Mini partículas al hover sobre cards de contacto    |
| **Glow radial**            | Luz ambiental púrpura en hero                       |
| **Mouse repel**            | Las partículas huyen del mouse                      |

---

## 🛠️ Tecnologías utilizadas

- **HTML5** semántico
- **CSS3** — Variables, animaciones, grid, backdrop-filter
- **JavaScript vanilla** — Sin frameworks, puro ES6+
- **Google Fonts**: Syne (display) + Space Mono (mono) + Outfit (body)

---

## 🎨 Paleta de colores

| Variable      | Color      | Uso                      |
|--------------|-----------|--------------------------|
| `--violet2`  | `#7c3aed` | Acento principal         |
| `--violet4`  | `#a78bfa` | Textos destacados        |
| `--teal2`    | `#14b8a6` | Tags secundarios         |
| `--amber2`   | `#f59e0b` | CineGold / detalles      |
| `--bg`       | `#040407` | Fondo principal          |
| `--gray1`    | `#f1f5f9` | Texto principal          |

---

## 📬 Contacto

**Jaime Andrés Charfuelan Sarria**  
📧 jaimecharfuelan@unicauca.edu.co  
📱 +57 320 675 4605  
🔗 [LinkedIn](https://linkedin.com/in/jaime-andres-charfuelan-sarria-60277640a/)  
💻 [GitHub](https://github.com/jaimecharfuelan-pixel)

---

*Portafolio diseñado con ✨ por Claude · 2025*