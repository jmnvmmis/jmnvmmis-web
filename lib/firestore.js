// Servicio de Firestore para obtener monedas públicas
import { collection, query, where, orderBy, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

const COLECCION = 'monedas';

/**
 * Obtener todas las monedas activas (para el catálogo público)
 * @returns {Promise<Array>}
 */
export async function obtenerMonedasPublicas() {
  try {
    const q = query(
      collection(db, COLECCION),
      where('activa', '==', true),
      orderBy('fechaCreacion', 'desc')
    );
    const snapshot = await getDocs(q);
    const monedas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return monedas;
  } catch (error) {
    console.error('Error al obtener monedas:', error);
    return [];
  }
}

/**
 * Obtener una moneda por ID
 * @param {string} id - ID de la moneda
 * @returns {Promise<Object|null>}
 */
export async function obtenerMonedaPorId(id) {
  try {
    const docRef = doc(db, COLECCION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error al obtener moneda:', error);
    return null;
  }
}
