# Contributing to Nexvyn/UI

Thanks for your interest in contributing. This guide covers everything you need to add a new component to the library.

---

## Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

---

## Step-by-Step Guide

### 1. Create the component file

Add your component in `components/ui/`:

```
components/ui/my-component.tsx
```

### 2. Add metadata

Create a metadata file in `components/ui/Doc/`:

```
components/ui/Doc/my-component-metadata.ts
```

Export a `ComponentItem` object with id, name, collection, description, props, usage, and optional credits.

### 3. Add a preview (optional)

If your component needs a live demo preview, add it in `components/ui/previews/`:

```
components/ui/previews/my-component-preview.tsx
```

Export it from `components/ui/previews/index.ts`.

### 4. Register the component

Import and add your metadata to `lib/components-registry.ts`:

```ts
import { myComponentMetadata } from '@/components/ui/Doc/my-component-metadata'

export const COMPONENTS: ComponentItem[] = [myComponentMetadata]
```

### 5. Add a demo

Add a demo case in `app/components/[component]/page.tsx` inside the `ComponentDemo` switch statement.

### 6. Add to the registry

Add an entry to `registry.json` for shadcn CLI installation:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "...",
  "dependencies": ["motion"],
  "files": [
    {
      "path": "components/ui/my-component.tsx",
      "type": "registry:ui"
    }
  ]
}
```

Then run `npm run build:registry` to generate the `public/r/my-component.json` file automatically.

### 7. Add to source map

Add to `app/api/source/route.ts` in the `SOURCE_MAP` object so the code drawer can serve the source:

```ts
const SOURCE_MAP: Record<string, string[]> = {
  'my-component': ['components', 'ui', 'my-component.tsx'],
}
```

### 8. Set collection category

Set the `collection` field in metadata to one of: `'navigation'`, `'inputs'`, `'effects'`, `'preloaders'`, `'scroll'`. Empty categories are automatically hidden from the sidebar.

### 9. Test locally

Run `npm run dev` and navigate to `/components/my-component` to verify it works.

### 10. Format and lint

```bash
npm run format       # Format code with Prettier
npm run lint         # Run ESLint
npm run build        # Verify production build
```

---

## Code Standards

- Use TypeScript exclusively
- Use `motion/react` for animations (not `framer-motion`)
- Use `cn()` from `@/lib/utils` for class merging
- Use design tokens (`var(--color-*)`) instead of hardcoded colors
- No comments in component files
- Add `"use client"` directive for client components
- Run `npm run format` before committing
- Respect `prefers-reduced-motion` for accessibility

## Originality

All components must be original implementations. If your work was inspired by something, add a `credits` field to your metadata:

```ts
credits: 'Inspired by https://example.com'
```

---

## Questions?

Open an issue on [GitHub](https://github.com/Nexvyn/Nexvyn-ui) or reach out at nexvyndev@gmail.com.
