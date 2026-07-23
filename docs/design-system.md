# Design System

This document outlines the foundation of the premium tech e-commerce design system for this project. The system is built around Tailwind CSS v4 and shadcn/ui.

## 1. Design Tokens Architecture

All design tokens are defined as CSS variables to remain the primary source of truth. They are stored in `styles/tokens/` and imported into `app/globals.css`.

- **`colors.css`**: Defines the premium color palette (backgrounds, foregrounds, primary electric blue, secondary violet, etc.).
- **`typography.css`**: Configures Geist Sans as the global sans-serif font and Geist Mono for code.
- **`spacing.css`**: Optional custom spacing variables (most spacing relies on Tailwind's default 4pt grid).
- **`radius.css`**: Sets the global border radius (default `0.5rem`).
- **`shadows.css`**: Configures elevation and subtle shadows for cards and popovers.

### Token Usage in Tailwind

Since Tailwind v4 uses CSS variables intrinsically, you can use these tokens directly via utility classes. For example:

- `bg-primary` utilizes `--primary`
- `text-muted-foreground` utilizes `--muted-foreground`
- `rounded-[var(--radius)]` or `rounded-md` (configured in `@theme`)

## 2. Component Rules

- **shadcn/ui** is used for base components.
- Components are generated in `components/ui/`.
- Do not modify shadcn components directly unless necessary for a global design change.
- Use `cn()` from `lib/utils` to merge class names gracefully.

## 3. Typography Rules

- **Geist Sans** is the primary font for all headings, body text, and UI elements.
- **Geist Mono** should only be used for code blocks, data tables, or specific tech-themed accents.
- Use Tailwind's default typography scale (`text-sm`, `text-base`, `text-lg`, `text-xl`, etc.).

## 4. shadcn/ui Customization Rules

We use the "New York" style with a "Neutral" base. Our token overrides in `colors.css` and `@theme` integrations inject our custom premium e-commerce palette into the shadcn components automatically.

- Primary buttons will use the electric blue accent.
- Cards will use the near-black backgrounds with subtle borders.

## 5. Spacing Rules

- Adhere to an 8px (0.5rem) baseline grid (Tailwind's `2`, `4`, `8`, `16`, etc.).
- Keep layouts breathable. Use larger padding (e.g., `p-6`, `p-8`) for premium feel.
