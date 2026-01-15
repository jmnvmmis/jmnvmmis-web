// Tipos de moneda disponibles para los precios
export const TIPOS_MONEDA = [
  { codigo: 'ARS', nombre: 'Peso Argentino', simbolo: '$' },
  { codigo: 'USD', nombre: 'Dólar Estadounidense', simbolo: 'US$' },
  { codigo: 'EUR', nombre: 'Euro', simbolo: '€' }
];

// Función helper para obtener el símbolo de una moneda
export const obtenerSimboloMoneda = (codigo: string): string => {
  const moneda = TIPOS_MONEDA.find(m => m.codigo === codigo);
  return moneda ? moneda.simbolo : '$';
};

// Función helper para formatear precio con moneda
export const formatearPrecioConMoneda = (precio: number | string, tipoMoneda: string = 'ARS'): string => {
  const simbolo = obtenerSimboloMoneda(tipoMoneda);
  const precioFormateado = parseFloat(String(precio)).toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `${simbolo}${precioFormateado}`;
};

// Función helper para formatear números con coma decimal
export const formatearNumero = (numero: number | string): string => {
  if (!numero) return '';
  return parseFloat(String(numero)).toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
};
