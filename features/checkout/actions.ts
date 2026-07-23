"use server";

import { prisma } from "@/lib/prisma";
import { checkoutSchema, type CheckoutFormData } from "./schema";

interface CheckoutPayload {
  customer: CheckoutFormData;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}

import { auth } from "@/lib/auth";

export async function createOrder(payload: CheckoutPayload) {
  try {
    const session = await auth();
    // 1. Validate customer data on the server
    const validatedData = checkoutSchema.parse(payload.customer);

    // 2. Validate items
    if (!payload.items || payload.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // 3. We should ideally verify prices against the DB, but for simplicity
    // and speed in this portfolio project, we use the passed prices or recalculate.
    // Let's fetch actual prices to prevent tampering.
    const productIds = payload.items.map((item) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    let calculatedTotal = 0;
    const orderItemsToCreate = payload.items.map((clientItem) => {
      const dbProduct = dbProducts.find((p) => p.id === clientItem.productId);
      if (!dbProduct)
        throw new Error(`Product ${clientItem.productId} not found`);

      const price = dbProduct.discount
        ? dbProduct.price * (1 - dbProduct.discount / 100)
        : dbProduct.price;

      calculatedTotal += price * clientItem.quantity;

      return {
        productId: dbProduct.id,
        quantity: clientItem.quantity,
        price: price,
      };
    });

    // 4. Create Order and nested OrderItems in a transaction
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id || undefined,
        customerName: validatedData.customerName,
        customerPhone: validatedData.customerPhone,
        wilaya: validatedData.wilaya,
        fullAddress: validatedData.address,
        paymentMethod: validatedData.paymentMethod,
        status: "PENDING",
        subtotal: calculatedTotal,
        total: calculatedTotal,
        items: {
          create: orderItemsToCreate,
        },
      },
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order creation failed:", error);
    return {
      success: false,
      error: "Failed to create order. Please try again.",
    };
  }
}
