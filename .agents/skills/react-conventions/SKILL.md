---
name: react-conventions
description: 'React coding conventions for Riadom (React + Vite, TanStack Router, React Query, shadcn/ui, Tailwind, Zustand, react-hook-form + zod). Use this whenever writing, reviewing, or refactoring React components, hooks, routes, forms, or feature modules in the Riadom app — component structure, props typing, file/folder placement, data fetching, and state management all follow the rules here. Make sure to consult this any time new .tsx files are created, not just when the user explicitly asks about conventions.'
---

# Riadom React Conventions

House rules for writing React code in Riadom. Apply these by default, without being asked, whenever creating or editing `.tsx`/`.ts` files in this app.

## 1. Component declaration

Always a `const` arrow function, never `function Component()` and never a default export.

```tsx
type ButtonProps = {
  intent?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
};

const Button = ({
  intent = 'primary',
  size = 'md',
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ intent, size }))} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
```

Rules:

- Props type is always named `<ComponentName>Props`, declared as a `type` (not `interface`), directly above the component in the same file.
- Named export only, exported at the bottom (or inline `export const`) — never `export default`.
- Destructure props in the function signature; give defaults there, not with `??` in the body.
- One component per file. If a file needs a small private subcomponent, it can live in the same file undexported, but anything reused elsewhere gets its own file.

## 2. File naming & placement

- Component files: `PascalCase.tsx`, filename matches the component name exactly (`Button.tsx` exports `Button`).
- Hooks: `camelCase.ts` starting with `use` (`usePostsQuery.ts`).
- Everything else (utils, types, stores): `camelCase.ts`.
- No barrel (`index.ts` re-export) files, anywhere. Import directly from the source file. This avoids circular-dependency footguns and keeps HMR/tree-shaking fast.

## 3. Folder structure (bulletproof-react style)

```
src/
  app/            # app.tsx, provider.tsx, router.tsx — app shell only
  routes/         # TanStack Router route files
  components/     # shared, feature-agnostic components (mostly shadcn primitives + truly shared UI)
  features/
    <feature>/
      api/        # React Query hooks + query key factory for this feature
      components/ # components used only within this feature
      constants/  # constants used only within this feature
      types/      # feature-specific types (beyond packages/contracts)
      utils/
  hooks/          # shared hooks used across features
  lib/            # preconfigured libs (queryClient, router instance, etc.)
  constants/      # shared constants
  stores/         # Zustand stores (global client state only)
  types/          # shared/global types
  utils/          # shared utility functions
```

Rule of thumb: if code is used by exactly one feature, it lives inside that feature's folder. It only graduates to `components/`, `utils/`, or `types/` once a second feature needs it.

**Hooks are the one exception to "graduate later."** Whether a hook belongs in `features/<feature>/api/` (or `.../hooks/`) or the top-level `hooks/` is decided by what the hook _is_, not by how many features currently call it:

- **Generic/reusable by nature** (`useDebounce`, `useMediaQuery`, `useLocalStorage`, `useClickOutside`) → always `hooks/`, from the moment it's created, even if only one feature uses it today. These hooks have no domain knowledge — they'd make sense in any React app.
- **Tied to feature business logic** (wraps a feature's API, reads a feature's store, encodes feature-specific rules) → stays in `features/<feature>/api/` or `features/<feature>/hooks/`, even if a second feature starts calling it. If that happens, it's a sign the _logic_ should be extracted/shared via the feature's public surface, not that the hook itself should move to `hooks/`.

Ask "would this hook make sense with zero knowledge of Riadom's domain?" — if yes, it's project-wide and goes in `hooks/` immediately.

## 4. Data fetching (React Query + TanStack Router)

**Query key factories** — one per feature, in `features/<feature>/api/keys.ts`:

```ts
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: PostFilters) => [...postKeys.lists(), filters] as const,
  detail: (id: string) => [...postKeys.all, 'detail', id] as const,
};
```

Never write ad-hoc array keys inline in a `useQuery` call — always go through the factory, so invalidation stays consistent.

**Hooks** — one hook per query/mutation, colocated in `features/<feature>/api/`:

```ts
const usePostsQuery = (filters: PostFilters) => {
  return useQuery({
    queryKey: postKeys.list(filters),
    queryFn: () => fetchPosts(filters),
  });
};
```

