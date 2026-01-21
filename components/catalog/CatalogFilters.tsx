// Componente de filtros del catálogo
import { useTranslation } from 'react-i18next';
import CustomSelect from '@/components/CustomSelect';

type CatalogFiltersProps = {
  busqueda: string;
  setBusqueda: (value: string) => void;
  filtroPais: string;
  setFiltroPais: (value: string) => void;
  paisesDisponibles: string[];
  totalMonedas: number;
};

export default function CatalogFilters({
  busqueda,
  setBusqueda,
  filtroPais,
  setFiltroPais,
  paisesDisponibles,
  totalMonedas,
}: CatalogFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-black p-8 rounded-2xl shadow-xl mb-8 border border-amber-200 dark:border-amber-500/20">
      <div className="mb-6">
        <h2 className="text-3xl font-bold font-display text-amber-900 dark:text-white mb-3 tracking-wide">
          {t('catalog.title')}
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-px bg-amber-500 w-8"></div>
          <p className="text-amber-700 dark:text-amber-400 font-medium">
            {totalMonedas} {totalMonedas === 1 ? t('catalog.coinAvailable') : t('catalog.coinsAvailable')}
          </p>
          <div className="h-px bg-amber-500 w-8"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2 uppercase tracking-wider">
            {t('catalog.filters.search')}
          </label>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder={t('catalog.filters.searchPlaceholder')}
            className="w-full px-5 py-3 bg-amber-50 dark:bg-white/10 backdrop-blur-sm border border-amber-300 dark:border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 dark:text-white placeholder-amber-600 dark:placeholder-gray-400 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2 uppercase tracking-wider">
            {t('catalog.filters.filterByCountry')}
          </label>
          <CustomSelect
            value={filtroPais}
            onChange={setFiltroPais}
            options={[
              { value: 'todos', label: t('catalog.filters.allCountries') },
              ...paisesDisponibles.map(pais => ({ value: pais, label: pais }))
            ]}
          />
        </div>
      </div>
    </div>
  );
}
