// Hook personalizado para manejar el catálogo de monedas
import { useState, useEffect } from 'react';
import { obtenerMonedasPublicas } from '@/lib/firestore';

type Moneda = {
  id: string;
  nombre: string;
  pais?: string;
  imagenes?: { url: string }[];
  precios?: { precio: number; tipo_moneda: string }[];
  stock?: number;
};

export const useCatalog = () => {
  const [monedas, setMonedas] = useState<Moneda[]>([]);
  const [monedasFiltradas, setMonedasFiltradas] = useState<Moneda[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroPais, setFiltroPais] = useState('todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarMonedas();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [monedas, busqueda, filtroPais]);

  const cargarMonedas = async () => {
    setLoading(true);
    const datos = await obtenerMonedasPublicas();
    setMonedas(datos);
    setLoading(false);
  };

  const aplicarFiltros = () => {
    let resultado = [...monedas];

    // Filtrar por búsqueda
    if (busqueda.trim()) {
      resultado = resultado.filter(moneda =>
        moneda.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtrar por país
    if (filtroPais !== 'todos') {
      resultado = resultado.filter(moneda => moneda.pais === filtroPais);
    }

    setMonedasFiltradas(resultado);
  };

  const obtenerPaisesUnicos = () => {
    const paises = monedas
      .map(m => m.pais)
      .filter((p): p is string => typeof p === 'string' && p.length > 0);

    const paisesSet = new Set(paises);
    return Array.from(paisesSet).sort();
  };

  return {
    monedas,
    monedasFiltradas,
    busqueda,
    setBusqueda,
    filtroPais,
    setFiltroPais,
    loading,
    paisesDisponibles: obtenerPaisesUnicos(),
  };
};
