import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/features/customer/components/ProfileForm";
import { redirect } from "next/navigation";
import { SeoHead } from "@/components/SeoHead";
import { AccountLayout } from "@/components/customer/AccountLayout";
import { AnimatedPage } from "@/components/ui/motion";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true },
  });

  if (!user) redirect("/login");

  return (
    <>
      <SeoHead title="My Profile" description="Manage your NovaTech account." />
      <AccountLayout
        user={{ name: user.name, email: user.email }}
        title="Personal Information"
      >
        <AnimatedPage>
          <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-10 relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-700" />

            <div className="relative z-10">
              <h2 className="font-display text-xl font-bold mb-8">
                Edit Profile
              </h2>
              <ProfileForm user={user} />
            </div>
          </div>
        </AnimatedPage>
      </AccountLayout>
    </>
  );
}
