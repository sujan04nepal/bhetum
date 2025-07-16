import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-key";

// Mock Supabase client for development when env vars are not set
const createMockSupabaseClient = () => {
  return {
    auth: {
      getSession: () =>
        Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signUp: () =>
        Promise.resolve({
          data: { user: null },
          error: { message: "Demo mode - Supabase not configured" },
        }),
      signInWithPassword: () =>
        Promise.resolve({
          data: { user: null },
          error: { message: "Demo mode - Supabase not configured" },
        }),
      signOut: () => Promise.resolve({ error: null }),
      updateUser: () => Promise.resolve({ data: { user: null }, error: null }),
      resetPasswordForEmail: () => Promise.resolve({ error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null }),
          }),
        }),
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null }),
        }),
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => ({
        eq: () => Promise.resolve({ data: null, error: null }),
      }),
    }),
  } as any;
};

// Check if we have valid Supabase configuration
const hasValidSupabaseConfig =
  supabaseUrl !== "https://demo.supabase.co" &&
  supabaseAnonKey !== "demo-key" &&
  supabaseUrl.includes("supabase.co") &&
  supabaseAnonKey.length > 50;

export const supabase = hasValidSupabaseConfig
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : createMockSupabaseClient();

// For server-side rendering
export const createServerSupabaseClient = () => {
  return hasValidSupabaseConfig
    ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : createMockSupabaseClient();
};
