// Página principal - Catálogo de monedas REFACTORIZADO
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import CatalogFilters from '@/components/catalog/CatalogFilters';
import CoinGrid from '@/components/catalog/CoinGrid';
import { useCatalog } from '@/hooks/useCatalog';
import { useThemeBackground } from '@/hooks/useThemeBackground';

export default function Home() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const bgColor = useThemeBackground();
  
  const {
    monedas,
    monedasFiltradas,
    busqueda,
    setBusqueda,
    filtroPais,
    setFiltroPais,
    loading,
    paisesDisponibles,
  } = useCatalog();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evitar hidratación mientras i18n se inicializa
  if (!mounted) {
    return (
      <div className="min-h-screen bg-amber-50 dark:bg-gray-900 transition-colors">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-amber-700 dark:text-gray-400">{t('common.loading')}</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen transition-colors" 
      style={{ backgroundColor: bgColor }}
    >
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-amber-700 dark:text-gray-600 text-lg">
              {t('catalog.loading')}
            </p>
          </div>
        ) : monedas.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {t('catalog.noCoinsAvailable')}
            </p>
            <p className="text-gray-400 mt-2">
              {t('catalog.comeBackSoon')}
            </p>
          </div>
        ) : (
          <>
            <CatalogFilters
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              filtroPais={filtroPais}
              setFiltroPais={setFiltroPais}
              paisesDisponibles={paisesDisponibles}
              totalMonedas={monedasFiltradas.length}
            />

            <CoinGrid
              monedas={monedasFiltradas}
              busqueda={busqueda}
              filtroPais={filtroPais}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
