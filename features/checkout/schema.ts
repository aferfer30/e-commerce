import { z } from "zod";

export const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters."),
  customerPhone: z
    .string()
    .regex(
      /^(05|06|07)\d{8}$/,
      "Must be a valid Algerian phone number (e.g. 05..., 06..., 07...).",
    ),
  wilaya: z.string().min(1, "Please select a Wilaya."),
  address: z.string().min(10, "Please provide a detailed address."),
  paymentMethod: z.literal("COD"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
