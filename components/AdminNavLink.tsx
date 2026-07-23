'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function AdminNavLink({ href, icon, children }: AdminNavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 relative border ${
        isActive
          ? "text-primary bg-primary/10 border-primary/20 shadow-glow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-white/5 border-transparent"
      }`}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full shadow-glow" />
      )}
      {icon}
      {children}
    </Link>
  );
}
