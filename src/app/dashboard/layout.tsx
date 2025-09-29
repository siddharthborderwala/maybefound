import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Globe, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoMark from "@/components/logo-mark";
import NavLink from "@/components/nav-link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="grid grid-cols-[16rem_1fr] h-screen overflow-hidden">
      <aside className="border-r h-full grid grid-rows-[1fr_auto]">
        <nav className="p-4">
          <div className="p-2">
            <LogoMark />
          </div>
          <ul className="flex flex-col gap-2 mt-8">
            <li>
              <NavLink
                icon={<Home strokeWidth={1} className="size-4" />}
                href="/dashboard"
                label="Home"
              />
            </li>
            <li>
              <NavLink
                icon={<Globe strokeWidth={1} className="size-4" />}
                href="/dashboard/sites"
                label="Sites"
              />
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <Button variant="ghost" className="w-full justify-start !p-2">
            <Avatar className="select-none rounded-none size-6">
              <AvatarImage
                src={session.user.image ?? ""}
                draggable={false}
                className="rounded-none size-6"
              />
              <AvatarFallback className="size-6 rounded-none">
                <User strokeWidth={1} className="size-4" />
              </AvatarFallback>
            </Avatar>
            <span className="mb-0.5">{session.user.name.split(" ")[0]}</span>
            <ChevronDown strokeWidth={1} className="size-4 ml-auto" />
          </Button>
        </div>
      </aside>
      <main>{children}</main>
    </div>
  );
}
