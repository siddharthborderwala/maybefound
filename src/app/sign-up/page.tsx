import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignUpPage } from "./page.client";

export const metadata: Metadata = {
  title: "Sign Up | Maybe Found",
  description: "Create your account to get started with Maybe Found",
};

export default async function SignUp() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return <SignUpPage />;
}
