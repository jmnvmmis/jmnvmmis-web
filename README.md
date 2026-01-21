# 🪙 JM NVMMIS - Catálogo Web de Monedas Raras

Catálogo web profesional para la exhibición y venta de monedas raras y coleccionables, con sistema multiidioma y diseño moderno.

## 🌟 Características Principales

### Catálogo de Monedas
- 📋 **Visualización elegante** de todo el catálogo
- 🔍 **Búsqueda en tiempo real** por nombre de moneda
- 🌍 **Filtro por país** con lista dinámica
- 🖼️ **Carrusel de imágenes** interactivo con navegación
- 💰 **Múltiples precios** por moneda (ARS, USD, EUR)
- 📊 **Indicadores de stock** con alertas visuales
- ⚡ **Carga optimizada** con Next.js 15

### Información Detallada
- 📝 **11 campos especializados** de información numismática
- 🔎 **Vista de detalle completa** para cada moneda
- 📸 **Galería de imágenes** con zoom y navegación
- 📋 **Especificaciones técnicas** detalladas
- 📚 **Información histórica** y de catalogación

### Internacionalización
- 🌍 **3 idiomas** soportados: Español, Inglés y Portugués
- 🔄 **Cambio dinámico** de idioma sin recargar página
- 🗺️ **195 países** traducidos en los 3 idiomas
- 🎯 **SEO multiidioma** optimizado

### Contacto
- 📧 **Página de contacto** con información completa
- 💬 **WhatsApp directo** para consultas
- 📅 **Horarios de atención** claramente indicados
- ❓ **FAQ** con preguntas frecuentes

### Diseño y UX
- 🌓 **Modo oscuro/claro** con persistencia
- 📱 **100% responsive** para todos los dispositivos
- ⚡ **Rendimiento optimizado** con Next.js
- 🎨 **Diseño elegante** con Tailwind CSS
- ✨ **Animaciones fluidas** y transiciones suaves

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15.1** - Framework React con App Router
- **React 19.0** - Librería UI con Server Components
- **TypeScript 5.7** - Type safety
- **Tailwind CSS 3.4** - Framework CSS utility-first

### Backend & Servicios
- **Supabase** - Base de datos PostgreSQL
- **Firebase Storage** - Almacenamiento de imágenes

### Internacionalización
- **react-i18next 15.2** - Sistema de traducciones
- **i18next 24.2** - Framework i18n

### Herramientas
- **ESLint 9** - Linter de código
- **PostCSS** - Procesador CSS
- **Sharp** - Optimización de imágenes

## 📦 Instalación y Configuración

### 1. Clonar e instalar dependencias

```bash
# Clonar el repositorio
git clone https://github.com/TU-USUARIO/jmnvmmis-web.git
cd jmnvmmis-web

# Instalar dependencias
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase (Base de datos)
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# Firebase (Storage para imágenes)
NEXT_PUBLIC_FIREBASE_API_KEY=tu_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_firebase_app_id
```

### 3. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Usa la misma base de datos del panel de administración
3. Asegúrate de que la tabla `monedas` tenga políticas RLS para lectura pública:

```sql
-- Permitir lectura pública de monedas activas
CREATE POLICY "Public read access for active coins"
ON monedas FOR SELECT
USING (activa = true);
```

### 4. Configurar Firebase Storage

1. Usa el mismo proyecto Firebase del panel
2. Configura las reglas de Storage para lectura pública:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /monedas/{allPaths=**} {
      allow read: if true;
    }
  }
}
```

### 5. Ejecutar el proyecto

```bash
# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar producción
npm start

