// Servicio de Firestore con Supabase para Next.js (Server Side)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Obtener monedas públicas (solo activas)
export const obtenerMonedasPublicas = async () => {
  try {
    const { data, error } = await supabase
      .from('monedas')
      .select('*')
      .eq('activa', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Obtener moneda por ID
export const obtenerMonedaPorId = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('monedas')
      .select('*')
      .eq('id', id)
      .eq('activa', true)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
