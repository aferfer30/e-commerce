"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface AccountLayoutProps {
  children: React.ReactNode;
  user: {
    name: string | null;
    email: string | null;
  };
  title: string;
}

export function AccountLayout({ children, user, title }: AccountLayoutProps) {
  const pathname = usePathname();

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const NAV_ITEMS = [
    { icon: User, label: "Profile", href: "/profile" },
    { icon: ShoppingBag, label: "Orders", href: "/orders" },
    { icon: Heart, label: "Wishlist", href: "/wishlist" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-border/50">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
          Account
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Glassmorphic Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
          {/* Avatar Card */}
          <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center gap-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 w-20 h-20 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-500 ease-out">
              <span className="font-display text-2xl font-bold text-primary">
                {initials}
              </span>
              <div className="absolute inset-0 rounded-full border border-primary/20 scale-[1.15]" />
            </div>
            <div className="relative z-10">
              <p className="font-semibold text-lg">{user.name}</p>
              <p className="text-sm text-muted-foreground mt-0.5 font-light">
                {user.email}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-2xl p-2 flex flex-col gap-1 relative overflow-hidden">
            {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-3 px-5 py-3.5 text-sm font-medium rounded-xl transition-colors duration-300 z-10 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  {label}
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
