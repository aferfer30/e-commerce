import { LoginForm } from "@/features/auth/components/LoginForm";
import Link from "next/link";
import { SeoHead } from "@/components/SeoHead";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <SeoHead title="Sign In" description="Log in to your NovaTech account." />
      <div className="min-h-[calc(100vh-64px)] flex">
        {/* Left Brand Panel */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-card border-r border-border/50 p-12 relative overflow-hidden">
          {/* Background decor */}
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay z-0" />
          <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-20%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/90 z-0 pointer-events-none" />

          {/* Logo */}
          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
              Back to vault
            </Link>
          </div>

          {/* Center copy */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8 shadow-glow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary tracking-widest uppercase">
                Members Only
              </span>
            </div>
            <h2 className="font-display text-5xl font-bold tracking-tight mb-6 leading-tight">
              Unlock the
              <br />
              collection.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
              Sign in to access your curated wishlist, secure checkout, and
              exclusive member privileges.
            </p>
          </div>

          {/* Stats */}
          <div className="relative z-10 grid grid-cols-3 gap-8 border-t border-border/50 pt-8 mt-8">
            {[
              ["24/7", "Concierge"],
              ["Secure", "Checkout"],
              ["Bespoke", "Service"],
            ].map(([val, label]) => (
              <div key={label}>
                <p className="font-display text-2xl font-bold text-primary tracking-tight">
                  {val}
                </p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Mobile back link */}
          <div className="w-full max-w-sm mb-6 lg:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to store
            </Link>
          </div>

          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold tracking-tight mb-2">
                Welcome back
              </h1>
              <p className="text-muted-foreground">
                Sign in to continue to NovaTech.
              </p>
            </div>

            <LoginForm />

            <p className="mt-6 text-sm text-muted-foreground text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
