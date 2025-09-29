"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useState } from "react";
import { Spinner } from "@/components/spinner";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        signOut({
          fetchOptions: {
            onRequest: () => {
              setLoading(true);
            },
            onResponse: () => {
              setLoading(false);
            },
            onSuccess: () => {
              router.push("/sign-in");
            },
          },
        })
      }
    >
      {loading ? <Spinner /> : "Sign out"}
    </Button>
  );
}
