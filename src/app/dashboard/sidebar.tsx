import LogoMark from "@/components/logo-mark";
import NavLink from "@/components/nav-link";
import { Globe, Home } from "lucide-react";
import { User as BetterAuthUser } from "better-auth";
import { UserMenu } from "./user-menu";

export function Sidebar({ user }: { user: BetterAuthUser }) {
  return (
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
        <UserMenu user={user} />
      </div>
    </aside>
  );
}
