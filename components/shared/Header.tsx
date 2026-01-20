// Componente Header compartido
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '@/app/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import Logo from '@/components/Logo';

export default function Header() {
  const { t } = useTranslation();

  return (
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
  );
}
