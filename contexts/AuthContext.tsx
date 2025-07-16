"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User as AuthUser, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { User, UserRole } from "@/types/database";

interface AuthContextType {
  user: User | null;
  authUser: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    userData: {
      full_name: string;
      phone?: string;
      role: UserRole;
    },
  ) => Promise<{ user: AuthUser | null; error: any }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ user: AuthUser | null; error: any }>;
  signOut: () => Promise<{ error: any }>;
  updateProfile: (updates: Partial<User>) => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  isProvider: boolean;
  isSeeker: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setAuthUser(session?.user ?? null);
        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.warn("Supabase not configured, running in demo mode");
        setLoading(false);
      });

    // Listen for auth changes
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        setSession(session);
        setAuthUser(session?.user ?? null);

        if (event === "SIGNED_IN" && session?.user) {
          await fetchUserProfile(session.user.id);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setLoading(false);
        }
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.warn("Supabase not configured, running in demo mode");
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching user profile:", error);
        setUser(null);
      } else if (data) {
        setUser(data as User);
        // Update last login
        await supabase
          .from("users")
          .update({ last_login_at: new Date().toISOString() })
          .eq("id", userId);
      }
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData: { full_name: string; phone?: string; role: UserRole },
  ) => {
    try {
      setLoading(true);

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            phone: userData.phone,
            role: userData.role,
          },
        },
      });

      if (authError) {
        return { user: null, error: authError };
      }

      if (authData.user) {
        // Create user profile in our users table
        const { error: profileError } = await supabase.from("users").insert({
          id: authData.user.id,
          email: authData.user.email!,
          full_name: userData.full_name,
          phone: userData.phone,
          role: userData.role,
          status: "pending_verification",
          language_preference: "ne",
        });

        if (profileError) {
          console.error("Error creating user profile:", profileError);
          return { user: null, error: profileError };
        }

        // If user is a provider, create provider profile
        if (userData.role === "provider") {
          const { error: providerError } = await supabase
            .from("provider_profiles")
            .insert({
              user_id: authData.user.id,
              years_experience: 0,
              verification_status: "pending",
              total_jobs_completed: 0,
              total_earnings: 0,
              average_rating: 0,
              total_reviews: 0,
              response_rate: 0,
              completion_rate: 0,
              is_available: false,
            });

          if (providerError) {
            console.error("Error creating provider profile:", providerError);
          }
        }
      }

      return { user: authData.user, error: null };
    } catch (error) {
      return { user: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error };
      }

      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (!error) {
        setUser(null);
        setAuthUser(null);
        setSession(null);
      }

      return { error };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) {
        return { error: new Error("No user logged in") };
      }

      setLoading(true);

      // Update user profile in our users table
      const { error: profileError } = await supabase
        .from("users")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) {
        return { error: profileError };
      }

      // Update local user state
      setUser((prev) => (prev ? { ...prev, ...updates } : null));

      // Update auth metadata if needed
      if (updates.full_name || updates.phone) {
        const { error: authError } = await supabase.auth.updateUser({
          data: {
            full_name: updates.full_name || user.full_name,
            phone: updates.phone || user.phone,
          },
        });

        if (authError) {
          console.error("Error updating auth metadata:", authError);
        }
      }

      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const value: AuthContextType = {
    user,
    authUser,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
    isProvider: user?.role === "provider",
    isSeeker: user?.role === "seeker",
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Higher-order component for protecting routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: UserRole[],
) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!user) {
      // Redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
      return null;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
            <p className="text-gray-600">
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

// Hook for checking specific permissions
export function usePermissions() {
  const { user } = useAuth();

  return {
    canAccessAdmin: user?.role === "admin",
    canAccessProviderDashboard: user?.role === "provider",
    canAccessSeekerDashboard: user?.role === "seeker",
    canCreateServices: user?.role === "provider",
    canBookServices: user?.role === "seeker",
    canModerateContent: user?.role === "admin",
    isVerified: user?.status === "active",
  };
}
