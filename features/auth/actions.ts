"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export async function registerUser(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const validatedData = registerSchema.parse(data);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { success: false, error: "Email is already registered." };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error: any) {
    if (error?.errors?.[0]?.message) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Failed to register user." };
  }
}

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid credentials." };
        default:
          return { success: false, error: "Something went wrong." };
      }
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}
