import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function LogoMark({
  className,
  href,
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link href={href || "/"} className={cn("block cursor-pointer", className)}>
      <Image
        loading="eager"
        src="/logo-mark.svg"
        alt="Maybe Found"
        className="hidden dark:block aspect-[5/2]"
        width={90}
        height={36}
      />
      <Image
        loading="eager"
        src="/logo-mark-black.svg"
        alt="Maybe Found"
        className="block dark:hidden aspect-[5/2]"
        width={90}
        height={36}
      />
    </Link>
  );
}
