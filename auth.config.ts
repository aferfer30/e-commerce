import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Protect /admin routes
      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false;
        if ((auth?.user as any)?.role !== "ADMIN") {
          return NextResponse.redirect(new URL("/profile", nextUrl));
        }
      }

      // Protect /profile, /orders, /wishlist
      if (
        pathname.startsWith("/profile") ||
        pathname.startsWith("/orders") ||
        pathname.startsWith("/wishlist")
      ) {
        if (!isLoggedIn) return false;
      }

      // Prevent logged-in users from visiting login/register
      if (pathname === "/login" || pathname === "/register") {
        if (isLoggedIn) {
          return NextResponse.redirect(new URL("/profile", nextUrl));
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
