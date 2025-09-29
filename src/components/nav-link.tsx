"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function NavLink({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant={isActive ? "outline" : "ghost"}
      className="w-full justify-start"
    >
      <Link href={href}>
        {icon}
        <span className="mb-0.5">{label}</span>
      </Link>
    </Button>
  );
}
