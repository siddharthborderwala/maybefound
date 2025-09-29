"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, User } from "lucide-react";
import { User as BetterAuthUser } from "better-auth";
import { signOut } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function UserMenu({ user }: { user: BetterAuthUser }) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  return (
    <DropdownMenu modal={true}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start !p-2">
          <Avatar className="select-none rounded-none size-6">
            <AvatarImage
              src={user.image ?? ""}
              draggable={false}
              className="rounded-none size-6"
            />
            <AvatarFallback className="size-6 rounded-none">
              <User strokeWidth={1} className="size-4" />
            </AvatarFallback>
          </Avatar>
          <span className="mb-0.5 max-w-36 truncate">{user.name}</span>
          <ChevronDown strokeWidth={1} className="size-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
        <DropdownMenuItem
          disabled={isSigningOut}
          onClick={() =>
            signOut({
              fetchOptions: {
                onRequest: () => {
                  setIsSigningOut(true);
                },
                onResponse: () => {
                  setIsSigningOut(false);
                },
                onSuccess: () => {
                  router.push("/sign-in");
                },
              },
            })
          }
        >
          <LogOut strokeWidth={1} className="size-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
