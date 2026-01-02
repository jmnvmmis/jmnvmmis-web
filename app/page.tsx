// Página principal - Catálogo de monedas mejorado
'use client';

import { useTranslation } from 'react-i18next';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';
import { obtenerMonedasPublicas } from '@/lib/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const [monedas, setMonedas] = useState([]);
  const [monedasFiltradas, setMonedasFiltradas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroPais, setFiltroPais] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    setMounted(true);
    cargarMonedas();
    
    // Función para actualizar el color de fondo
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
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [monedas, busqueda, filtroPais]);

  const cargarMonedas = async () => {
    setLoading(true);
    const datos = await obtenerMonedasPublicas();
    setMonedas(datos);
    setLoading(false);
  };

  const aplicarFiltros = () => {
    let resultado = [...monedas];

    // Filtrar por búsqueda
    if (busqueda.trim()) {
      resultado = resultado.filter(moneda =>
        moneda.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtrar por país
    if (filtroPais !== 'todos') {
      resultado = resultado.filter(moneda => moneda.pais === filtroPais);
    }

    setMonedasFiltradas(resultado);
  };

  const obtenerPaisesUnicos = () => {
    const paisesSet = new Set(monedas.map(m => m.pais).filter(Boolean));
    return Array.from(paisesSet).sort();
  };

  const paisesDisponibles = obtenerPaisesUnicos();

  // Evitar hidratación mientras i18n se inicializa
  if (!mounted) {
    return (
      <div className="min-h-screen bg-stone-50 transition-colors">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen transition-colors" 
      style={{ backgroundColor: bgColor }}
    >
      {/* Header con diseño elegante */}
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
        {/* Cenefa griega decorativa */}
        <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      </header>

      {/* Catálogo */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">{t('catalog.loading')}</p>
          </div>
        ) : monedas.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No hay monedas disponibles en este momento.
            </p>
            <p className="text-gray-400 mt-2">
              Vuelve pronto para ver nuestro catálogo.
            </p>
          </div>
        ) : (
          <>
            {/* Barra de búsqueda y filtros mejorada */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl mb-8 border border-amber-500/20">
              <div className="mb-6">
                <h2 className="text-3xl font-bold font-display text-white mb-3 tracking-wide">{t('catalog.title')}</h2>
                <div className="flex items-center gap-3">
                  <div className="h-px bg-amber-500 w-8"></div>
                  <p className="text-amber-400 font-medium">
                    {monedasFiltradas.length} {monedasFiltradas.length === 1 ? 'moneda disponible' : 'monedas disponibles'}
                  </p>
                  <div className="h-px bg-amber-500 w-8"></div>
                </div>
              </div>
              
              {/* Filtros */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-2 uppercase tracking-wider">
                    Buscar por nombre
                  </label>
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar moneda..."
                    className="w-full px-5 py-3 bg-white/10 backdrop-blur-sm border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-2 uppercase tracking-wider">
                    Filtrar por país
                  </label>
                  <select
                    value={filtroPais}
                    onChange={(e) => setFiltroPais(e.target.value)}
                    className="w-full px-5 py-3 bg-white/10 backdrop-blur-sm border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white transition-all"
                  >
                    <option value="todos" className="bg-gray-900">{t('catalog.filters.allCountries')}</option>
                    {paisesDisponibles.map((pais) => (
                      <option key={pais} value={pais} className="bg-gray-900">
                        {pais}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Grid de monedas */}
            {monedasFiltradas.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-500 text-lg">
                  {t('catalog.noResults')}
                  {busqueda && ` con "${busqueda}"`}
                  {filtroPais !== 'todos' && busqueda && ` y`}
                  {filtroPais !== 'todos' && ` de ${filtroPais}`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {monedasFiltradas.map((moneda) => (
                  <Link 
                    key={moneda.id} 
                    href={`/moneda/${moneda.id}`}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group card-hover border border-gray-100"
                  >
                    <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100">
                      {moneda.imagenes && moneda.imagenes.length > 0 ? (
                        <Image
                          src={moneda.imagenes[0].url}
                          alt={moneda.nombre}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          Sin imagen
                        </div>
                      )}
                      {/* Overlay sutil al hacer hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold text-sm md:text-base mb-2 line-clamp-2 text-gray-800 group-hover:text-amber-600 transition-colors min-h-[2.5rem]">
                        {moneda.nombre}
                      </h3>
                      {moneda.pais && (
                        <div className="flex items-center gap-1 mb-2">
                          <svg className="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                          </svg>
                          <span className="text-xs text-gray-500">{moneda.pais}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <p className="text-xl md:text-2xl font-bold text-amber-600">
                          ${moneda.precio?.toLocaleString('es-AR')}
                        </p>
                        {moneda.stock !== undefined && (
                          <div>
                            {moneda.stock === 0 ? (
                              <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                Sin stock
                              </span>
                            ) : moneda.stock < 5 ? (
                              <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                                ¡Solo {moneda.stock}!
                              </span>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer mejorado con identidad de marca */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-amber-500/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Cenefa griega superior */}
          <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sobre nosotros */}
            <div>
              <h3 className="font-bold font-display text-xl text-white mb-4">JM NVMMIS</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('footer.about')}
              </p>
            </div>

            {/* Enlaces rápidos */}
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

            {/* Contacto */}
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
