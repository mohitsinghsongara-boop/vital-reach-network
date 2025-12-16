export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blood_bank_profiles: {
        Row: {
          bank_name: string
          closing_time: string | null
          contact_person: string | null
          created_at: string
          facilities: string[] | null
          id: string
          is_24_hours: boolean | null
          license_number: string | null
          opening_time: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          bank_name: string
          closing_time?: string | null
          contact_person?: string | null
          created_at?: string
          facilities?: string[] | null
          id?: string
          is_24_hours?: boolean | null
          license_number?: string | null
          opening_time?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          bank_name?: string
          closing_time?: string | null
          contact_person?: string | null
          created_at?: string
          facilities?: string[] | null
          id?: string
          is_24_hours?: boolean | null
          license_number?: string | null
          opening_time?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      blood_inventory: {
        Row: {
          blood_bank_id: string
          blood_type: Database["public"]["Enums"]["blood_type"]
          expiry_date: string | null
          id: string
          last_updated: string | null
          units_available: number | null
        }
        Insert: {
          blood_bank_id: string
          blood_type: Database["public"]["Enums"]["blood_type"]
          expiry_date?: string | null
          id?: string
          last_updated?: string | null
          units_available?: number | null
        }
        Update: {
          blood_bank_id?: string
          blood_type?: Database["public"]["Enums"]["blood_type"]
          expiry_date?: string | null
          id?: string
          last_updated?: string | null
          units_available?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blood_inventory_blood_bank_id_fkey"
            columns: ["blood_bank_id"]
            isOneToOne: false
            referencedRelation: "blood_bank_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_requests: {
        Row: {
          accepted_by: string | null
          address: string | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          city: string | null
          created_at: string
          hospital_name: string | null
          id: string
          latitude: number | null
          longitude: number | null
          patient_age: number | null
          patient_condition: string | null
          patient_name: string | null
          purpose: string | null
          requested_by: string
          required_by: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          units_needed: number | null
          updated_at: string
        }
        Insert: {
          accepted_by?: string | null
          address?: string | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          city?: string | null
          created_at?: string
          hospital_name?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          patient_age?: number | null
          patient_condition?: string | null
          patient_name?: string | null
          purpose?: string | null
          requested_by: string
          required_by?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          units_needed?: number | null
          updated_at?: string
        }
        Update: {
          accepted_by?: string | null
          address?: string | null
          blood_type?: Database["public"]["Enums"]["blood_type"]
          city?: string | null
          created_at?: string
          hospital_name?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          patient_age?: number | null
          patient_condition?: string | null
          patient_name?: string | null
          purpose?: string | null
          requested_by?: string
          required_by?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          units_needed?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      donation_history: {
        Row: {
          blood_bank_id: string | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at: string
          donation_date: string
          donor_id: string
          id: string
          notes: string | null
          units_donated: number | null
        }
        Insert: {
          blood_bank_id?: string | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at?: string
          donation_date?: string
          donor_id: string
          id?: string
          notes?: string | null
          units_donated?: number | null
        }
        Update: {
          blood_bank_id?: string | null
          blood_type?: Database["public"]["Enums"]["blood_type"]
          created_at?: string
          donation_date?: string
          donor_id?: string
          id?: string
          notes?: string | null
          units_donated?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "donation_history_blood_bank_id_fkey"
            columns: ["blood_bank_id"]
            isOneToOne: false
            referencedRelation: "blood_bank_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      donor_profiles: {
        Row: {
          age: number | null
          allergies: string[] | null
          availability:
            | Database["public"]["Enums"]["availability_status"]
            | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at: string
          id: string
          last_donation_date: string | null
          medical_conditions: string[] | null
          medications: string[] | null
          next_eligible_date: string | null
          total_donations: number | null
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          allergies?: string[] | null
          availability?:
            | Database["public"]["Enums"]["availability_status"]
            | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at?: string
          id?: string
          last_donation_date?: string | null
          medical_conditions?: string[] | null
          medications?: string[] | null
          next_eligible_date?: string | null
          total_donations?: number | null
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          allergies?: string[] | null
          availability?:
            | Database["public"]["Enums"]["availability_status"]
            | null
          blood_type?: Database["public"]["Enums"]["blood_type"]
          created_at?: string
          id?: string
          last_donation_date?: string | null
          medical_conditions?: string[] | null
          medications?: string[] | null
          next_eligible_date?: string | null
          total_donations?: number | null
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      emergency_requests: {
        Row: {
          address: string | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          city: string | null
          contact_name: string
          contact_phone: string
          created_at: string
          created_by: string
          expires_at: string | null
          hospital_name: string | null
          id: string
          latitude: number | null
          longitude: number | null
          message: string | null
          status: Database["public"]["Enums"]["emergency_status"] | null
          units_needed: number | null
          updated_at: string
          urgency: Database["public"]["Enums"]["urgency_level"] | null
        }
        Insert: {
          address?: string | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          city?: string | null
          contact_name: string
          contact_phone: string
          created_at?: string
          created_by: string
          expires_at?: string | null
          hospital_name?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          message?: string | null
          status?: Database["public"]["Enums"]["emergency_status"] | null
          units_needed?: number | null
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Update: {
          address?: string | null
          blood_type?: Database["public"]["Enums"]["blood_type"]
          city?: string | null
          contact_name?: string
          contact_phone?: string
          created_at?: string
          created_by?: string
          expires_at?: string | null
          hospital_name?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          message?: string | null
          status?: Database["public"]["Enums"]["emergency_status"] | null
          units_needed?: number | null
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Relationships: []
      }
      emergency_responses: {
        Row: {
          donor_id: string
          emergency_id: string
          id: string
          responded_at: string | null
          status: string | null
        }
        Insert: {
          donor_id: string
          emergency_id: string
          id?: string
          responded_at?: string | null
          status?: string | null
        }
        Update: {
          donor_id?: string
          emergency_id?: string
          id?: string
          responded_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_responses_emergency_id_fkey"
            columns: ["emergency_id"]
            isOneToOne: false
            referencedRelation: "emergency_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean | null
          link: string | null
          message: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          last_name: string | null
          latitude: number | null
          longitude: number | null
          phone: string | null
          state: string | null
          updated_at: string
          user_id: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          last_name?: string | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          last_name?: string | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "donor" | "receiver" | "blood_bank" | "admin"
      availability_status: "available" | "unavailable"
      blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
      emergency_status: "active" | "fulfilled" | "cancelled"
      notification_type:
        | "emergency"
        | "request"
        | "message"
        | "match"
        | "system"
      request_status: "pending" | "accepted" | "fulfilled" | "cancelled"
      urgency_level: "low" | "medium" | "high" | "critical"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["donor", "receiver", "blood_bank", "admin"],
      availability_status: ["available", "unavailable"],
      blood_type: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      emergency_status: ["active", "fulfilled", "cancelled"],
      notification_type: ["emergency", "request", "message", "match", "system"],
      request_status: ["pending", "accepted", "fulfilled", "cancelled"],
      urgency_level: ["low", "medium", "high", "critical"],
    },
  },
} as const
