import { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SignInPage } from "./page.client";

export const metadata: Metadata = {
  title: "Sign In | Maybe Found",
  description: "Sign in to your account to continue",
};

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return <SignInPage />;
}