**Loading pattern — prefetch in the loader, read in the component.** The route loader ensures the cache is warm before navigation completes; the component still calls the same hook so it stays reactive to refetches/invalidation:

```ts
// routes/posts.tsx
export const Route = createFileRoute("/posts")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: postKeys.list(defaultFilters),
      queryFn: () => fetchPosts(defaultFilters),
    }),
  errorComponent: PostsErrorView,
  pendingComponent: PostsPendingView,
  component: PostsRoute,
});

const PostsRoute = () => {
  const { data } = usePostsQuery(defaultFilters); // reads warm cache, stays reactive
  return <PostsList posts={data} />;
};
```

- Loading and error states for the _initial_ route render belong at the route level (`pendingComponent` / `errorComponent`) — don't hand-roll `if (isLoading)` for the primary page query.
- `isLoading` / `isError` from `useQuery`/`useMutation` inside a component are for secondary things: mutation pending states, refetch indicators, background updates.

## 5. Forms

- react-hook-form + zod via `@hookform/resolvers/zod`.
- The zod schema comes from `packages/contracts` whenever the form maps to an API payload — don't redefine validation that already exists as a contract. Only define a local schema for pure UI-only fields that never hit the API.
- **Every form gets its own dedicated hook**, named `use<FormName>Form` (`useSignUpForm`, `useCreatePostForm`), living next to the form component (or in `features/<feature>/hooks/` if it's feature-owned). This hook owns _all_ form logic — `useForm` setup, resolver, default values, the mutation call, and the submit handler. The component only renders fields and calls what the hook gives it.

```ts
// useSignUpForm.ts
const useSignUpForm = () => {
  const { mutateAsync, isPending } = useSignUpMutation();

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema), // from packages/contracts
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
  });

  return { form, onSubmit, isPending };
};
```

```tsx
// SignUpForm.tsx
type SignUpFormProps = Record<string, never>;

const SignUpForm = (_props: SignUpFormProps) => {
  const { form, onSubmit, isPending } = useSignUpForm();

  return (
    <form onSubmit={onSubmit}>
      <Input {...form.register('email')} />
      <Input {...form.register('password')} type="password" />
      <Button type="submit" disabled={isPending}>
        Sign up
      </Button>
    </form>
  );
};

export { SignUpForm };
```

- The component stays presentation-only: no `useForm`, no resolver, no submit/mutation logic directly inside it — all of that lives in the hook. If the JSX needs a derived value (e.g. `form.formState.errors.email`), read it off what the hook returns, don't recompute it in the component.

## 6. Styling (shadcn + Tailwind)

- Variants (size, intent, state) go through `cva`, matching how shadcn's own primitives are built — don't hand-write conditional className strings for variant logic.
- Everything else (spacing, one-off layout) uses `cn(...)` from `lib/utils` with plain Tailwind classes.
- Don't fight shadcn's primitives with overrides; extend via `cva`/`className` props instead of copy-pasting and modifying the generated component unless there's no other option.

## 7. Client state

- Server data → React Query cache. Never mirror server data into Zustand or `useState`.
- Filter/sort/pagination that should survive a refresh or be shareable → URL search params (TanStack Router's typed search params), not Zustand.
- Zustand is for genuine cross-component client-only UI state (e.g. a global "map view mode" toggle, an open/closed side panel). Keep stores small and feature-scoped where possible; avoid one giant global store.

## 8. Memoization

Don't reach for `React.memo`, `useMemo`, or `useCallback` by default. Add them only after profiling shows an actual re-render cost — premature memoization here just adds noise and stale-closure risk. Exceptions: memoizing genuinely expensive computations is fine regardless of profiling, since the cost is obvious from the code itself.

## 9. Quick checklist for any new component/hook

- [ ] `const X = () => {}`, named export, no default export
- [ ] `type XProps = {...}` directly above, co-located
- [ ] Filename is `PascalCase.tsx` matching the component name
- [ ] Lives in the right place: shared (`components/`) vs feature-owned (`features/<x>/components/`)
- [ ] No barrel file added
- [ ] Data fetching goes through a query-key-factory + colocated hook, not an inline `useQuery`
- [ ] Variant styling via `cva`, not hand-written conditionals
- [ ] No new global state unless it's genuinely cross-feature client-only state
- [ ] Any form has its own `use<FormName>Form` hook — no `useForm`/resolver/submit logic inline in the component
