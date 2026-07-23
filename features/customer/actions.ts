"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  if (!name || name.trim().length < 2) {
    return { success: false, error: "Name must be at least 2 characters" };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });
    
    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update profile" };
  }
}

export async function toggleWishlistItem(productId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const wishlist = await prisma.wishlist.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id }
    });

    const existing = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    if (existing) {
      await prisma.wishlistItem.delete({
        where: { id: existing.id },
      });
      revalidatePath("/wishlist");
      return { success: true, isAdded: false };
    } else {
      await prisma.wishlistItem.create({
        data: {
          wishlistId: wishlist.id,
          productId,
        },
      });
      revalidatePath("/wishlist");
      return { success: true, isAdded: true };
    }
  } catch (error) {
    return { success: false, error: "Failed to update wishlist" };
  }
}

export async function checkIsWishlisted(productId: string) {
  const session = await auth();
  if (!session?.user?.id) return false;

  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: session.user.id }
    });
    if (!wishlist) return false;

    const item = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });
    return !!item;
  } catch {
    return false;
  }
}
