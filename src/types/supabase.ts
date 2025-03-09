export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      design_files: {
        Row: {
          created_at: string | null
          design_id: string
          file_path: string
          file_type: string
          id: string
          is_primary: boolean | null
        }
        Insert: {
          created_at?: string | null
          design_id: string
          file_path: string
          file_type: string
          id?: string
          is_primary?: boolean | null
        }
        Update: {
          created_at?: string | null
          design_id?: string
          file_path?: string
          file_type?: string
          id?: string
          is_primary?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "design_files_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "designs"
            referencedColumns: ["id"]
          },
        ]
      }
      design_images: {
        Row: {
          created_at: string | null
          design_id: string
          id: string
          image_url: string
          is_primary: boolean | null
        }
        Insert: {
          created_at?: string | null
          design_id: string
          id?: string
          image_url: string
          is_primary?: boolean | null
        }
        Update: {
          created_at?: string | null
          design_id?: string
          id?: string
          image_url?: string
          is_primary?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "design_images_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "designs"
            referencedColumns: ["id"]
          },
        ]
      }
      design_materials: {
        Row: {
          created_at: string | null
          design_id: string
          id: string
          material: string
        }
        Insert: {
          created_at?: string | null
          design_id: string
          id?: string
          material: string
        }
        Update: {
          created_at?: string | null
          design_id?: string
          id?: string
          material?: string
        }
        Relationships: [
          {
            foreignKeyName: "design_materials_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "designs"
            referencedColumns: ["id"]
          },
        ]
      }
      designs: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          designer_id: string
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          price: number
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          designer_id: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          price: number
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          designer_id?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          price?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "designs_designer_id_fkey"
            columns: ["designer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      dropshipper_products: {
        Row: {
          created_at: string | null
          design_id: string
          dropshipper_id: string
          id: string
          is_active: boolean | null
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          design_id: string
          dropshipper_id: string
          id?: string
          is_active?: boolean | null
          price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          design_id?: string
          dropshipper_id?: string
          id?: string
          is_active?: boolean | null
          price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dropshipper_products_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "designs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dropshipper_products_dropshipper_id_fkey"
            columns: ["dropshipper_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          cost: number
          created_at: string | null
          design_id: string
          designer_royalty: number
          dropshipper_id: string | null
          dropshipper_profit: number | null
          id: string
          order_id: string
          price: number
          quantity: number
        }
        Insert: {
          cost: number
          created_at?: string | null
          design_id: string
          designer_royalty: number
          dropshipper_id?: string | null
          dropshipper_profit?: number | null
          id?: string
          order_id: string
          price: number
          quantity?: number
        }
        Update: {
          cost?: number
          created_at?: string | null
          design_id?: string
          designer_royalty?: number
          dropshipper_id?: string | null
          dropshipper_profit?: number | null
          id?: string
          order_id?: string
          price?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "designs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_dropshipper_id_fkey"
            columns: ["dropshipper_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_email: string
          customer_id: string | null
          customer_name: string
          customer_phone: string | null
          id: string
          notes: string | null
          order_number: string
          shipping_address: string
          shipping_city: string
          shipping_method: string
          shipping_state: string
          shipping_zip: string
          status: string
          total_amount: number
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          customer_id?: string | null
          customer_name: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          order_number: string
          shipping_address: string
          shipping_city: string
          shipping_method?: string
          shipping_state: string
          shipping_zip: string
          status?: string
          total_amount: number
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          customer_id?: string | null
          customer_name?: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          shipping_address?: string
          shipping_city?: string
          shipping_method?: string
          shipping_state?: string
          shipping_zip?: string
          status?: string
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      royalty_payment_items: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          order_item_id: string
          payment_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          order_item_id: string
          payment_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          order_item_id?: string
          payment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "royalty_payment_items_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "royalty_payment_items_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "royalty_payments"
            referencedColumns: ["id"]
          },
        ]
      }
      royalty_payments: {
        Row: {
          amount: number
          created_at: string | null
          designer_id: string
          id: string
          payment_date: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          designer_id: string
          id?: string
          payment_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          designer_id?: string
          id?: string
          payment_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "royalty_payments_designer_id_fkey"
            columns: ["designer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          account_type: string
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          updated_at: string | null
        }
        Insert: {
          account_type: string
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          updated_at?: string | null
        }
        Update: {
          account_type?: string
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          updated_at?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
