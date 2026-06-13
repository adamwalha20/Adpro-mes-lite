import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type ProductionSession = Database['public']['Tables']['production_sessions']['Row'];
type Machine = Database['public']['Tables']['machines']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Operator = Database['public']['Tables']['operators']['Row'];

interface ProductionStore {
  sessions: ProductionSession[];
  machines: Machine[];
  products: Product[];
  operators: Operator[];
  loading: boolean;
  error: string | null;
  fetchInitialData: () => Promise<void>;
  startSession: (data: Partial<ProductionSession>) => Promise<void>;
  updateSessionStatus: (id: string, status: string, endTime?: string) => Promise<void>;
}

export const useProductionStore = create<ProductionStore>((set, get) => ({
  sessions: [],
  machines: [],
  products: [],
  operators: [],
  loading: false,
  error: null,

  fetchInitialData: async () => {
    set({ loading: true, error: null });
    try {
      const [sessionsRes, machinesRes, productsRes, operatorsRes] = await Promise.all([
        supabase.from('production_sessions').select('*').order('created_at', { ascending: false }),
        supabase.from('machines').select('*'),
        supabase.from('products').select('*'),
        supabase.from('operators').select('*'),
      ]);

      if (sessionsRes.error) throw sessionsRes.error;
      if (machinesRes.error) throw machinesRes.error;
      if (productsRes.error) throw productsRes.error;
      if (operatorsRes.error) throw operatorsRes.error;

      set({
        sessions: sessionsRes.data || [],
        machines: machinesRes.data || [],
        products: productsRes.data || [],
        operators: operatorsRes.data || [],
      });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  startSession: async (data: any) => {
    try {
      const { data: newSession, error } = await supabase
        .from('production_sessions')
        .insert([{
          ...data,
          start_time: new Date().toISOString(),
          status: 'En cours'
        } as any])
        .select()
        .single();
      
      if (error) throw error;
      
      set(state => ({ sessions: [newSession, ...state.sessions] }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  updateSessionStatus: async (id: string, status: string, endTime?: string) => {
    try {
      const updateData: any = { status };
      if (endTime) updateData.end_time = endTime;

      const { error } = await supabase
        .from('production_sessions')
        .update(updateData as any)
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        sessions: state.sessions.map(s => s.id === id ? { ...s, ...updateData } : s)
      }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  }
}));
