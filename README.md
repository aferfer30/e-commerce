# NovaTech E-Commerce Architecture

NovaTech is a modern, high-performance e-commerce platform built with strict adherence to contemporary web development standards. This repository contains the complete source code for both the customer-facing storefront and the secure administrative dashboard.

## Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS (Custom Design System)
- **UI Components**: Base UI & Radix UI primitives
- **Animations**: Framer Motion
- **Database ORM**: Prisma
- **Database Engine**: SQLite (Development)
- **Authentication**: NextAuth.js

## System Architecture

### Customer Storefront

The storefront is optimized for conversion and performance, featuring a responsive, glassmorphic design system. Key capabilities include:

- Server-Side Rendered (SSR) product catalogs for optimal SEO.
- Fluid, client-side route transitions and staggered entry animations.
- Dynamic cart state management via Zustand.
- Authenticated user profiles, secure order history, and persistent wishlists.

### Administrative Dashboard

The administrative interface is isolated from the storefront routing and is protected by role-based access controls. Key capabilities include:

- Real-time inventory management and product CRUD operations.
- Order fulfillment tracking and status mutation.
- System analytics and revenue monitoring.

## Local Development Setup

Ensure you have Node.js (v18+) and npm installed on your system before proceeding.

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Initialize the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Seed the database**
   Execute the seeding script to populate the development database with the required administrative user and initial product catalog.

   ```bash
   npm run prisma db seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The storefront will be available at `http://localhost:3000`.
The administrative dashboard is accessible at `http://localhost:3000/admin`.

## Deployment

This application is designed to be deployed on Vercel or any standard Node.js hosting environment. For production deployment:

1. Provision a PostgreSQL database and update the `DATABASE_URL` environment variable.
2. Configure OAuth providers and secure secret keys for NextAuth.
3. Execute the standard build process:
   ```bash
   npm run build
   npm start
   ```

## License

This project is proprietary. All rights reserved.
