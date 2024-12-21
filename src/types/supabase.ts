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
      categories: {
        Row: {
          id: string
          name: string
          type: 'INCOME' | 'EXPENSE'
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'INCOME' | 'EXPENSE'
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'INCOME' | 'EXPENSE'
          user_id?: string
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          amount: number
          date: string
          category_id: string
          description: string | null
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          amount: number
          date: string
          category_id: string
          description?: string | null
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          amount?: number
          date?: string
          category_id?: string
          description?: string | null
          user_id?: string
          created_at?: string
        }
      }
    }
  }
}