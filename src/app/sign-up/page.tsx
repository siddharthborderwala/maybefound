"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/spinner";
import z, { treeifyError } from "zod/v4";

const signupSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function ErrorMessage({ errors }: { errors: string[] }) {
  return <p className="text-sm text-red-500">{errors.join(", ")}</p>;
}

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ReturnType<
    typeof treeifyError<z.infer<typeof signupSchema>>
  > | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = signupSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      setErrors(treeifyError(result.error));
      setLoading(false);
      return;
    }

    try {
      await signUp.email({
        email: result.data.email,
        password: result.data.password,
        name: "",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrors({
          errors: [error.message],
        });
      } else {
        setErrors({
          errors: ["An unknown error occurred. Please try again."],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex-1 w-full h-full border-x max-w-md flex flex-col justify-center">
        <div className="border-y py-8 px-6 mt-6 flex justify-between items-center">
          <Link href="/" className="items-center gap-2.5 inline-flex">
            <Image
              src="/logo.svg"
              alt="Maybe Found"
              className="w-8 h-8"
              width={40}
              height={40}
            />
            <p className="font-semibold leading-4.5">
              Maybe <br /> Found
            </p>
          </Link>
          <div className="text-sm text-muted-foreground flex flex-col items-end">
            <p>Already have an account?</p>
            <Link
              tabIndex={1}
              href="/sign-in"
              className="text-sm text-primary inline-block"
            >
              Sign in
            </Link>
          </div>
        </div>
        <div className="py-8 px-6 border-b">
          <h1 className="text-lg md:text-xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground">
            Create your account to get started
          </p>
          <div className="grid gap-4 mt-8">
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <Input
                  placeholder="Enter your email"
                  className="h-10"
                  name="email"
                  required
                />
                {errors?.properties?.email?.errors && (
                  <ErrorMessage errors={errors.properties.email.errors} />
                )}
              </div>
              <div>
                <Input
                  placeholder="Create a strong password"
                  className="h-10"
                  name="password"
                  type="password"
                  required
                />
                {errors?.properties?.password?.errors && (
                  <ErrorMessage errors={errors.properties.password.errors} />
                )}
              </div>
              <Button className="h-10" type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Sign Up"}
              </Button>
              {errors?.errors && <ErrorMessage errors={errors.errors} />}
            </form>
            <p className="text-muted-foreground text-sm uppercase font-light text-center my-2">
              OR
            </p>
            <div
              className={cn(
                "w-full gap-2 flex items-center",
                "justify-between flex-col",
              )}
            >
              <Button
                variant="outline"
                size="lg"
                className={cn("w-full gap-2")}
                disabled={loading}
                onClick={async () => {
                  await signIn.social(
                    {
                      provider: "google",
                      callbackURL: "/dashboard",
                    },
                    {
                      onRequest: () => {
                        setLoading(true);
                      },
                      onResponse: () => {
                        setLoading(false);
                      },
                    },
                  );
                }}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="0.98em"
                      height="1em"
                      viewBox="0 0 256 262"
                    >
                      <path
                        fill="#4285F4"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                      ></path>
                      <path
                        fill="#EB4335"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      ></path>
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="py-8 px-6">
          <p className="w-full gap-2 text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
