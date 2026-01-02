'use client';

// Este componente envuelve la app con i18n en el lado del cliente
import { useEffect } from 'react';

// Importar la configuración de i18n
import '../i18n/config';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
