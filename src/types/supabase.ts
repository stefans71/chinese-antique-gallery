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
      paintings: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          dynasty: string
          artistic_style: string[]
          age: number | null
          width_cm: number
          height_cm: number
          weight_kg: number | null
          price: number
          images: string[]
          status: 'available' | 'sold' | 'reserved'
          content_tags: string[]
          item_number: string
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          dynasty: string
          artistic_style: string[]
          age?: number | null
          width_cm: number
          height_cm: number
          weight_kg?: number | null
          price: number
          images: string[]
          status?: 'available' | 'sold' | 'reserved'
          content_tags?: string[]
          item_number: string
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          dynasty?: string
          artistic_style?: string[]
          age?: number | null
          width_cm?: number
          height_cm?: number
          weight_kg?: number | null
          price?: number
          images?: string[]
          status?: 'available' | 'sold' | 'reserved'
          content_tags?: string[]
          item_number?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          painting_id: string
          status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: Json
          payment_intent: string | null
          total_amount: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          painting_id: string
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: Json
          payment_intent?: string | null
          total_amount: number
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          painting_id?: string
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address?: Json
          payment_intent?: string | null
          total_amount?: number
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'user' | 'admin' | 'super_admin'
          phone: string | null
          shipping_addresses: Json[]
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'super_admin'
          phone?: string | null
          shipping_addresses?: Json[]
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'super_admin'
          phone?: string | null
          shipping_addresses?: Json[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
