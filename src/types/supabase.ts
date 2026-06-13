export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          role: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          role?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          role?: string | null
          created_at?: string
        }
      }
      machines: {
        Row: {
          id: string
          name: string | null
          code: string | null
          status: string | null
          location: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          code?: string | null
          status?: string | null
          location?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          code?: string | null
          status?: string | null
          location?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string | null
          reference: string | null
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          reference?: string | null
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          reference?: string | null
          category?: string | null
          created_at?: string
        }
      }
      operators: {
        Row: {
          id: string
          name: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          phone?: string | null
          created_at?: string
        }
      }
      production_sessions: {
        Row: {
          id: string
          machine_id: string | null
          product_id: string | null
          operator_id: string | null
          lot_number: string | null
          start_time: string | null
          end_time: string | null
          quantity_produced: number | null
          waste_quantity: number | null
          efficiency: number | null
          status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          machine_id?: string | null
          product_id?: string | null
          operator_id?: string | null
          lot_number?: string | null
          start_time?: string | null
          end_time?: string | null
          quantity_produced?: number | null
          waste_quantity?: number | null
          efficiency?: number | null
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          machine_id?: string | null
          product_id?: string | null
          operator_id?: string | null
          lot_number?: string | null
          start_time?: string | null
          end_time?: string | null
          quantity_produced?: number | null
          waste_quantity?: number | null
          efficiency?: number | null
          status?: string | null
          created_at?: string
        }
      }
      downtime_reasons: {
        Row: {
          id: string
          name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          created_at?: string
        }
      }
      machine_downtimes: {
        Row: {
          id: string
          machine_id: string | null
          reason_id: string | null
          start_time: string | null
          end_time: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          machine_id?: string | null
          reason_id?: string | null
          start_time?: string | null
          end_time?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          machine_id?: string | null
          reason_id?: string | null
          start_time?: string | null
          end_time?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      quality_controls: {
        Row: {
          id: string
          machine_id: string | null
          product_id: string | null
          lot_number: string | null
          result: string | null
          defect_description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          machine_id?: string | null
          product_id?: string | null
          lot_number?: string | null
          result?: string | null
          defect_description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          machine_id?: string | null
          product_id?: string | null
          lot_number?: string | null
          result?: string | null
          defect_description?: string | null
          created_at?: string
        }
      }
      maintenance_records: {
        Row: {
          id: string
          machine_id: string | null
          maintenance_type: string | null
          technician: string | null
          notes: string | null
          status: string | null
          date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          machine_id?: string | null
          maintenance_type?: string | null
          technician?: string | null
          notes?: string | null
          status?: string | null
          date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          machine_id?: string | null
          maintenance_type?: string | null
          technician?: string | null
          notes?: string | null
          status?: string | null
          date?: string | null
          created_at?: string
        }
      }
    }
  }
}
