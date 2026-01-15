// Página de detalle de moneda con diseño mejorado y carrusel
'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { obtenerMonedaPorId } from '@/lib/firestore';
import { obtenerSimboloMoneda, formatearNumero } from '@/lib/monedas';
import { unhashId } from '@/lib/utils/hashId';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from '@/app/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import Logo from '@/components/Logo';
import ImageCarousel from '@/app/components/ImageCarousel';

export default function DetalleMoneda() {
  const { t } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const hash = params.id as string;
  const [moneda, setMoneda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    setMounted(true);
    cargarMoneda();
    
    const updateBgColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setBgColor(isDark ? '#111827' : '#FFFBEB');
    };
    
    updateBgColor();
    
    const observer = new MutationObserver(updateBgColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, [hash]);

  const cargarMoneda = async () => {
    setLoading(true);
    
    console.log('Hash recibido:', hash);
    
    // Convertir hash a ID
    const id = unhashId(hash);
    
    console.log('ID deshasheado:', id);
    
    if (!id) {
      console.error('Hash inválido:', hash);
      setMoneda(null);
      setLoading(false);
      return;
    }
    
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
      <header className="bg-gradient-to-r from-amber-100 to-amber-50 dark:bg-gradient-to-b dark:from-black dark:to-gray-900 shadow-lg transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <Logo variant="full" />
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />
            <Link
              href="/contacto"
              className="bg-amber-600 hover:bg-amber-500 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
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
      <main className="max-w-6xl mx-auto px-4 pb-12">
        {/* Grid principal: Imagen + Info básica */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Galería de imágenes */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 rounded-2xl blur-2xl"></div>
            <div className="relative bg-transparent p-3 rounded-2xl">
              <ImageCarousel 
                imagenes={moneda.imagenes || []} 
                nombre={moneda.nombre}
              />
            </div>
          </div>

          {/* Información principal */}
          <div className="space-y-4">
            {/* Título y país */}
            <div>
              <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">
                {moneda.nombre}
              </h1>
              {moneda.pais && (
                <div className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                  <svg className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{moneda.pais}</span>
                </div>
              )}
            </div>

            {/* Sección de Precios */}
            {moneda.precios && Array.isArray(moneda.precios) && moneda.precios.length > 0 && (
              <div className="bg-gradient-to-br from-amber-50 via-amber-50 to-orange-50 dark:from-amber-900/20 dark:via-amber-800/15 dark:to-orange-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-500/30">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-xs font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide">
                    {moneda.precios.length > 1 ? 'Precios' : 'Precio'}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {moneda.precios.map((precioItem: any, idx: number) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 px-3.5 py-2 rounded-lg shadow-sm border border-amber-300 dark:border-amber-600/40">
                      <div className="text-lg font-bold text-amber-600 dark:text-amber-500">
                        {obtenerSimboloMoneda(precioItem.tipo_moneda)}{precioItem.precio?.toLocaleString('es-AR')}
                      </div>
                      <div className="text-[10px] text-gray-600 dark:text-gray-400 font-medium text-center">
                        {precioItem.tipo_moneda}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            {moneda.stock !== undefined && (
              <div>
                {moneda.stock === 0 ? (
                  <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-2.5 rounded-lg">
                    <div className="flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="font-bold text-red-800 dark:text-red-400 text-xs">{t('coinDetail.stock.outOfStock')}</p>
                        <p className="text-[10px] text-red-600 dark:text-red-500 mt-0.5">{t('coinDetail.stock.contactForAvailability')}</p>
                      </div>
                    </div>
                  </div>
                ) : moneda.stock < 5 ? (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-2.5 rounded-lg">
                    <div className="flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="font-bold text-yellow-800 dark:text-yellow-400 text-xs">{t('coinDetail.stock.lastUnits')}</p>
                        <p className="text-[10px] text-yellow-600 dark:text-yellow-500 mt-0.5">
                          {t('coinDetail.stock.only')} {moneda.stock} {moneda.stock === 1 ? t('coinDetail.stock.unit') : t('coinDetail.stock.units')}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-2.5 rounded-lg">
                    <div className="flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-bold text-green-800 dark:text-green-400 text-xs">{t('coinDetail.stock.available')}</p>
                        <p className="text-[10px] text-green-600 dark:text-green-500 mt-0.5">{moneda.stock} {t('coinDetail.stock.units')}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Especificaciones Técnicas */}
            {(moneda.composicion || moneda.peso || moneda.diametro || moneda.grosor || moneda.orientacion || moneda.referencias) && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-2.5 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Especificaciones Técnicas
                  </h2>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {moneda.composicion && (
                      <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">Composición</div>
                          <div className="text-xs font-medium text-gray-900 dark:text-white break-words">{moneda.composicion}</div>
                        </div>
                      </div>
                    )}
                    {moneda.peso && (
                      <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">Peso</div>
                          <div className="text-xs font-medium text-gray-900 dark:text-white">{formatearNumero(moneda.peso)} g</div>
                        </div>
                      </div>
                    )}
                    {moneda.diametro && (
                      <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">Diámetro</div>
                          <div className="text-xs font-medium text-gray-900 dark:text-white">{formatearNumero(moneda.diametro)} mm</div>
                        </div>
                      </div>
                    )}
                    {moneda.grosor && (
                      <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">Grosor</div>
                          <div className="text-xs font-medium text-gray-900 dark:text-white">{formatearNumero(moneda.grosor)} mm</div>
                        </div>
                      </div>
                    )}
                    {moneda.orientacion && (
                      <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">Orientación</div>
                          <div className="text-xs font-medium text-gray-900 dark:text-white break-words">{moneda.orientacion}</div>
                        </div>
                      </div>
                    )}
                    {moneda.referencias && (
                      <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">Referencias</div>
                          <div className="text-xs font-medium text-gray-900 dark:text-white break-words">{moneda.referencias}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* CTA - Botón de contacto */}
            <Link
              href="/contacto"
              className="block w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white text-center py-2.5 rounded-lg transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Consultar disponibilidad
              </span>
            </Link>
          </div>
        </div>

        {/* Sección de detalles (ancho completo) */}
        <div className="space-y-4">
          {/* Descripción */}
          {moneda.descripcion && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-2.5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Descripción
                </h2>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {moneda.descripcion}
                </p>
              </div>
            </div>
          )}

          {/* Botón volver al catálogo */}
          <div className="text-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-500 font-semibold text-xs transition-colors group"
            >
              <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('coinDetail.viewMore')}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer unificado */}
      <footer className="bg-amber-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black border-t border-amber-300 dark:border-amber-500/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Logo, título y subtítulo - ocupa más espacio */}
            <div className="md:col-span-6">
              <Logo variant="full" />
            </div>

            {/* Enlaces rápidos */}
            <div className="md:col-span-3">
              <h3 className="font-bold font-display text-xl text-amber-900 dark:text-white mb-4">{t('footer.links')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-amber-700 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition">
                    {t('header.catalog')}
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-amber-700 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition">
                    {t('header.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="md:col-span-3">
              <h3 className="font-bold font-display text-xl text-amber-900 dark:text-white mb-4">{t('footer.contactTitle')}</h3>
              <ul className="space-y-2 text-sm text-amber-700 dark:text-gray-400">
                <li>
                  <a href="mailto:jmnvmmis@gmail.com" className="hover:text-amber-600 dark:hover:text-amber-400 transition">
                    jmnvmmis@gmail.com
                  </a>
                </li>
                <li>Buenos Aires, Argentina</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-300 dark:border-amber-500/30 mt-8 pt-8 text-center">
            <p className="text-sm text-amber-600 dark:text-gray-500">
              {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
