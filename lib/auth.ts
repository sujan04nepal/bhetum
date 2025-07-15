import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "./supabase";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
        fullName: { label: "Full Name", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password || !credentials.role || !credentials.fullName) {
          return null;
        }

        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .eq("email", credentials.email)
          .single();

        if (existingUser) {
          throw new Error("User with this email already exists.");
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const { data: newUser, error } = await supabase
          .from("users")
          .insert([
            {
              email: credentials.email,
              password_hash: hashedPassword,
              role: credentials.role,
              full_name: credentials.fullName,
            },
          ])
          .select()
          .single();

        if (error) {
          console.error("Error creating user:", error);
          return null;
        }

        return {
          id: newUser.id,
          email: newUser.email,
          name: newUser.full_name,
          role: newUser.role,
        };
      },
    }),
    // Only add providers if environment variables are available
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET
      ? [
          FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") {
        return true;
      }
      // Simple sign in without external database for now
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.userId = user.id;
        token.role = (user as any).role || "seeker"; // Default role
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string;
        session.user.role = token.role as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  debug: process.env.NODE_ENV === "development",
};
