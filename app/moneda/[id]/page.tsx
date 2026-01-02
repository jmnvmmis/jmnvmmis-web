// Página de detalle de moneda con diseño mejorado y carrusel
'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { obtenerMonedaPorId } from '@/lib/firestore';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from '@/app/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import ImageCarousel from '@/app/components/ImageCarousel';

export default function DetalleMoneda() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params.id as string;
  const [moneda, setMoneda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    setMounted(true);
    cargarMoneda();
    
    const updateBgColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setBgColor(isDark ? '#111827' : '#ffffff');
    };
    
    updateBgColor();
    
    const observer = new MutationObserver(updateBgColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, [id]);

  const cargarMoneda = async () => {
    setLoading(true);
    const datos = await obtenerMonedaPorId(id);
    setMoneda(datos);
    setLoading(false);
  };

  if (!mounted || loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center transition-colors" 
        style={{ backgroundColor: bgColor }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!moneda || !moneda.activa) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center transition-colors" 
        style={{ backgroundColor: bgColor }}
      >
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">Coin not found</p>
          <Link href="/" className="text-amber-600 hover:text-amber-700">
            Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen transition-colors" 
      style={{ backgroundColor: bgColor }}
    >
      {/* Header unificado */}
      <header className="bg-gradient-to-b from-black to-gray-900 shadow-lg transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/">
            <div className="cursor-pointer text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold font-display text-white tracking-wider">
                JM NVMMIS
              </h1>
              <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                <div className="h-px bg-amber-500 w-12"></div>
                <p className="text-sm text-amber-400 tracking-[0.2em] uppercase font-light">
                  {t('header.subtitle')}
                </p>
                <div className="h-px bg-amber-500 w-12"></div>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />
            <Link
              href="/contacto"
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {t('header.contact')}
            </Link>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-500 font-semibold transition-colors group">
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('coinDetail.backToCatalog')}
        </Link>
      </div>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería con carrusel - contenedor mejorado */}
          <div className="relative">
            {/* Efecto de resplandor de fondo */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 rounded-3xl blur-3xl"></div>
            
            {/* Contenedor principal */}
            <div className="relative bg-transparent p-4 lg:p-6 rounded-3xl">
              <ImageCarousel 
                imagenes={moneda.imagenes || []} 
                nombre={moneda.nombre}
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-8">
            {/* Título y precio */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4">
                {moneda.nombre}
              </h2>
              
              {moneda.pais && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                  <span className="text-lg font-medium">{moneda.pais}</span>
                </div>
              )}

              <div className="flex items-baseline gap-3 mb-6">
                <p className="text-6xl font-bold text-amber-600">
                  ${moneda.precio?.toLocaleString('es-AR')}
                </p>
                <span className="text-2xl text-gray-500 font-light">ARS</span>
              </div>

              {/* Stock */}
              {moneda.stock !== undefined && (
                <div className="mb-6">
                  {moneda.stock === 0 ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <p className="font-bold text-red-800">{t('coinDetail.stock.outOfStock')}</p>
                          <p className="text-sm text-red-600">{t('coinDetail.stock.contactForAvailability')}</p>
                        </div>
                      </div>
                    </div>
                  ) : moneda.stock < 5 ? (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <p className="font-bold text-yellow-800">{t('coinDetail.stock.lastUnits')}</p>
                          <p className="text-sm text-yellow-600">
                            {t('coinDetail.stock.only')} {moneda.stock} {moneda.stock === 1 ? t('coinDetail.stock.unit') : t('coinDetail.stock.units')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-bold text-green-800">{t('coinDetail.stock.available')}</p>
                          <p className="text-sm text-green-600">{moneda.stock} {t('coinDetail.stock.units')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Descripción */}
            {moneda.descripcion && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('coinDetail.description')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {moneda.descripcion}
                </p>
              </div>
            )}

            {/* Información de contacto */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px bg-amber-500 flex-1"></div>
                <h3 className="text-2xl font-bold font-display text-white">{t('coinDetail.contactInfo')}</h3>
                <div className="h-px bg-amber-500 flex-1"></div>
              </div>

              <p className="text-gray-300 mb-6 text-center">
                {t('coinDetail.contactMessage')}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl">
                  <div className="bg-amber-500/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-amber-400 uppercase tracking-wider font-semibold mb-1">{t('coinDetail.email')}</p>
                    <a href="mailto:jmnvmmis@gmail.com" className="text-white hover:text-amber-400 transition text-lg font-medium">
                      jmnvmmis@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl">
                  <div className="bg-amber-500/20 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-amber-400 uppercase tracking-wider font-semibold mb-1">{t('coinDetail.location')}</p>
                    <p className="text-white text-lg font-medium">{t('coinDetail.locationText')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón ver más monedas */}
            <Link
              href="/"
              className="block w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white text-center py-4 rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              {t('coinDetail.viewMore')}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer unificado */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-amber-500/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold font-display text-xl text-white mb-4">JM NVMMIS</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('footer.about')}
              </p>
            </div>

            <div>
              <h3 className="font-bold font-display text-xl text-white mb-4">{t('footer.links')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-amber-400 transition">
                    {t('header.catalog')}
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-gray-400 hover:text-amber-400 transition">
                    {t('header.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold font-display text-xl text-white mb-4">{t('footer.contactTitle')}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="mailto:jmnvmmis@gmail.com" className="hover:text-amber-400 transition">
                    jmnvmmis@gmail.com
                  </a>
                </li>
                <li>Buenos Aires, Argentina</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-500/30 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
