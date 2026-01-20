// Componente de tarjeta individual de moneda
import Link from 'next/link';
import Image from 'next/image';
import { hashId } from '@/lib/utils/hashId';
import { obtenerSimboloMoneda } from '@/lib/monedas';

type Moneda = {
  id: string;
  nombre: string;
  pais?: string;
  imagenes?: { url: string }[];
  precios?: { precio: number; tipo_moneda: string }[];
  stock?: number;
};

type CoinCardProps = {
  moneda: Moneda;
};

export default function CoinCard({ moneda }: CoinCardProps) {
  return (
    <Link 
      href={`/moneda/${hashId(moneda.id)}`}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group card-hover border border-amber-200 dark:border-gray-700"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="font-semibold text-sm md:text-base mb-2 line-clamp-2 text-amber-900 dark:text-white group-hover:text-amber-600 transition-colors min-h-[2.5rem]">
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
        
        <div className="mb-2">
          {moneda.precios && Array.isArray(moneda.precios) && moneda.precios.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {moneda.precios.map((precioItem: any, idx: number) => (
                <div key={idx} className="text-base md:text-lg font-bold text-amber-600">
                  {obtenerSimboloMoneda(precioItem.tipo_moneda)}{precioItem.precio?.toLocaleString('es-AR')}
                  <span className="text-xs text-gray-500 ml-1">{precioItem.tipo_moneda}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-base text-gray-400">Consultar precio</p>
          )}
        </div>
        
        {moneda.stock !== undefined && (
          <div className="mt-2">
            {moneda.stock === 0 ? (
              <span className="inline-block text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                Sin stock
              </span>
            ) : moneda.stock < 5 ? (
              <span className="inline-block text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full whitespace-nowrap">
                ¡Solo {moneda.stock}!
              </span>
            ) : null}
          </div>
        )}
      </div>
    </Link>
  );
}
