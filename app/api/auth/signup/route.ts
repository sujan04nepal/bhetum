import { NextRequest, NextResponse } from "next/server";
import { signIn } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const { fullName, email, password, role } = await req.json();

  // This is a workaround to call the authorize function from the CredentialsProvider
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/callback/credentials`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRF-Token": (await getServerSession(authOptions))?.csrfToken || "",
      },
      body: new URLSearchParams({
        fullName,
        email,
        password,
        role,
        json: "true",
      }),
    }
  );

  const data = await res.json();

  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json({ error: data.error || "Something went wrong" }, { status: res.status });
  }
}