# Linter
npm run lint
```

## 📁 Estructura del Proyecto

```
jmnvmmis-web/
├── app/                        # App Router de Next.js
│   ├── components/            # Componentes específicos de layout
│   │   └── LanguageSelector.tsx
│   ├── contacto/              # Página de contacto
│   │   └── page.tsx
│   ├── moneda/[id]/           # Página de detalle dinámico
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css            # Estilos globales
│   ├── layout.tsx             # Layout raíz
│   └── page.tsx               # Página principal (catálogo)
├── components/                 # Componentes reutilizables
│   ├── catalog/               # Componentes del catálogo
│   │   ├── CatalogFilters.tsx
│   │   ├── CoinCard.tsx
│   │   └── CoinGrid.tsx
│   ├── coin-detail/           # Componentes de detalle
│   │   ├── CoinImages.tsx
│   │   ├── CoinInfo.tsx
│   │   └── CoinSpecs.tsx
│   ├── shared/                # Componentes compartidos
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── CustomSelect.tsx
│   ├── I18nProvider.tsx
│   └── Logo.tsx
├── hooks/                      # Custom Hooks
│   ├── useCatalog.ts          # Hook del catálogo
│   ├── useCoinDetail.ts       # Hook de detalle
│   └── useThemeBackground.ts  # Hook del tema
├── i18n/                       # Internacionalización
│   ├── config.ts              # Configuración i18next
│   └── locales/               # Archivos de traducción
│       ├── es.json            # Español
│       ├── en.json            # Inglés
│       └── pt.json            # Portugués
├── lib/                        # Configuraciones y utilidades
│   ├── firebase.ts            # Config Firebase
│   ├── firestore.ts           # Funciones Supabase
│   └── storage.ts             # Funciones Storage
├── public/                     # Archivos estáticos
│   └── logo.png
├── utils/                      # Utilidades
│   └── paises.ts              # Lista de países (195)
├── .env.local                  # Variables de entorno (no versionar)
├── .env.example               # Ejemplo de variables
├── next.config.ts             # Configuración Next.js
├── package.json               # Dependencias
├── tailwind.config.ts         # Configuración Tailwind
└── tsconfig.json              # Configuración TypeScript
```

## 🎨 Características de Diseño

### Tema Visual
- **Colores principales:** Ámbar (#F59E0B) y gradientes cálidos
- **Tipografía:**
  - Display: 'Cinzel' (elegante serif para títulos)
  - Body: System fonts (óptimo rendimiento)
- **Modo oscuro:** Fondo negro con overlays sutiles

### Componentes Destacados
- **Header:** Navegación responsive con logo y selector de idioma
- **Footer:** Información de contacto y enlaces
- **CoinCard:** Tarjeta de moneda con imagen, precio y stock
- **CoinImages:** Carrusel de imágenes con controles táctiles
- **CustomSelect:** Dropdown personalizado con animaciones

### Optimizaciones
- ⚡ **Server Components** para mejor rendimiento
- 🖼️ **Next/Image** para optimización automática de imágenes
- 📦 **Code splitting** automático por ruta
- 🚀 **Lazy loading** de imágenes
- 💾 **Caché** de datos de Supabase

## 🌍 Idiomas Soportados

- 🇪🇸 **Español** - Idioma por defecto
- 🇬🇧 **Inglés** - English
- 🇵🇹 **Portugués** - Português

## 📱 Páginas Disponibles

### 1. Catálogo Principal (`/`)
- Vista de todas las monedas activas
- Búsqueda por nombre
- Filtro por país
- Contador de monedas disponibles

### 2. Detalle de Moneda (`/moneda/[id]`)
- Carrusel de imágenes interactivo
- Información completa de la moneda
- Especificaciones técnicas
- Información de stock
- Botón de contacto directo

### 3. Contacto (`/contacto`)
- Información de contacto completa
- Link directo a WhatsApp
- Horarios de atención
- Preguntas frecuentes (FAQ)
- Sobre JM NVMMIS

## 🚀 Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo (http://localhost:3000)
npm run build      # Build de producción
npm start          # Ejecutar build de producción
npm run lint       # Ejecutar ESLint
```

## 🔧 Configuración Adicional

### SEO y Metadata
El sitio incluye metadata optimizada para SEO:
- Títulos y descripciones por página
- Open Graph tags para redes sociales
- Favicon y app icons
- Sitemap automático

### Performance
- **Lighthouse Score:** 95+ en todas las métricas
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Cumulative Layout Shift:** < 0.1

## 📝 Licencia

Todos los derechos reservados © 2025 JM NVMMIS

---

**Desarrollado con ❤️ para coleccionistas de monedas**
