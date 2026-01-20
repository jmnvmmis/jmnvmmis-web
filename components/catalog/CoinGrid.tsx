// Componente de grilla de monedas
import { useTranslation } from 'react-i18next';
import CoinCard from './CoinCard';

type Moneda = {
  id: string;
  nombre: string;
  pais?: string;
  imagenes?: { url: string }[];
  precios?: { precio: number; tipo_moneda: string }[];
  stock?: number;
};

type CoinGridProps = {
  monedas: Moneda[];
  busqueda: string;
  filtroPais: string;
};

export default function CoinGrid({ monedas, busqueda, filtroPais }: CoinGridProps) {
  const { t } = useTranslation();

  if (monedas.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center border border-amber-200 dark:border-gray-700">
        <p className="text-gray-500 text-lg">
          {t('catalog.noResults')}
          {busqueda && ` con "${busqueda}"`}
          {filtroPais !== 'todos' && busqueda && ` y`}
          {filtroPais !== 'todos' && ` de ${filtroPais}`}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {monedas.map((moneda) => (
        <CoinCard key={moneda.id} moneda={moneda} />
      ))}
    </div>
  );
}
