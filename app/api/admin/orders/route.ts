import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@/lib/generated/prisma/enums';

export const dynamic = 'force-dynamic'; // always up-to-date

/**
 * GET /api/admin/orders
 * Returns a paginated list of orders. Supports query params:
 *   - page (default 1)
 *   - limit (default 20)
 *   - status (optional OrderStatus filter)
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page') ?? '1');
  const limit = Number(url.searchParams.get('limit') ?? '20');
  const status = url.searchParams.get('status') as OrderStatus | null;

  const where = status ? { status } : {};

  const [total, orders] = await Promise.all([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { select: { id: true, name: true, email: true } },
        address: true,
        items: { include: { product: true } },
        coupon: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return NextResponse.json({ total, page, limit, orders });
}

/**
 * PATCH /api/admin/orders/{id}
 * Updates the status of an order. Body: { status: OrderStatus }
 */
export async function PATCH(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  if (!id) {
    return NextResponse.json({ error: 'Order ID missing' }, { status: 400 });
  }
  const { status } = await req.json();
  if (!status) {
    return NextResponse.json({ error: 'Status missing' }, { status: 400 });
  }
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(order);
  } catch (e) {
    return NextResponse.json({ error: 'Update failed', details: (e as Error).message }, { status: 500 });
  }
}
