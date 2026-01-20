// Componente solo para la descripción (va debajo de todo)
type CoinSpecsProps = {
  descripcion?: string;
};

export default function CoinSpecs({ descripcion }: CoinSpecsProps) {
  if (!descripcion) {
    return null;
  }

  return (
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
          {descripcion}
        </p>
      </div>
    </div>
  );
}
