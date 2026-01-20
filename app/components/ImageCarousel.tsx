// Componente de carrusel de imágenes para detalle de moneda
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  imagenes: Array<{ url: string }>;
  nombre: string;
}

export default function ImageCarousel({ imagenes, nombre }: ImageCarouselProps) {
  const [imagenActual, setImagenActual] = useState(0);

  const siguiente = () => {
    setImagenActual((prev) => (prev + 1) % imagenes.length);
  };

  const anterior = () => {
    setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  if (!imagenes || imagenes.length === 0) {
    return (
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <svg className="w-24 h-24 text-gray-400 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Sin imágenes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Contenedor principal con sombra y degradado */}
      <div className="relative group">
        {/* Fondo decorativo con degradado */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/10 rounded-3xl blur-xl"></div>
        
        {/* Contenedor de imagen con borde elegante */}
        <div className="relative aspect-square bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-visible shadow-2xl border-2 border-gray-200 dark:border-amber-500/30">
          {/* Imagen principal */}
          <div className="absolute inset-0 p-8 md:p-12 rounded-3xl overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={imagenes[imagenActual].url}
                alt={`${nombre} - Vista ${imagenActual + 1}`}
                fill
                className="object-contain transition-all duration-700 hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          
          {/* Badge con número de imagen - estilo premium */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm border border-amber-400/50 z-20">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
              </svg>
              {imagenActual + 1} / {imagenes.length}
            </span>
          </div>

          {/* Marca de agua decorativa - Logo */}
          <div className="absolute bottom-4 left-4 z-20">
            <img
              src="/logo-jmnvmmis.png"
              alt="JM NVMMIS"
              className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-lg dark:invert"
            />
          </div>

          {/* Botones de navegación - Más pequeños */}
          {imagenes.length > 1 && (
            <>
              {/* Botón anterior */}
              <button
                onClick={anterior}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white p-1 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110 border border-white/30 z-20"
                aria-label="Imagen anterior"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Botón siguiente */}
              <button
                onClick={siguiente}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white p-1 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110 border border-white/30 z-20"
                aria-label="Imagen siguiente"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Miniaturas - mejoradas con animaciones */}
      {imagenes.length > 1 && (
        <div className="space-y-3">
          {/* Separador decorativo */}
          <div className="flex items-center gap-3">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent flex-1"></div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Vistas disponibles</p>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent flex-1"></div>
          </div>
          
          {/* Grid de miniaturas */}
          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {imagenes.map((imagen, index) => (
              <button
                key={index}
                onClick={() => setImagenActual(index)}
                className={`aspect-square relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${
                  index === imagenActual
                    ? 'ring-3 md:ring-4 ring-amber-500 scale-105 shadow-xl shadow-amber-500/50'
                    : 'ring-1 md:ring-2 ring-gray-300 dark:ring-gray-700 hover:ring-amber-400 dark:hover:ring-amber-500 hover:scale-105 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="absolute inset-0 p-1 md:p-2">
                  <div className="relative w-full h-full">
                    <Image
                      src={imagen.url}
                      alt={`${nombre} - Miniatura ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="120px"
                    />
                  </div>
                </div>
                
                {/* Indicador de selección */}
                {index === imagenActual && (
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent"></div>
                )}
                
                {/* Número de miniatura */}
                <div className={`absolute bottom-0.5 right-0.5 md:bottom-1 md:right-1 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-bold ${
                  index === imagenActual 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                  {index + 1}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
