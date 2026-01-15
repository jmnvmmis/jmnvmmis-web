// Utilidades para hashear/deshashear IDs de monedas
// Esto oculta los IDs reales en las URLs

const SALT = 'jmnvmmis-secret-2024'; // Cambia esto por un string secreto único
const OFFSET = 71923; // Número aleatorio para ofuscar más

/**
 * Convierte un ID numérico en un hash alfanumérico completamente ofuscado
 * Ejemplo: 9 -> "k3m8n2p"
 */
export function hashId(id: string | number): string {
  const idNum = parseInt(String(id));
  
  // Aplicar offset y codificar
  const encoded = idNum + OFFSET;
  
  // Crear un hash usando el ID + SALT
  let hash = 0;
  const combined = String(encoded) + SALT;
  
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convertir ambos a base36
  const hashStr = Math.abs(hash).toString(36);
  const encodedStr = encoded.toString(36);
  
  // Agregar longitud del encodedStr al inicio (en base36)
  const lengthPrefix = encodedStr.length.toString(36);
  
  // Mezclar: lengthPrefix + mezcla de hash y encoded
  const mixed = lengthPrefix + mixStrings(hashStr, encodedStr);
  
  return mixed;
}

/**
 * Convierte un hash de vuelta al ID original
 * Ejemplo: "k3m8n2p" -> "9"
 */
export function unhashId(hash: string): string | null {
  try {
    // El primer carácter es la longitud del encoded string
    const lengthPrefix = hash[0];
    const expectedLength = parseInt(lengthPrefix, 36);
    
    // El resto es la mezcla
    const mixed = hash.substring(1);
    
    // Desmezclar con la longitud esperada
    const encodedStr = unmixStrings(mixed, expectedLength);
    if (!encodedStr) return null;
    
    // Decodificar de base36
    const encoded = parseInt(encodedStr, 36);
    
    // Quitar offset
    const id = encoded - OFFSET;
    
    if (id < 0 || isNaN(id)) return null;
    
    return String(id);
  } catch (error) {
    console.error('Error unhashing ID:', error);
    return null;
  }
}

/**
 * Mezcla dos strings de forma determinística
 * Formato: [hash_char][encoded_char][hash_char][encoded_char]...
 */
function mixStrings(str1: string, str2: string): string {
  const maxLen = Math.max(str1.length, str2.length);
  let result = '';
  
  for (let i = 0; i < maxLen; i++) {
    if (i < str1.length) result += str1[i];
    if (i < str2.length) result += str2[i];
  }
  
  return result;
}

/**
 * Desmezcla un string para recuperar el segundo string original (encoded ID)
 * @param mixed String mezclado
 * @param expectedLength Longitud esperada del string encoded
 */
function unmixStrings(mixed: string, expectedLength: number): string | null {
  try {
    let result = '';
    
    // Extraer caracteres en posiciones impares hasta alcanzar la longitud esperada
    for (let i = 1; i < mixed.length && result.length < expectedLength; i += 2) {
      result += mixed[i];
    }
    
    return result.length === expectedLength ? result : null;
  } catch (error) {
    return null;
  }
}

/**
 * Valida si un hash es válido
 */
export function isValidHash(hash: string): boolean {
  return unhashId(hash) !== null;
}
