// Componente Footer compartido
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/Logo';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-amber-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black border-t border-amber-300 dark:border-amber-500/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6">
            <Logo variant="full" />
          </div>

          <div className="md:col-span-3">
            <h3 className="font-bold font-display text-xl text-amber-900 dark:text-white mb-4">
              {t('footer.links')}
            </h3>
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

          <div className="md:col-span-3">
            <h3 className="font-bold font-display text-xl text-amber-900 dark:text-white mb-4">
              {t('footer.contactTitle')}
            </h3>
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
  );
}
