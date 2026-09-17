import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ukhlvlgrhvftfynommtj.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_ItUT4-gL6Tn2R_ONjBcoGw_IYiAjKDv";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "nirupampaldev@gmail.com";
export const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
  process.env.ADMIN_PASSWORD ||
  "nirupam2026";
export const CONTACT_MESSAGES_TABLE = "contact_messages";
export const SITE_CONTENT_TABLE = "site_content";
export const PORTFOLIO_STORAGE_BUCKET = "portfolio";
