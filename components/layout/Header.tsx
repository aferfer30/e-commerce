import { auth } from "@/lib/auth";
import { UserNav } from "./UserNav";
import { HeaderClient } from "./HeaderClient";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export async function Header() {
  const session = await auth();

  const userNav = session?.user ? (
    <UserNav user={session.user} />
  ) : (
    <Link
      href="/login"
      className={buttonVariants({
        variant: "ghost",
        size: "sm",
        className: "hidden lg:inline-flex text-muted-foreground hover:text-foreground text-sm font-medium",
      })}
    >
      Sign In
    </Link>
  );

  return <HeaderClient userNav={userNav} isLoggedIn={!!session?.user} />;
}
