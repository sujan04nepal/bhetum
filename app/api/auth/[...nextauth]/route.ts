import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request, context: { params: { nextauth: string[] } }) {
  const handler = NextAuth(authOptions);
  return handler(request, context);
}

export async function POST(request: Request, context: { params: { nextauth: string[] } }) {
  const handler = NextAuth(authOptions);
  return handler(request, context);
}