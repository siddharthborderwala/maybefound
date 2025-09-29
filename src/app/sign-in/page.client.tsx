"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/spinner";
import z, { treeifyError } from "zod/v4";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import LogoMark from "@/components/logo-mark";

const signinSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

function ErrorMessage({ errors }: { errors: string[] }) {
  return <p className="text-sm text-destructive">{errors.join(", ")}</p>;
}

export function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ReturnType<
    typeof treeifyError<z.infer<typeof signinSchema>>
  > | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = signinSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      setErrors(treeifyError(result.error));
      setLoading(false);
      return;
    }

    try {
      await signIn.email({
        email: result.data.email,
        password: result.data.password,
        callbackURL: "/dashboard",
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex-1 w-full h-full border-x max-w-md flex flex-col justify-center">
        <div className="border-y py-8 px-6 mt-6 flex justify-between items-center">
          <LogoMark />
          <div className="text-sm text-muted-foreground flex flex-col items-end">
            <p>New here?</p>
            <Link
              tabIndex={1}
              href="/sign-up"
              className="text-sm text-primary inline-block"
            >
              Sign up
            </Link>
          </div>
        </div>
        <div className="py-8 px-6 border-b">
          <h1 className="text-lg md:text-xl font-bold">Sign In</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
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
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Input
                    placeholder="Create a strong password"
                    className="h-10"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-6"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeIcon
                        strokeWidth={1}
                        className="text-primary size-4"
                      />
                    ) : (
                      <EyeOffIcon
                        strokeWidth={1}
                        className="text-primary size-4"
                      />
                    )}
                  </Button>
                </div>
                {errors?.properties?.password?.errors && (
                  <ErrorMessage errors={errors.properties.password.errors} />
                )}
                {/* <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground inline-block self-end"
                >
                  Forgot password?
                </Link> */}
              </div>
              <Button className="h-10" type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Sign In"}
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
                disabled={googleLoading || loading}
                onClick={async () => {
                  await signIn.social(
                    {
                      provider: "google",
                      callbackURL: "/dashboard",
                    },
                    {
                      onRequest: () => {
                        setGoogleLoading(true);
                      },
                      onResponse: () => {
                        setGoogleLoading(false);
                      },
                    },
                  );
                }}
              >
                {googleLoading ? (
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
