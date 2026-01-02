# 🪙 JM NVMMIS - Catálogo de Monedas Raras

Catálogo web profesional para la venta de monedas raras y coleccionables, construido con Next.js 15, React 19, Firebase y Tailwind CSS.

## ✨ Características

- 🌍 **Sistema multiidioma** (Español, Inglés, Portugués)
- 🌓 **Tema claro/oscuro** con persistencia
- 🖼️ **Carrusel de imágenes** interactivo
- 🔥 **Firebase Firestore** para base de datos en tiempo real
- 📱 **Diseño responsive** para todos los dispositivos
- ⚡ **Next.js 15** con App Router
- 🎨 **Tailwind CSS** para estilos modernos

## 🚀 Tecnologías

- Next.js 15.1.6
- React 19
- TypeScript
- Firebase 11.1.0
- i18next para traducciones
- Tailwind CSS

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU-USUARIO/jmnvmmis-web.git

# Instalar dependencias
cd jmnvmmis-web
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Firebase

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Configuración

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Copia las credenciales a `.env.local`
3. Configura Firestore Database
4. Configura Storage para las imágenes

## 📄 Estructura

```
jmnvmmis-web/
├── app/                  # App Router de Next.js
├── components/           # Componentes reutilizables
├── lib/                  # Configuración y utilidades
├── locales/             # Archivos de traducción
└── public/              # Archivos estáticos
```

## 🌐 Páginas

- **Catálogo Principal** - Lista de todas las monedas disponibles
- **Detalle de Moneda** - Información completa con carrusel de imágenes
- **Contacto** - Formulario de contacto

## 📝 Licencia

Todos los derechos reservados © 2025 JM NVMMIS
