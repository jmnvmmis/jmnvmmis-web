// Página de Contacto con diseño unificado
'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../../components/LanguageSelector';
import Logo from '../../components/Logo';

export default function Contacto() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    setMounted(true);
    
    // Función para actualizar el color de fondo
    const updateBgColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setBgColor(isDark ? '#111827' : '#FFFBEB');
    };
    
    // Actualizar al montar
    updateBgColor();
    
    // Observar cambios en la clase 'dark'
    const observer = new MutationObserver(updateBgColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
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
              href="/"
              className="bg-amber-600 hover:bg-amber-500 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
            >
              {t('header.catalog')}
            </Link>
          </div>
        </div>
        {/* Cenefa griega decorativa */}
        <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      </header>

      {/* Contenido */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Título de la página */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-bold font-display mb-4"
            style={{ color: bgColor === '#ffffff' ? '#1c1917' : '#ffffff' }}
          >
            {t('contact.title')}
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px bg-amber-500 w-16"></div>
            <p 
              className="text-base"
              style={{ color: bgColor === '#ffffff' ? '#52525b' : '#9ca3af' }}
            >
              {t('contact.subtitle')}
            </p>
            <div className="h-px bg-amber-500 w-16"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Información de contacto */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-black rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-amber-500/20">
            <h3 className="text-2xl font-bold font-display mb-6 text-gray-900 dark:text-white">{t('contact.info')}</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-amber-600 dark:text-amber-400 text-sm uppercase tracking-wider mb-1">{t('coinDetail.email')}</p>
                  <a
                    href="mailto:jmnvmmis@gmail.com"
                    className="text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition text-lg"
                  >
                    jmnvmmis@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-amber-500/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-amber-600 dark:text-amber-400 text-sm uppercase tracking-wider mb-1">{t('contact.whatsapp')}</p>
                  <p className="text-gray-900 dark:text-white text-lg">{t('contact.whatsappText')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-amber-500/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-amber-600 dark:text-amber-400 text-sm uppercase tracking-wider mb-1">{t('coinDetail.location')}</p>
                  <p className="text-gray-900 dark:text-white text-lg">{t('coinDetail.locationText')}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-amber-500/30">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{t('contact.schedule')}</h4>
              <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <p>{t('contact.weekdays')}</p>
                <p>{t('contact.saturday')}</p>
                <p>{t('contact.sunday')}</p>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">{t('contact.about')}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('contact.aboutText1')}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('contact.aboutText2')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">{t('contact.faq')}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('contact.faqQ1')}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {t('contact.faqA1')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('contact.faqQ2')}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {t('contact.faqA2')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('contact.faqQ3')}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {t('contact.faqA3')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón volver al catálogo */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-amber-600 to-amber-500 text-white px-12 py-4 rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t('contact.backToCatalog')}
          </Link>
        </div>
      </main>

      {/* Footer unificado */}
      <footer className="bg-amber-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black border-t border-amber-300 dark:border-amber-500/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Cenefa griega superior */}
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
