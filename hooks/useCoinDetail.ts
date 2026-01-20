// Hook personalizado para cargar detalle de moneda
import { useState, useEffect } from 'react';
import { obtenerMonedaPorId } from '@/lib/firestore';
import { unhashId } from '@/lib/utils/hashId';

export const useCoinDetail = (hash: string) => {
  const [moneda, setMoneda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarMoneda();
  }, [hash]);

  const cargarMoneda = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const id = unhashId(hash);
      
      if (!id) {
        setError('ID de moneda inválido');
        setLoading(false);
        return;
      }

      const datos = await obtenerMonedaPorId(id);
      
      if (!datos) {
        setError('Moneda no encontrada');
      } else {
        setMoneda(datos);
      }
    } catch (err) {
      console.error('Error al cargar moneda:', err);
      setError('Error al cargar la moneda');
    }
    
    setLoading(false);
  };

  return { moneda, loading, error };
};
