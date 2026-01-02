import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import I18nProvider from "../components/I18nProvider";

export const metadata: Metadata = {
  title: "JM NVMMIS - Monedas Raras y Numismática",
  description: "Catálogo de monedas raras, antiguas y de colección. Numismática argentina y mundial.",
  keywords: "monedas, numismática, monedas raras, monedas antiguas, colección",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <I18nProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
