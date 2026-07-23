import { RegisterForm } from "@/features/auth/components/RegisterForm";
import Link from "next/link";
import { SeoHead } from "@/components/SeoHead";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <>
      <SeoHead
        title="Create Account"
        description="Join NovaTech and start shopping premium tech."
      />
      <div className="min-h-[calc(100vh-64px)] flex">
        {/* Left Brand Panel */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-card border-r border-border/50 p-12 relative overflow-hidden">
          {/* Background decor */}
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay z-0" />
          <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-pulse pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-background/90 z-0 pointer-events-none" />

          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
              Back to vault
            </Link>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8 shadow-glow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary tracking-widest uppercase">
                Request Access
              </span>
            </div>
            <h2 className="font-display text-5xl font-bold tracking-tight mb-6 leading-tight">
              Begin your
              <br />
              premium journey.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
              Create your account to secure early access to our curated
              collection and member privileges.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-5 border-t border-border/50 pt-8 mt-8">
            {[
              "Exclusive access to limited releases",
              "Curate your personal tech vault",
              "Priority concierge support",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 text-sm text-muted-foreground"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
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
                Create account
              </h1>
              <p className="text-muted-foreground">
                Join NovaTech today — it&apos;s free.
              </p>
            </div>

            <RegisterForm />

            <p className="mt-6 text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
