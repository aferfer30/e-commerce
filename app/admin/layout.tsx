import '../../styles/admin.css';
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, BarChart, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminNavLink } from "@/components/AdminNavLink";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/analytics", icon: BarChart, label: "Analytics" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/");
  }

  const initials = session.user.name
    ? session.user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "A";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col fixed inset-y-0 z-20">
        {/* Logo */}
        <div className="h-14 flex items-center px-5 border-b border-[#1a1a1a]">
          <Link href="/admin" className="font-display font-bold text-base tracking-tight">
            Nova<span className="text-primary">Tech</span>
            <span className="ml-2 text-[10px] font-medium text-muted-foreground bg-muted/50 rounded px-1.5 py-0.5 align-middle">ADMIN</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {navItems.map(({ href, icon: Icon, label }) => (
            <AdminNavLink key={href} href={href} icon={<Icon className="h-4 w-4 shrink-0" />}>
              {label}
            </AdminNavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-[#1a1a1a]">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-60 min-h-screen relative overflow-hidden bg-background">
        {/* Premium Admin Background Decor */}
        <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay z-0 pointer-events-none" />
        <div className="absolute inset-0 grid-pattern opacity-10 z-0 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] animate-pulse pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/90 z-0 pointer-events-none" />
        {/* Top Bar */}
        <header className="h-14 bg-background/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-6 sticky top-0 z-20">
          <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">Admin Portal</p>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium leading-none text-foreground">{session.user.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{session.user.email}</p>
            </div>
            <Avatar className="h-7 w-7 ring-2 ring-primary/30 shadow-glow-sm">
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative z-10 flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
