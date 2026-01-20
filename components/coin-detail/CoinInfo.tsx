// Componente de información principal de la moneda CON especificaciones técnicas COMPLETAS
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { obtenerSimboloMoneda, formatearNumero } from '@/lib/monedas';

type CoinInfoProps = {
  nombre: string;
  pais?: string;
  precios?: { precio: number; tipo_moneda: string }[];
  stock?: number;
  // Especificaciones técnicas
  composicion?: string;
  peso?: number;
  diametro?: number;
  grosor?: number;
  orientacion?: string;
  forma?: string;
  tecnica?: string;
  referencias?: string;
  // Información histórica
  emisor?: string;
  autoridad?: string;
  año?: string;
  tipo_moneda?: string;
  // Denominación
  valor?: string;
  unidad_monetaria?: string;
  // Catalogación
  desmonetizada?: boolean;
  numero?: string;
};

export default function CoinInfo({ 
  nombre, 
  pais, 
  precios, 
  stock,
  composicion,
  peso,
  diametro,
  grosor,
  orientacion,
  forma,
  tecnica,
  referencias,
  emisor,
  autoridad,
  año,
  tipo_moneda,
  valor,
  unidad_monetaria,
  desmonetizada,
  numero,
}: CoinInfoProps) {
  const { t } = useTranslation();
  
  const hasSpecs = composicion || peso || diametro || grosor || orientacion || forma || 
                   tecnica || referencias || emisor || autoridad || año || tipo_moneda || 
                   valor || unidad_monetaria || desmonetizada !== undefined || numero;

  return (
    <div className="space-y-4">
      {/* Título y país */}
      <div>
        <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">
          {nombre}
        </h1>
        {pais && (
          <div className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
            <svg className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{pais}</span>
          </div>
        )}
      </div>

      {/* Sección de Precios */}
      {precios && Array.isArray(precios) && precios.length > 0 && (
        <div className="bg-gradient-to-br from-amber-50 via-amber-50 to-orange-50 dark:from-amber-900/20 dark:via-amber-800/15 dark:to-orange-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-500/30">
          <div className="flex items-center gap-1.5 mb-2.5">
            <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xs font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide">
              {precios.length > 1 ? 'Precios' : 'Precio'}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {precios.map((precioItem: any, idx: number) => (
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
      {stock !== undefined && (
        <div>
          {stock === 0 ? (
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
          ) : stock < 5 ? (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-2.5 rounded-lg">
              <div className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="font-bold text-yellow-800 dark:text-yellow-400 text-xs">{t('coinDetail.stock.lastUnits')}</p>
                  <p className="text-[10px] text-yellow-600 dark:text-yellow-500 mt-0.5">
                    {t('coinDetail.stock.only')} {stock} {stock === 1 ? t('coinDetail.stock.unit') : t('coinDetail.stock.units')}
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
                  <p className="text-[10px] text-green-600 dark:text-green-500 mt-0.5">{stock} {t('coinDetail.stock.units')}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Especificaciones Técnicas - COMPLETAS CON TODOS LOS CAMPOS */}
      {hasSpecs && (
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
              {/* Información Histórica */}
              {emisor && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Emisor
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white break-words">
                      {emisor}
                    </div>
                  </div>
                </div>
              )}
              {autoridad && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Autoridad
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white break-words">
                      {autoridad}
                    </div>
                  </div>
                </div>
              )}
              {año && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Año
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white">
                      {año}
                    </div>
                  </div>
                </div>
              )}
              {tipo_moneda && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Tipo de Moneda
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white break-words">
                      {tipo_moneda}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Denominación */}
              {valor && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Valor Facial
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white">
                      {valor}
                    </div>
                  </div>
                </div>
              )}
              {unidad_monetaria && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Unidad Monetaria
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white break-words">
                      {unidad_monetaria}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Especificaciones Físicas */}
              {composicion && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Composición
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white break-words">
                      {composicion}
                    </div>
                  </div>
                </div>
              )}
              {peso && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Peso
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white">
                      {formatearNumero(peso)} g
                    </div>
                  </div>
                </div>
              )}
              {diametro && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Diámetro
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white">
                      {formatearNumero(diametro)} mm
                    </div>
                  </div>
                </div>
              )}
              {grosor && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Grosor
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white">
                      {formatearNumero(grosor)} mm
                    </div>
                  </div>
                </div>
              )}
              {forma && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Forma
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white break-words">
                      {forma}
                    </div>
                  </div>
                </div>
              )}
              {tecnica && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Técnica
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white break-words">
                      {tecnica}
                    </div>
                  </div>
                </div>
              )}
              {orientacion && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Orientación
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white break-words">
                      {orientacion}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Catalogación */}
              {desmonetizada !== undefined && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Estado
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white">
                      {desmonetizada ? 'Desmonetizada' : 'En circulación'}
                    </div>
                  </div>
                </div>
              )}
              {numero && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Número de Catálogo
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white break-words">
                      {numero}
                    </div>
                  </div>
                </div>
              )}
              {referencias && (
                <div className="flex items-start gap-2 p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                      Referencias
                    </div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white break-words">
                      {referencias}
                    </div>
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
  );
}
