// Página de detalle de moneda - REFACTORIZADA CON TODOS LOS CAMPOS
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import CoinImages from '@/components/coin-detail/CoinImages';
import CoinInfo from '@/components/coin-detail/CoinInfo';
import CoinSpecs from '@/components/coin-detail/CoinSpecs';
import { useCoinDetail } from '@/hooks/useCoinDetail';
import { useThemeBackground } from '@/hooks/useThemeBackground';

export default function DetalleMoneda() {
  const { t } = useTranslation();
  const params = useParams();
  const hash = params.id as string;
  const [mounted, setMounted] = useState(false);
  const bgColor = useThemeBackground();
  
  const { moneda, loading, error } = useCoinDetail(hash);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (error || !moneda || !moneda.activa) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center transition-colors" 
        style={{ backgroundColor: bgColor }}
      >
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            {error || 'Coin not found'}
          </p>
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
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-500 font-semibold transition-colors group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('coinDetail.backToCatalog')}
        </Link>
      </div>

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        {/* Grid principal: Imagen + Info básica + Especificaciones Técnicas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CoinImages 
            imagenes={moneda.imagenes || []} 
            nombre={moneda.nombre}
          />

          <CoinInfo
            nombre={moneda.nombre}
            pais={moneda.pais}
            precios={moneda.precios}
            stock={moneda.stock}
            composicion={moneda.composicion}
            peso={moneda.peso}
            diametro={moneda.diametro}
            grosor={moneda.grosor}
            orientacion={moneda.orientacion}
            forma={moneda.forma}
            tecnica={moneda.tecnica}
            referencias={moneda.referencias}
            emisor={moneda.emisor}
            autoridad={moneda.autoridad}
            año={moneda.año}
            tipo_moneda={moneda.tipo_moneda}
            valor={moneda.valor}
            unidad_monetaria={moneda.unidad_monetaria}
            desmonetizada={moneda.desmonetizada}
            numero={moneda.numero}
          />
        </div>

        {/* Sección de descripción (ancho completo) */}
        <CoinSpecs descripcion={moneda.descripcion} />

        {/* Botón volver al catálogo */}
        <div className="text-center pt-6">
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
      </main>

      <Footer />
    </div>
  );
}
