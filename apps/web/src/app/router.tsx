import { routeTree } from '@/routeTree.gen';
import { createQueryClient } from '@/lib/query-client';
import { createRouter } from '@tanstack/react-router';

const queryClient = createQueryClient();

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  context: {
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export { queryClient, router };
